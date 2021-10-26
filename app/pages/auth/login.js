import { useState, useEffect } from "react";
import { signIn } from "next-auth/client";
import { Container } from "@mui/material";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    console.log(result);
  };
  return (
    <Container maxWidth="sm" sx={{ p: 3 }}>
      <Typography variant="h2">Login</Typography>
      <Stack
        component="form"
        spacing={2}
        noValidate
        autoComplete="off"
        sx={{ pt: 3 }}
      >
        <TextField
          required
          id="outlined-required"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
      </Stack>
    </Container>
  );
};

export default Login;
