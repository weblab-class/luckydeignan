const mongoose = require("mongoose");
const Interest = require("./Interest");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
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
