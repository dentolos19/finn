import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";

export default function MessageContainer(props: {
  type: "bot" | "user";
  message: string;
}) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const msg = new SpeechSynthesisUtterance();
  msg.text = props.message;
  msg.onstart = () => setIsSpeaking(true);
  msg.onend = () => setIsSpeaking(false);

  const speak = () => {
    window.speechSynthesis.speak(msg);
  };

  return (
    <Box>
      <Paper
        sx={{
          padding: 2,
          width: "fit-content",
          maxWidth: "90%",
          float: props.type === "bot" ? "left" : "right",
          overflow: "hidden",
          cursor: "pointer",
        }}
        onClick={speak}
      >
        <Typography>{props.message} {isSpeaking && <VolumeUpIcon sx={{ marginLeft: 1 }} />}</Typography>

      </Paper>
    </Box>
  );
}