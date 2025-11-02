import React, { useRef, useState } from "react";

import "./Moodysong.css"

const Moodysong = ({ songs }) => {
    const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const audioRef = useRef(null);

  const handlePlayPause = (index, songUrl) => {
    // If a different song is clicked, load and play it
    if (currentSongIndex !== index) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audio = new Audio(songUrl);
      audioRef.current = audio;
      audio.play();
      setCurrentSongIndex(index);
    } else {
      // Toggle pause/play for the same song
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
        setCurrentSongIndex(null);
      }
    }
  };

  return (
    <div className="moody-player">
      <h2>Recommended Songs</h2>

      {songs.map((song, index) => (
        <div key={index} className="song-card">
          <div className="title">
            <h3>{song.title}</h3>
            <p>{song.artist}</p>
            <audio src="{song.url}"></audio>
          </div>

          <div
            className="play-pause-button"
            onClick={() => handlePlayPause(index, song.audio)} // song.audio is your backend’s URL
          >
            {currentSongIndex === index ? (
              <i className="ri-pause-line"></i>
            ) : (
              <i className="ri-play-circle-fill"></i>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Moodysong;
