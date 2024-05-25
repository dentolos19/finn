"use client";

import { Button, Container, Paper, TextField, Typography } from "@mui/material";

export default function Page() {
  return (
    <Container
      sx={{
        height: "100%",
      }}
    >
      <Typography
        sx={{
          marginBottom: 2,
        }}
        variant={"h4"}
      >
        Login
      </Typography>
      <Paper
        sx={{
          paddingX: 3,
          paddingY: 3,
        }}
      >
        <Typography>Email</Typography>
        <TextField size={"small"} fullWidth />
        <Typography>Password</Typography>
        <TextField size={"small"} type={"password"} fullWidth />
      </Paper>
      <Typography
        sx={{
          marginTop: 1,
          marginBottom: 1,
          textAlign: "right",
        }}
      >
        Forgot password?
      </Typography>
      <Button
        sx={{
          marginTop: 4,
        }}
        variant={"contained"}
        fullWidth
      >
        Login
      </Button>
      <Typography
        sx={{
          marginTop: 2,
          marginBottom: 1,
          textAlign: "center",
        }}
      >
        Don't have an account?
      </Typography>
      <Button variant={"contained"} color={"secondary"} fullWidth>
        Sign Up
      </Button>
    </Container>
  );
}