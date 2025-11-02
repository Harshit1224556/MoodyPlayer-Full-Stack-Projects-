🎵 Moody Player – Emotion-Based Music Recommendation App

Moody Player is an intelligent full-stack music web application that recommends songs based on your mood. Using facial expression analysis, it detects your emotional state (happy, sad, angry, neutral, etc.) and curates a personalized playlist to match your vibe.

🚀 Features

🎭 AI Mood Detection – Uses facial expression recognition to detect the user’s mood in real-time.

🎶 Smart Song Recommendations – Displays curated songs according to detected mood (happy, sad, romantic, energetic, etc.).

💾 Backend Integration – Stores and retrieves songs dynamically using a RESTful API.

🌐 Full-Stack Implementation – Combines frontend (React) and backend (Node.js + Express + MongoDB).

🎧 Responsive Design – Works smoothly across desktop and mobile screens.

☁️ Media Hosting – Songs and thumbnails are securely hosted (e.g., via ImageKit or local storage).

🛠️ Tech Stack
Layer	Technology
Frontend	React.js, Tailwind CSS
Backend	Node.js, Express.js
Database	MongoDB
AI / ML	Face API.js or TensorFlow.js (for mood detection)
Media Hosting	ImageKit / Cloudinary
Version Control	Git & GitHub
📁 Project Structure
Moody-Player/
├── client/                # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # App pages (Home, Player, etc.)
│   │   ├── assets/        # Images, icons, etc.
│   │   └── App.js
│   └── package.json
├── server/                # Express backend
│   ├── routes/            # API endpoints
│   ├── models/            # MongoDB schemas
│   ├── controllers/       # Logic for handling requests
│   ├── server.js
│   └── package.json
├── .env                   # Environment variables
├── README.md
└── package.json           # Root config

⚙️ Installation
1. Clone the Repository
git clone https://github.com/<your-username>/moody-player.git
cd moody-player

2. Install Dependencies

For backend:

cd Backend
npm install


For frontend:

cd frotend
npm install

3. Set Up Environment Variables

Create a .env file in the server directory and add:

PORT=5000
MONGO_URI=your_mongodb_connection_string
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

4. Run the Application

In one terminal, start the backend:

cd server
npm start


In another terminal, start the frontend:

cd client
npm start


App runs at 👉 http://localhost:3000
