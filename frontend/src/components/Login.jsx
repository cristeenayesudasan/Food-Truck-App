import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // Import useAuth

const Login = ({  }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setIsAuthenticated, setRole } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    try {
      const response = await axios.post(
        "https://food-truck-app-backend.onrender.com/users/login", 
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
  
      console.log("Server Response:", response.data);
      console.log("Logged in user's role:", response.data.user.role);
  
      if (response.data.token) {
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("user", JSON.stringify(response.data.user));
        
        setIsAuthenticated(true);
        setRole(response.data.user.role);  // Update role in AuthContext
        
        console.log("Navigating to:", response.data.user.role === "admin" ? "/admin" : "/");
        
        if (response.data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        setError("Login failed, try again.");
      }
    } catch (err) {
      console.error("Error during login:", err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data.message : "Invalid credentials");
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(https://img.freepik.com/premium-photo/healthy-food-truck-serving-nutritious-meals-made-with-fresh-local-ingredients-offering-convenient_328432-17857.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 2,
        }}
      />
      <Box
        sx={{
          backgroundColor: "transparent",
          padding: 4,
          borderRadius: 2,
          zIndex: 3,
          width: "90%",
          maxWidth: 400,
          textAlign: "center",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Lobster, cursive', fontWeight: 700, color: "white" }}>
          Login
        </Typography>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={(e) => e.preventDefault()}>
          <TextField
            fullWidth
            required
            label="Email Address"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              mb: 2,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            }}
          />
          <TextField
            fullWidth
            required
            type="password"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              mb: 2,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              fontFamily: 'Roboto Slab, serif',
              fontWeight: 600,
              backgroundColor: "rgb(240, 160, 75)",
              '&:hover': { backgroundColor: "rgb(200, 130, 60)" },
            }}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Typography sx={{ mt: 2, color: "white" }}>
            Don't have an account?
          </Typography>
          <Button
            onClick={() => navigate("/register")}
            sx={{
              color: "rgb(240, 160, 75)",
              textTransform: "none",
              fontWeight: 600,
              '&:hover': { color: "rgb(200, 130, 60)" },
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
