import { Box, Paper } from "@mui/material";

export default function MessageContainer(props: {
  children?: React.ReactNode;
  type: "bot" | "user";
}) {
  return (
    <Box>
      <Paper
        sx={{
          padding: 2,
          width: "fit-content",
          maxWidth: "90%",
          float: props.type === "bot" ? "left" : "right",
          overflow: "hidden",
        }}
      >
        {props.children}
      </Paper>
    </Box>
  );
}