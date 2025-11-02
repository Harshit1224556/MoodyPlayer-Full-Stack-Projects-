import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import "./facialexpression.css"
import axios from "axios";

export default function FacialExpression({ setSongs }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const [intervalId, setIntervalId] = useState(null);


  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        ]);
        setModelsLoaded(true);
        console.log(" Models loaded successfully");
      } catch (err) {
        console.error("Error loading models:", err);
      }
    };
    loadModels();
  }, []);

  
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
        console.log("🎥 Camera started");
      } catch (err) {
        console.error("Camera access denied:", err);
        alert("Please allow camera access to continue.");
      }
    };
    startCamera();
  }, []);


  const startDetection = () => {
    if (!modelsLoaded) {
      alert("Models are still loading. Please wait...");
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const displaySize = { width: video.videoWidth, height: video.videoHeight };
    faceapi.matchDimensions(canvas, displaySize);

    const id = setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      const resized = faceapi.resizeResults(detections, displaySize);
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      faceapi.draw.drawDetections(canvas, resized);
      faceapi.draw.drawFaceExpressions(canvas, resized);

      if (detections.length > 0) {
        const expressions = detections[0].expressions;
        const mood = Object.keys(expressions).reduce((a, b) =>
          expressions[a] > expressions[b] ? a : b
        );

        console.log("🧠 Current Mood:", mood);

        try {
          const response = await axios.get(`http://localhost:3000/song?mood=${mood}`);
          console.log(response.data);
          setSongs(response.data.song); 
        } catch (error) {
          console.error(" Error fetching songs:", error);
        }
      }
    }, 1000);

    setIntervalId(id);
    setDetecting(true);
  };

  const stopDetection = () => {
    if (intervalId) clearInterval(intervalId);
    setDetecting(false);
  };

  return (
    <div className="facial-container">
      <h2>Facial Expression Detection</h2>
      <div className="video-wrapper">
        <video ref={videoRef} autoPlay muted className="video-box" />
        <canvas ref={canvasRef} className="canvas-box" />
      </div>

      <div className="btn-wrapper">
        {!detecting ? (
          <button
            onClick={startDetection}
            className="detect-btn"
            disabled={!modelsLoaded}
          >
            Start Detecting
          </button>
        ) : (
          <button onClick={stopDetection} className="stop-btn">
            Stop Detection
          </button>
        )}
      </div>
    </div>
  );
}


