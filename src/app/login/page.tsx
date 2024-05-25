import { Button, Container, Paper, TextField } from "@mui/material";

export default function Page() {
  return (
    <Container
      sx={{
        height: "100%",
      }}
    >
      <Paper
        sx={{
          paddingX: 2,
        }}
      >
        <TextField size={"small"} fullWidth />
        <TextField size={"small"} type={"password"} fullWidth />
      </Paper>
      <Button>Login</Button>
      <Button>Sign Up</Button>
    </Container>
  );
}