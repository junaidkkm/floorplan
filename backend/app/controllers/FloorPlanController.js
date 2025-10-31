import FloorPlan from "../models/FloorPlanModel.js";

const floorplanController = {};

// 📌 Upload a new floor plan image (only once)
floorplanController.create = async (req, res) => {
  try {
    const imagePath = req.file ? req.file.path : null;
    if (!imagePath) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    // Always replace old one (since only 1 floor plan exists)
    await FloorPlan.deleteMany({});

    const floorplan = new FloorPlan({
      image: imagePath,
      rooms: [],
    });

    await floorplan.save();

    res.status(201).json({
      success: true,
      message: "Floor plan uploaded successfully",
      floorplan,
    });
  } catch (err) {
    console.error("Error creating floor plan:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 📌 Add a new room
floorplanController.addRoom = async (req, res) => {
  try {
    console.log("📩 Received room data:", req.body);

    const { roomName, coordinates } = req.body;

    if (!roomName || !coordinates) {
      console.log("⚠️ Missing roomName or coordinates");
      return res.status(400).json({
        success: false,
        message: "roomName and coordinates are required",
      });
    }

    const plan = await FloorPlan.findOne();

    if (!plan) {
      console.log("⚠️ No floor plan found in DB");
      return res
        .status(404)
        .json({ success: false, message: "No floor plan found" });
    }

    plan.rooms.push({ roomName, coordinates });
    await plan.save();

    console.log("✅ Room added successfully:", { roomName, coordinates });

    res.status(201).json({
      success: true,
      message: "Room added successfully",
      plan,
    });
  } catch (err) {
    console.error("❌ Error adding room:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// 📌 Save all rooms (replace all)
floorplanController.saveAllRooms = async (req, res) => {
  try {
    const { rooms } = req.body;
    const plan = await FloorPlan.findOne();

    if (!plan) return res.status(404).json({ success: false, message: "No floor plan found" });

    plan.rooms = rooms;
    await plan.save();

    res.status(200).json({
      success: true,
      message: "All rooms saved successfully",
      plan,
    });
  } catch (err) {
    console.error("Error saving rooms:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 📌 Edit a room
floorplanController.editRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { roomName, coordinates } = req.body;

    const plan = await FloorPlan.findOne();
    if (!plan) return res.status(404).json({ success: false, message: "No floor plan found" });

    const room = plan.rooms.id(roomId);
    if (!room) return res.status(404).json({ success: false, message: "Room not found" });

    if (roomName) room.roomName = roomName;
    if (coordinates) room.coordinates = coordinates;

    await plan.save();

    res.status(200).json({
      success: true,
      message: "Room updated successfully",
      plan,
    });
  } catch (err) {
    console.error("Error editing room:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 📌 Delete a room
floorplanController.deleteRoom = async (req, res) => {
  try {
    const { roomId } = req.params;

    const plan = await FloorPlan.findOne();
    if (!plan) return res.status(404).json({ success: false, message: "No floor plan found" });

    const room = plan.rooms.id(roomId);
    if (!room) return res.status(404).json({ success: false, message: "Room not found" });

    room.deleteOne();
    await plan.save();

    res.status(200).json({
      success: true,
      message: "Room deleted successfully",
      plan,
    });
  } catch (err) {
    console.error("Error deleting room:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 📌 Get all rooms
floorplanController.getRooms = async (req, res) => {
  try {
    const plan = await FloorPlan.findOne();
    if (!plan) return res.status(404).json({ success: false, message: "No floor plan found" });

    res.status(200).json({ success: true, rooms: plan.rooms, image: plan.image });
  } catch (err) {
    console.error("Error fetching rooms:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export default floorplanController;
