/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

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


example = {"_id":{"$oid":"678eac0291543b6631bfe6c3"},googleid:"Anonymous User",interests:[{topic:"Psychology",theorems:[
  'The Stroop Effect',
  'The Bystander Effect',
  'The Dunning-Kruger Effect',
  'The Availability Heuristic',
  'The Framing Effect',
  'Confirmation Bias',
  'The Mere-Exposure Effect',
  'Cognitive Dissonance',
  'The Peak-End Rule',
  'Anchoring Bias'
], counter: 10}]}


router.post("/aiTheorem", async (req, res) => {
  // CODE THAT ATTEMPTED TO CONNECT TO DATABASE AND GET RANDOM INTEREST AND UPDATE THEOREM
  // const userObj = await User.findOne({googleid: 'Anonymous User'});
  // // pick a random interest from the user's list
  // const randomInterest = userObj.interests[Math.floor(Math.random() * userObj.interests.length)];
  
  // console.log("User's interests:", userObj.interests);
  // console.log("Selected random interest:", randomInterest);
  
  const randomInterest = example.interests[Math.floor(Math.random() * example.interests.length)];
  console.log("theorems before", randomInterest.theorems);

  // if counter == len(theorems) , fetch 10 more from LLM and add to theorems
  if (randomInterest.counter == randomInterest.theorems.length) {
    const prompt = `Provide 10 theorems from ${randomInterest.topic} that is not in this list ${randomInterest.theorems}. Return the name of each theorem with no description of each theorem with a '//' in between each theorem. Return you answer in the form of a string. Include no whitespace in between each theorem and the // characters, but the theorems themselves can have spaces.`;
    const result = await model.generateContent(prompt);

    // Process and format result from LLM, update current interests
    const temp = result.response.text().split("//");
    const cleanedResult = temp.map((item) => item.trim());
    randomInterest.theorems.push(...cleanedResult);
  }

  console.log("theorems after", randomInterest.theorems);

  // Send back next theorem, increment counter
  final = randomInterest.theorems[randomInterest.counter];
  randomInterest.counter++;

  console.log('updated counter', randomInterest.counter)
  res.send({ text: final, topic: randomInterest.topic });
  
  // // Update the theorems array of the specific interest
  // await User.findOneAndUpdate(
  //   {
  //     googleid: 'Anonymous User',
  //     'interests.topic': randomInterest.topic  // Find the specific interest by topic
  //   },
  //   {
  //     $push: {
  //       'interests.$.theorems': result.response.text()  // Add theorem to existing interest
  //     }
  //   },
  //   {new: true}
  // );
  
  
});

router.get("/aiDescription", async (req, res) => {
  const prompt = "Provide a one sentence `description` of the theorem " + req.query.theorem;
  const result = await model.generateContent(prompt);
  res.send({ text: result.response.text() });
});




// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
