import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  roomName: { type: String, required: true },
  coordinates: [
    {
      lat: Number,
      lng: Number,
    },
  ],
});

const FloorPlanSchema = new mongoose.Schema({
  image: { type: String, required: true },
  rooms: [RoomSchema],
});

export default mongoose.model("FloorPlan", FloorPlanSchema);
