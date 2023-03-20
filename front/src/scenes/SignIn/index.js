import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoginForm from "@root/components/LoginForm";
import { login, isAuthenticated } from "@root/store/auth";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const theme = createTheme();

export default function SignIn() {
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      login: data.get("login"),
      password: data.get("password"),
    };
    console.log(payload);
    dispatch(login(payload));
  };

  const isAuth = useSelector(isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate("/entities");
    }
  }, [isAuth]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <LoginForm handleSubmit={handleSubmit} />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
