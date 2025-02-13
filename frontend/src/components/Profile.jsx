import React from "react";
import { Avatar, Box, Typography, Paper, Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate(); // Hook to navigate after logout

  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1 234 567 890",
    address: "123 Main Street, New York, USA",
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear all local storage data
    navigate("/login"); // Redirect to login page
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        backgroundImage: `url(https://www.brothersfireandsecurity.com/hubfs/AdobeStock_656242207.jpeg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Sidebar */}
      <Paper
        elevation={3}
        sx={{
          width: "300px",
          height: "100%",
          bgcolor: "rgba(255, 255, 255, 0.9)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 3,
        }}
      >
        {/* Profile Icon & Name */}
        <Avatar sx={{ width: 80, height: 80, mb: 2 }}>
          <AccountCircleIcon sx={{ fontSize: 80 }} />
        </Avatar>
        <Typography variant="h6" fontWeight="bold">
          {user.name}
        </Typography>

        {/* User Details */}
        <Box sx={{ mt: 3, width: "100%" }}>
          <Typography variant="body1">
            <strong>Email:</strong> {user.email}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            <strong>Phone:</strong> {user.phone}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            <strong>Address:</strong> {user.address}
          </Typography>
        </Box>

        {/* Logout Button */}
        <Button
          variant="contained"
          color="error"
          sx={{ mt: "auto", width: "100%" }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Paper>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: "24px",
          fontWeight: "bold",
          backdropFilter: "blur(4px)",
        }}
      >
        Welcome, {user.name}!
      </Box>
    </Box>
  );
};

export default ProfilePage;
 