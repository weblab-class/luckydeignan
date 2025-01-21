const mongoose = require("mongoose");

const InterestSchema = new mongoose.Schema({
  topic: String,
  theorems: [String],
});

// compile model from schema
module.exports = mongoose.model("Interest", InterestSchema);