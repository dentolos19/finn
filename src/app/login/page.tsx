import { AppContext } from "@/lib/context";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect } from "react";

export default function Page() {
  const { setLayoutVisible } = useContext(AppContext);

  useEffect(() => {
    setLayoutVisible?.(false);
  }, [])

  return (
    <Container
      sx={{
        height: "100%",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Box>
        <Typography variant={"h5"} sx={{ marginBottom: 2 }}>
          Login
        </Typography>
        <Paper sx={{ paddingX: 4, paddingTop: 4, paddingBottom: 5 }}>
          <Typography sx={{ marginBottom: 1 }}>Email</Typography>
          <TextField fullWidth size={"small"} />
          <Typography sx={{ marginTop: 2, marginBottom: 1 }}>
            Password
          </Typography>
          <TextField fullWidth size={"small"} />
        </Paper>
        <Typography variant={"caption"} sx={{ marginTop: 1, float: "right" }}>
          Forget passsword
        </Typography>
        <Button fullWidth sx={{ marginTop: 6 }} variant={"contained"}>
          Login
        </Button>
        <Button
          fullWidth
          sx={{ marginTop: 4 }}
          variant={"contained"}
          color={"secondary"}
        >
          Sign Up
        </Button>
      </Box>
    </Container>
  );
}