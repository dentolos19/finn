"use client";

import { Box, Typography } from "@mui/material";
import { AudioRecorder } from "react-audio-voice-recorder";

export default function Page() {
  const addAudioElement = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);
  };

  return (
    <Box>
      <Typography variant="h1">Home</Typography>
      <AudioRecorder
        onRecordingComplete={addAudioElement}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
        }}
        downloadFileExtension="mp3"
      />
    </Box>
  );
}