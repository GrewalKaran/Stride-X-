const mongoose = require("mongoose");

const multiplayerRoomSchema = new mongoose.Schema(
  {
    roomCode: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    hostClerkUserId: {
      type: String,
      required: true,
    },

    raceType: {
      type: String,
      enum: ["distance", "time"],
      required: true,
    },

    // used when raceType === "distance"
    targetDistance: {
      type: Number,
      default: null,
    },

    // used when raceType === "time"
    targetTime: {
      type: Number, // seconds
      default: null,
    },

    players: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
          required: true,
        },

        clerkUserId: {
          type: String,
          required: true,
        },

        username: {
          type: String,
          default: "",
        },

        race: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Race",
          default: null,
        },

        joinedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    maxPlayers: {
      type: Number,
      default: 2,
    },

    status: {
      type: String,
      enum: ["waiting", "active", "completed", "cancelled"],
      default: "waiting",
    },

    winnerRace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Race",
      default: null,
    },

    startedAt: {
      type: Date,
      default: null,
    },

    endedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const multiplayerRoomModel = mongoose.model(
  "MultiplayerRoom",
  multiplayerRoomSchema
);

module.exports = multiplayerRoomModel;