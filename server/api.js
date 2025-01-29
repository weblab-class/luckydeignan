/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");
const path = require('path');  // Add this line
// import middleware for handling file uploads
const multer = require("multer");

// import models so we can interact with the database
const User = require("./models/user");
const Interest = require("./models/Interest");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

// import Gemini API
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Get API key from environment variable
const API_KEY = process.env.GOOGLE_API_KEY;
if (!API_KEY) {
  console.error("GOOGLE_API_KEY is not set in environment variables");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|



router.post("/aiTheorem", async (req, res) => {
  // CODE THAT ATTEMPTED TO CONNECT TO DATABASE AND GET RANDOM INTEREST AND UPDATE THEOREM
  const userObj = await User.findOne({_id: req.user._id});
  // // pick a random interest from the user's list
  // if user does not have interest, tell them to create one
  if (userObj.interests.length === 0) {
    return res.send({err: "You need to create an interest first"});
  }

  const randomIndex = Math.floor(Math.random() * userObj.interests.length);
  const randomInterest = userObj.interests[randomIndex];
  
  // console.log("User's interests:", userObj.interests);
  // console.log("Selected random interest:", randomInterest);
  
  // hardcoded data for testing
  // const randomInterest = example.interests[Math.floor(Math.random() * example.interests.length)];
  console.log("theorems before", randomInterest.theorems);


  // if counter == len(theorems) , fetch 10 more from LLM and add to theorems
  if (randomInterest.counter === randomInterest.theorems.length) {
    const prompt = `Provide 10 theorems/fun facts from ${randomInterest.topic} that is not in this list ${randomInterest.theorems}. Return the name of each theorem with no description of each theorem with a '//' in between each theorem. Return you answer in the form of a string. Include no whitespace in between each theorem and the // characters, but the theorems themselves can have spaces.`;
    const result = await model.generateContent(prompt);

    // Process and format result from LLM, update current interests
    const temp = result.response.text().split("//");
    const cleanedResult = temp.map((item) => item.trim());

    // hardcoded updating
    // randomInterest.theorems.push(...cleanedResult);

    // update theorems in the user's interest in the database
    User.findOneAndUpdate(
      {
        _id: req.user._id,
      },
      {
        $push: {
          [`interests.${randomIndex}.theorems`]: { $each: cleanedResult }
        }
      },
      {new: true}
    ).then( async (updatedUser) => {
      const final = updatedUser.interests[randomIndex].theorems[randomInterest.counter];
      console.log('updated counter', randomInterest.counter)
      console.log('theorems after', updatedUser.interests[randomIndex].theorems);
      // Update counter first
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { $set: { [`interests.${randomIndex}.counter`]: randomInterest.counter + 1 } },
      { new: true }
    );
      res.send({ text: final, topic: randomInterest.topic });
    }).catch((err) => {
      console.log(err);
    })
  }
  else {
    // Else, send back next theorem, increment counter
    console.log("theorems after", randomInterest.theorems);

    const final = randomInterest.theorems[randomInterest.counter];
    // Update counter first
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { $set: { [`interests.${randomIndex}.counter`]: randomInterest.counter + 1 } },
    );

    console.log('updated counter', randomInterest.counter + 1)
    res.send({ text: final, topic: randomInterest.topic }); 
  }
});

router.get("/aiDescription", async (req, res) => {
  const prompt = "Provide a one sentence `description` of the theorem/fun fact " + req.query.theorem + " in the context of " + req.query.topic;
  const result = await model.generateContent(prompt);
  res.send({ text: result.response.text() });
});

router.post("/newInterest", (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $push: { interests: { topic: req.body.topic, theorems: [], counter: 0 } } },
    { new: true }
  ).then((updatedUser) => {
    res.send(updatedUser.interests);
  }).catch((err) => {
    console.log(err);
  })
  })

router.get("/interests", (req, res) => {
  User.findById(req.user._id).then((user) => {
    res.send(user.interests);
  }).catch((err) => {
    res.status(500).send('User Not');
  });
});

router.get("/suggestions", (req, res) => {
  User.findById(req.user._id).then(async (user) => {  
    const topics = user.interests.map((interest) => interest.topic);
    const prompt = "Provide 3 potential new interests that are not in this list but related to the topics" + topics + ". Moreover, you should be able to generate fun facts/theorems about each of the topics in future requests. Make sure you can generate many fun facts or theorems about each of the topics in future requests. Return the name of each interest with no description of each interest with a '//' in between each interest. Return you answer in the form of a string. Include no whitespace in between each interest and the // characters, but the interests themselves can have spaces between their words.`";
    const result = await model.generateContent(prompt);
    const temp = result.response.text().split("//");
    const suggestions = temp.map((item) => item.trim());
    const final = suggestions.map((suggestion) => {
      return { topic: suggestion, _id: Math.random() };
    })
    res.send(final);
  })
});

router.get("/validInterest", async (req, res) => {
  const prompt = "Will you be able to generate many fun facts or theorems about the following input, simply return Yes or No: " + req.query.topic;
  const result = await model.generateContent(prompt);
  const response = result.response.text().toLowerCase();
  console.log('valid?', result.response.text());
  if (response.includes("yes")) {
    console.log('Valid interest')
    res.send({ valid: true });
  } else {
    console.log('Invalid interest')
    res.send({ valid: false });
  }
});

router.post("/deleteInterest", (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $pull: { interests: { topic: req.body.topic } } },
    { new: true }
  ).then((updatedUser) => {
    res.send(updatedUser.interests);
  }).catch((err) => {
    console.log(err);
  })
})

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
