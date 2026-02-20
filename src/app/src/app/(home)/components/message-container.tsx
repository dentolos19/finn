import AnimatedBox from "@/components/animated-box";
import theme from "@/theme";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { Paper, Typography } from "@mui/material";
import { useState } from "react";
import { BeatLoader } from "react-spinners";

export default function MessageContainer(props: { type: "bot" | "user"; message: string; isLoading?: boolean }) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const msg = new SpeechSynthesisUtterance();
  msg.text = props.message;
  msg.onstart = () => setIsSpeaking(true);
  msg.onend = () => setIsSpeaking(false);

  const speak = () => {
    window.speechSynthesis.speak(msg);
  };

  return (
    <AnimatedBox
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.4,
      }}
    >
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
        {props.isLoading ? (
          <BeatLoader color={theme.palette.mode === "dark" ? "#FFFFFF" : "#000000"} size={5} />
        ) : (
          <Typography>
            {props.message} {isSpeaking && <VolumeUpIcon sx={{ marginLeft: 1 }} />}
          </Typography>
        )}
      </Paper>
    </AnimatedBox>
  );
}
