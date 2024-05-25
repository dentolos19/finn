"use client";

import MessageContainer from "@/app/(home)/components/message-container";
import StoryGrid from "@/app/(home)/components/story-grid";
import StoryPanel from "@/app/(home)/components/story-panel";
import { transcribeAudio } from "@/interface";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";
import HearingIcon from "@mui/icons-material/Hearing";
import HelpIcon from "@mui/icons-material/Help";
import MicIcon from "@mui/icons-material/Mic";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { AppBar, Box, Container, Fab, IconButton, Paper, TextField, Toolbar, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";

export default function Page() {
  const [audioPanelOpen, setAudioPanelOpen] = useState(false);
  const [topicPanelOpen, setTopicPanelOpen] = useState(true);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<
    {
      type: "bot" | "user";
      message: string;
      audioBlob?: Blob;
    }[]
  >([]);

  const { startRecording, stopRecording, recordingBlob, isRecording } = useAudioRecorder();

  useEffect(() => {
    if (!recordingBlob) return;
    transcribeAudio(recordingBlob).then((data) => {
      setMessages((prev) => [
        ...prev,
        {
          type: "user",
          message: data.transcription,
          audioBlob: recordingBlob,
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
            <MoreHorizIcon />
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
      <Box sx={{ maxHeight: "100%", display: "flex", flexDirection: "column", position: "relative", flexGrow: 1 }}>
        <Toolbar />
        <Container
          sx={{
            paddingY: 2,
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {messages.map((data, index) => (
            <MessageContainer key={index} type={data.type} message={data.message} />
          ))}
        </Container>
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            padding: 2,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {topicPanelOpen && (
            <StoryGrid>
              <StoryPanel backgroundSrc={"/assets/kids.jpg"}>CPF Withdrawal</StoryPanel>
              <StoryPanel backgroundSrc={"/assets/savings.jpg"}>Investment Return</StoryPanel>
              <StoryPanel backgroundSrc={"/assets/old.jpg"}>Retire Gracefully</StoryPanel>
              <StoryPanel backgroundSrc={"/assets/money.jpg"}>Inflation</StoryPanel>
            </StoryGrid>
          )}
        </Box>
      </Box>
      <Paper>
        <AnimatePresence>
          {audioPanelOpen && (
            <motion.div
              initial={{
                height: 0,
              }}
              animate={{
                height: "auto",
              }}
              exit={{
                height: 0,
              }}
              transition={{
                duration: 0.2,
              }}
            >
              <Box sx={{ margin: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <IconButton onClick={() => setAudioPanelOpen(false)}>
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
                    className={isRecording ? "pulsating" : ""}
                    color={"primary"}
                    onClick={() => {
                      if (isRecording) {
                        stopRecording();
                      } else {
                        startRecording();
                      }
                    }}
                  >
                    {isRecording ? <HearingIcon /> : <MicIcon />}
                  </Fab>
                </Box>
                <Box
                  sx={{
                    marginBottom: 4,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Typography>{isRecording ? "Listening..." : "Press the mic to start recording!"}</Typography>
                </Box>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
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
            value={message}
            fullWidth
            onChange={(e) => setMessage(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                setTopicPanelOpen(false);
                setMessages((prev) => [
                  ...prev,
                  {
                    type: "user",
                    message,
                  },
                ]);
                setMessage("");
              }
            }}
          />
          <IconButton
            onClick={() => {
              setTopicPanelOpen(false);
              setAudioPanelOpen(!audioPanelOpen);
            }}
          >
            <MicIcon color={"info"} />
          </IconButton>
        </Toolbar>
      </Paper>
    </Box>
  );
}