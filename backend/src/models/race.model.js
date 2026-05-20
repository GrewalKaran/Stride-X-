const mongoose = require('mongoose')

const raceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    clerkUserId: {
      type: String,
      required: true,
      index: true,
    },

    mode: {
      type: String,
      enum: ["solo", "multiplayer"],
      default: "solo",
    },

    status: {
      type: String,
      enum: ["active", "completed", "cancelled"],
      default: "active",
    },

    startTime: {
      type: Date,
      default: Date.now,
    },

    endTime: {
      type: Date,
    },

    duration: {
      type: Number, // seconds
      default: 0,
    },

    distance: {
      type: Number, // km
      default: 0,
    },

    avgPace: {
      type: Number, // min/km
      default: 0,
    },

    calories: {
      type: Number,
      default: 0,
    },

    route: [
      {
        lat: Number,
        lng: Number,
        timestamp: Date,
      },
    ],
    result: {
    type: String,
    enum: ["win", "lose", "draw", "none"],
    default: "none",
  },

    opponentDistance: {
    type: Number,
    default: 0,
  },

    opponentDuration: {
    type: Number,
    default: 0,
  },
  },
  { timestamps: true }
);

const raceModel = mongoose.model("Race", raceSchema);

module.exports = raceModel