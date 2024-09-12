import { Paper } from "@mui/material";

export default function StoryPanel(props: { children?: React.ReactNode; backgroundSrc: string; onClick?: () => void }) {
  return (
    <Paper
      sx={{
        width: 125,
        height: 125,
        padding: 1,
        cursor: "pointer",
        backgroundImage: `url('${props.backgroundSrc}')`,
        backgroundSize: "cover",
        backdropFilter: "brightness(60%)", // TODO: fix this
        textShadow: "2px 1px 1px black",
      }}
      onClick={props.onClick}
    >
      {props.children}
    </Paper>
  );
}