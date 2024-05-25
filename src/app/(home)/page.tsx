"use client";

import { transcribeAudio } from "@/lib/interface";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";
import HelpIcon from "@mui/icons-material/Help";
import HomeIcon from "@mui/icons-material/Home";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import { AppBar, Box, Container, Fab, IconButton, Paper, TextField, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";

export default function Page() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [messages, setMessages] = useState<
    {
      type: "bot" | "user";
      message: string;
    }[]
  >([
    {
      type: "bot",
      message: "Hello there! What can I help you with?",
    },
    {
      type: "user",
      message: "asdas",
    },
  ]);

  const { startRecording, stopRecording, recordingBlob, isRecording } = useAudioRecorder();

  useEffect(() => {
    if (!recordingBlob) return;

    transcribeAudio(recordingBlob).then((data) => {
      setMessages((prev) => [
        ...prev,
        {
          type: "user",
          message: data.transcription,
        },
      ]);
    });
  }, [recordingBlob]);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppBar>
        <Toolbar>
          <IconButton>
            <HomeIcon />
          </IconButton>
          <Typography
            sx={{
              flexGrow: 1,
              textAlign: "center",
            }}
            variant={"h6"}
          >
            Chat With Me
          </Typography>
          <IconButton>
            <HelpIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar />
        <Container
          sx={{
            paddingY: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {messages.map((message, index) => (
            <Box key={index}>
              <Paper
                sx={{
                  padding: 2,
                  width: "fit-content",
                  maxWidth: "90%",
                  float: message.type === "bot" ? "left" : "right",
                }}
              >
                {message.message}
              </Paper>
            </Box>
          ))}
        </Container>
      </Box>
      <Paper
        sx={{
          position: "relative",
        }}
      >
        {panelOpen && (
          <Box sx={{ margin: 1 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <IconButton onClick={() => setPanelOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box
              sx={{
                marginBottom: 2,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Fab
                color={"primary"}
                onClick={() => {
                  if (isRecording) {
                    stopRecording();
                  } else {
                    startRecording();
                  }
                }}
              >
                {isRecording ? <StopIcon /> : <MicIcon />}
              </Fab>
            </Box>
            <Box
              sx={{
                marginBottom: 4,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography>{isRecording ? "Recording..." : "Press the mic to start recording!"}</Typography>
            </Box>
          </Box>
        )}
        <Toolbar>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <TextField
            sx={{
              marginX: 2,
              flexGrow: 1,
            }}
            size={"small"}
            placeholder={"Write something..."}
            fullWidth
          />
          <IconButton onClick={() => setPanelOpen(!panelOpen)}>
            <MicIcon />
          </IconButton>
        </Toolbar>
      </Paper>
    </Box>
  );
}