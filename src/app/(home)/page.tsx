"use client";

import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import { Box, IconButton, Typography } from "@mui/material";
import MicRecorder from "mic-recorder";
import { useMemo, useState } from "react";

export default function Page() {
  const [isRecording, setIsRecording] = useState(false);
  const [audio, setAudio] = useState("");
  const [audioBlobURL, setAudioBlobURL] = useState("");

  const recorder = useMemo(() => new MicRecorder({ bitRate: 128, encoder: "mp3" }), []);

  const startRecording = () => {
    if (isRecording) {
      return;
    }
    recorder.start().then(() => {
      setIsRecording(true);
    });
  };

  const stopRecording = () => {
    setIsRecording(false);
    recorder
      .stop()
      .getAudio()
      .then(([buffer, blob]) => {
        const file = new File(buffer, "test.mp3", {
          type: blob.type,
          lastModified: Date.now(),
        });
        setAudioBlobURL(URL.createObjectURL(file));

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const buffer = reader.result;
          if (typeof buffer !== "string") {
            return;
          }
          const data = buffer.split(",")[1];
          setAudio(data);
        };
      })
      .catch(() => {
        console.error("Error while recording audio.");
      });
  };

  return (
    <Box>
      <Typography variant={"h1"}>Hello, world!</Typography>
      <IconButton
        onClick={() => {
          if (isRecording) {
            stopRecording();
          } else {
            startRecording();
          }
        }}
      >
        <KeyboardVoiceIcon />
      </IconButton>
      {isRecording ? <span>Recording</span> : <span>Not recording</span>}
      <audio src={audioBlobURL} controls={true} />
    </Box>
  );
}