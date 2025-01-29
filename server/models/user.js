const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  profilePicture: { type: String, default: "/clover.png"},
  interests: [
    {
      topic: String,
      theorems: [String],
      counter: { type: Number, default: 0 },
    },
  ],
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
