import React, { useState } from "react";
import FacialExpression from "./componets/facedetection"
import Moodysong from "./componets/Moodysong"
import "./App.css";

function App() {
  const [songs, setSongs] = useState([
    { title: "test_title", artist: "test_artist", url: "test_url" },
    { title: "test_title1", artist: "test_artist1", url: "test_url1" },
    { title: "test_title2", artist: "test_artist2", url: "test_url2" },
  ]);

  return (
    <>
      <FacialExpression setSongs={setSongs} />
      <Moodysong songs={songs} />
    </>
  );
}

export default App;
