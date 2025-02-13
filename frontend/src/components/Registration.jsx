import React, { useState } from "react";
import axios from "axios";
import { Box, Typography, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$%^&*!]{8,}$/;

    if (!formData.name.trim()) errors.name = "Full Name is required";
    if (!emailRegex.test(formData.email)) errors.email = "Enter a valid email address";
    if (!phoneRegex.test(formData.phone)) errors.phone = "Enter a valid 10-digit phone number";
    if (!passwordRegex.test(formData.password))
      errors.password = "Password must be at least 8 characters, with letters & numbers";
    if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = "Passwords do not match!";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axios.post("http://localhost:3000/users/createuser", {
        name: formData.name,
        email: formData.email,
        mobileNo: formData.phone,
        password: formData.password,
        roleId: "6798996438c1492f11620e06",
      });

      console.log("User registered:", response.data);

      // Show confirmation popup
      if (window.confirm("Registration successful! Click OK to go to Login.")) {
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        });
        // Redirect to login page
        navigate("/login");
      }
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Something went wrong.");
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
          Create Your Account
        </Typography>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
          <TextField
            fullWidth
            required
            id="name"
            label="Full Name"
            value={formData.name}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            error={!!validationErrors.name}
            helperText={validationErrors.name}
            InputProps={{ style: { backgroundColor: "rgba(255, 255, 255, 0.8)" } }}
          />
          <TextField
            fullWidth
            required
            id="email"
            label="Email Address"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            error={!!validationErrors.email}
            helperText={validationErrors.email}
            InputProps={{ style: { backgroundColor: "rgba(255, 255, 255, 0.8)" } }}
          />
          <TextField
            fullWidth
            required
            id="phone"
            label="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            type="tel"
            variant="outlined"
            margin="normal"
            error={!!validationErrors.phone}
            helperText={validationErrors.phone}
            InputProps={{ style: { backgroundColor: "rgba(255, 255, 255, 0.8)" } }}
          />
          <TextField
            fullWidth
            required
            id="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            variant="outlined"
            margin="normal"
            error={!!validationErrors.password}
            helperText={validationErrors.password}
            InputProps={{ style: { backgroundColor: "rgba(255, 255, 255, 0.8)" } }}
          />
          <TextField
            fullWidth
            required
            id="confirmPassword"
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            type="password"
            variant="outlined"
            margin="normal"
            error={!!validationErrors.confirmPassword}
            helperText={validationErrors.confirmPassword}
            InputProps={{ style: { backgroundColor: "rgba(255, 255, 255, 0.8)" } }}
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
          >
            Register
          </Button>
          <Typography sx={{ mt: 2, color: "white" }}>
            Already have an account?
          </Typography>
          <Button
            onClick={() => navigate("/login")}
            sx={{
              color: "rgb(240, 160, 75)",
              textTransform: "none",
              fontWeight: 600,
              '&:hover': { color: "rgb(200, 130, 60)" },
            }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Registration;
