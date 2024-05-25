"use client";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import HomeIcon from "@mui/icons-material/Home";
import MicIcon from "@mui/icons-material/Mic";
import { BottomNavigation, BottomNavigationAction, Box, Fab, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";

export default function LayoutContainer(props: {
  children: React.ReactNode;
}) {
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
    <Box
      sx={{
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ flexGrow: 1 }}>{props.children}</Box>
      <BottomNavigation showLabels>
        <BottomNavigationAction label={"Home"} icon={<HomeIcon />} />
        <Box
          sx={{
            width: "120px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            bottom: "30px",
          }}
        >
          {/* <IconButton
            sx={{
              width: 70,
              height: 70,
            }}
            color={"primary"}
            onClick={() => {
              if (isRecording) {
                stopRecording();
              } else {
                startRecording();
              }
            }}
          >
            <MicIcon />
          </IconButton> */}
          <Box>
            <Fab
              onClick={() => {
                if (isRecording) {
                  stopRecording();
                } else {
                  startRecording();
                }
              }}
            >
              {isRecording ? <GraphicEqIcon /> : <MicIcon />}
            </Fab>
          </Box>
          <Typography variant={"subtitle2"}>{isRecording ? "Recording" : "Record"}</Typography>
          {recordingBlob && (
            <Paper
              sx={{
                padding: 4,
                position: "absolute",
                bottom: 100,
              }}
            >
              <Typography variant={"caption"}>Hello</Typography>
              <audio src={URL.createObjectURL(recordingBlob)} controls />
            </Paper>
          )}
        </Box>
        <BottomNavigationAction label={"Profile"} icon={<AccountBoxIcon />} />
      </BottomNavigation>
    </Box>
  );
}