import { Box, Typography } from "@mui/material";

export default function StoryGrid(props: { children?: React.ReactNode }) {
  return (
    <Box>
      <Typography
        sx={{
          marginBottom: 2,
          textAlign: "center",
        }}
      >
        What would you like to know today?
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          placeItems: "center",
          gap: 2,
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
}