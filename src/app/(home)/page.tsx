"use client";

import HeaderPanel from "@/app/(home)/components/header-panel";
import MessageContainer from "@/app/(home)/components/message-container";
import StoryGrid from "@/app/(home)/components/story-grid";
import StoryPanel from "@/app/(home)/components/story-panel";
import AnimatedBox from "@/components/animated-box";
import storyboard from "@/data/storyboard.json";
import { transcribeAudio } from "@/interface";
import { delay } from "@/utils";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";
import HearingIcon from "@mui/icons-material/Hearing";
import MicIcon from "@mui/icons-material/Mic";
import {
  Box,
  Chip,
  Container,
  Fab,
  IconButton,
  Paper,
  Stack,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";

export default function Page() {
  const messagesRef = useRef<HTMLDivElement>(null);

  const [topicPanelOpen, setTopicPanelOpen] = useState(true);
  const [audioPanelOpen, setAudioPanelOpen] = useState(false);
  const [suggestionPanelOpen, setSuggestionPanelOpen] = useState(false);
  const [disclaimerPanelOpen, setDisclaimerPanelOpen] = useState(true);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<
    {
      type: "bot" | "user";
      message: string;
      isLoading?: boolean;
    }[]
  >([]);
  const [story, setStory] = useState<{
    message: string;
    options?: {
      label: string;
      next: number;
    }[];
  }>();

  const { startRecording, stopRecording, recordingBlob, isRecording } = useAudioRecorder();

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startStory = () => {
    const story = storyboard[0];
    setStory(story);
    setMessages((prev) => [
      ...prev,
      {
        type: "bot",
        message: story.message,
      },
    ]);
    setSuggestionPanelOpen(true);
    setTopicPanelOpen(false);
    setDisclaimerPanelOpen(false);
  };

  const nextStory = (option: {
    label: string;
    next: number;
  }) => {
    const story = storyboard[option.next];
    setStory(story);
    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        message: option.label,
      },
    ]);
    delay(1000).then(() => {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          message: story.message,
        },
      ]);
    });
    setSuggestionPanelOpen(story.options !== undefined);
    setTopicPanelOpen(false);
  };

  useEffect(() => {
    if (!recordingBlob) return;
    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        message: "Recording...",
        isLoading: true,
      },
    ]);
    transcribeAudio(recordingBlob)
      .then((data) => {
        setMessages((prev) => [
          ...prev.filter((message) => !message.isLoading),
          {
            type: "user",
            message: data.transcription,
          },
        ]);
      })
      .catch(() => {
        setMessages((prev) => [
          ...prev.filter((message) => !message.isLoading),
          {
            type: "user",
            message: "An error occurred while transcribing the audio.",
          },
        ]);
      });
  }, [recordingBlob]);

  // biome-ignore lint/correctness/useExhaustiveDependencies:
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTo({
        top: messagesRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <Box
      sx={{
        height: "100%",
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
      }}
    >
      <HeaderPanel onHelp={() => setTopicPanelOpen(!topicPanelOpen)} />
      <Box
        ref={messagesRef}
        sx={{
          position: "relative",
          overflow: "auto",
        }}
      >
        <AnimatePresence>
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
              <MessageContainer key={index} type={data.type} message={data.message} isLoading={data.isLoading} />
            ))}
          </Container>
        </AnimatePresence>
        {disclaimerPanelOpen && (
          <Box
            sx={{
              width: "100%",
              position: "absolute",
              bottom: 10,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography variant={"caption"} width={"70%"} color={"GrayText"} align={"center"}>
              We use your data to provide you with a better experience. You may opt out anytime.
            </Typography>
          </Box>
        )}
        <Box
          sx={{
            position: "sticky",
            bottom: 10,
            left: 0,
            width: "100%",
            padding: 2,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {topicPanelOpen && (
            <StoryGrid>
              <StoryPanel backgroundSrc={"/assets/kids.jpg"} onClick={startStory}>
                CPF Withdrawal
              </StoryPanel>
              <StoryPanel backgroundSrc={"/assets/savings.jpg"} onClick={startStory}>
                Investment Return
              </StoryPanel>
              <StoryPanel backgroundSrc={"/assets/old.jpg"} onClick={startStory}>
                Retire Gracefully
              </StoryPanel>
              <StoryPanel backgroundSrc={"/assets/money.jpg"} onClick={startStory}>
                Inflation
              </StoryPanel>
            </StoryGrid>
          )}
        </Box>
      </Box>
      <Paper>
        <AnimatePresence>
          {suggestionPanelOpen && (
            <AnimatedBox
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
              {story?.options && (
                <Stack direction={"row"} padding={2} spacing={1}>
                  {story?.options.map((option, index) => (
                    <Chip
                      key={index}
                      label={option.label}
                      onClick={() => {
                        nextStory(option);
                      }}
                    />
                  ))}
                </Stack>
              )}
            </AnimatedBox>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {audioPanelOpen && (
            <AnimatedBox
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
              sx={{ margin: 1 }}
            >
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
                <Fab className={isRecording ? "pulsating" : ""} color={"primary"} onClick={toggleRecording}>
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
            </AnimatedBox>
          )}
        </AnimatePresence>
        <Toolbar>
          <Tooltip title={"Attach File"}>
            <IconButton>
              <AttachFileIcon />
            </IconButton>
          </Tooltip>
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
                setDisclaimerPanelOpen(false);
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
          <Tooltip title={"Voice Message"}>
            <IconButton
              onClick={() => {
                setTopicPanelOpen(false);
                setAudioPanelOpen(!audioPanelOpen);
                setDisclaimerPanelOpen(false);
              }}
            >
              <MicIcon color={"info"} />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </Paper>
    </Box>
  );
}