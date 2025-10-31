import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import upload from "./app/middleware/multer.js";
import floorplanController from "./app/controllers/FloorPlanController.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ Floorplan Backend is Running Successfully!");
});

app.use("/uploads", express.static("uploads"));

// 📌 Upload the floor plan image
app.post("/api/floorplan", upload.single("image"), floorplanController.create);

// 📌 Add a single room (no planId needed)
app.post("/api/floorplan/rooms", floorplanController.addRoom);

// 📌 Save/update all rooms (bulk save)
app.put("/api/floorplan/rooms", floorplanController.saveAllRooms);

// 📌 Get all rooms
app.get("/api/floorplan/rooms", floorplanController.getRooms);

// 📌 Edit a room
app.put("/api/floorplan/rooms/:roomId", floorplanController.editRoom);

// 📌 Delete a room
app.delete("/api/floorplan/rooms/:roomId", floorplanController.deleteRoom);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
