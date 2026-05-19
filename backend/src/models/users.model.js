const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    clerkUserId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    username: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt


const userModel = mongoose.model('Users',userSchema)

module.exports = userModel