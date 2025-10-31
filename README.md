🏠 Floorplan Tool

A web-based tool that allows users to upload a floor plan image, draw room borders using Leaflet, and save room data to MongoDB.

🚀 Live Demo

Frontend (Netlify): https://jolly-yeot-0ea7a2.netlify.app

Backend (Render): https://floorplan-backend-cu1z.onrender.com

⚙️ Tech Stack

Frontend: React, Leaflet.js

Backend: Node.js, Express.js, Multer

Database: MongoDB Atlas

Hosting: Netlify (frontend) + Render (backend)

🧭 Features

✅ Upload a floor plan image
✅ Draw polygons or rectangles to mark rooms
✅ Name, view, edit, and delete rooms
✅ Save rooms and image in MongoDB
✅ View saved floor plan with room overlays

📦 Installation (Local Setup)
# Clone the repository
git clone https://github.com/junaidkkm/floorplan.git

# Setup backend
cd floorplan/backend
npm install
npm start


Backend will start on 👉 http://localhost:5000

# Setup frontend
cd ../frontend
npm install
npm start


Frontend will start on 👉 http://localhost:3000

✅ Make sure backend is running before starting the frontend.

🌍 Deployment

Backend hosted on Render

Frontend hosted on Netlify

📁 Folder Structure
floorplan/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md

🧾 Submission Summary
Part	Platform	Link
Frontend	Netlify	https://jolly-yeot-0ea7a2.netlify.app

Backend	Render	https://floorplan-backend-cu1z.onrender.com

GitHub Repo	GitHub	https://github.com/junaidkkm/floorplan