"use client";

import { Button, Container } from "@mui/material";
import { useEffect } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";

export default function Page() {
  const {
    startRecording,
    stopRecording,
    togglePauseResume,
    recordingBlob,
    isRecording,
    isPaused,
    recordingTime,
    mediaRecorder,
  } = useAudioRecorder();

  useEffect(() => {
    if (!recordingBlob) return;

    // recordingBlob will be present at this point after 'stopRecording' has been called
  }, [recordingBlob]);

  return (
    <Container>
      <Button
        onClick={() => {
          if (isRecording) {
            stopRecording();
          } else {
            startRecording();
          }
        }}
      >
        {isRecording ? "Stop" : "Start"}
      </Button>
      {recordingBlob && <audio src={URL.createObjectURL(recordingBlob)} controls />}
    </Container>
  );
}