"use client";

import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";

export default function Page() {
  return (
    <Container
      sx={{
        maxWidth: {
          xs: "90% !important",
          sm: "50% !important",
          md: "30% !important",
        },
        height: "100%",
      }}
    >
      <Box
        sx={{
          marginTop: 4,
          marginBottom: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src={"/assets/family.png"}
          alt={"Banner"}
          style={{
            width: "60%",
            height: "100%",
          }}
        />
      </Box>
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
        <Typography sx={{ marginTop: 2 }}>Password</Typography>
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
        href={"/"}
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