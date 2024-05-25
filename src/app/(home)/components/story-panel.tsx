import { Paper } from "@mui/material";

export default function StoryPanel(props: {
  children?: React.ReactNode;
  backgroundSrc: string;
  onClick?: () => void;
}) {
  return (
    <Paper
      sx={{
        width: 120,
        height: 120,
        padding: 1,
        cursor: "pointer",
        backgroundImage: `url('${props.backgroundSrc}')`,
        backgroundSize: "cover",
        backdropFilter: "brightness(60%)", // TODO: fix this
      }}
    >
      {props.children}
    </Paper>
  );
}