
import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
  Box,
  Collapse,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext

const AdminDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const {  setRole, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setRole(null);
    setUser(null);
    navigate("/login", { replace: true });
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />

      {/* Sidebar - Admin Panel (15% of Screen) */}
      <Drawer
        variant="permanent"
        sx={{
          width: "15vw",
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: "15vw",
            boxSizing: "border-box",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
          },
        }}
      >
        <Toolbar />
        <List>
          <ListItem button>
            <ListItemText primary="Dashboard" />
          </ListItem>

          {/* Manage Menu Section */}
          <ListItem button onClick={() => setMenuOpen(!menuOpen)}>
            <ListItemText primary="Manage Menu" />
            {menuOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={menuOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 4 }}>
              <ListItem button onClick={() => navigate("/create-menu")}>
                <ListItemText primary="Create Menu Item" />
              </ListItem>
              <ListItem  button onClick={() => navigate("/view-menu")}>
                <ListItemText primary="View Menu Items" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem button onClick={() => navigate("/location-update")}>
            <ListItemText primary="Update Location" />
          </ListItem>
          <ListItem button  onClick={() => navigate("/adminorders")}>
            <ListItemText primary="Monitor Orders" />
          </ListItem>
          <ListItem button  onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content Area (Remaining 85%) */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* Top Section (30%) - Scaled Background Image */}
        <Box
          sx={{
            height: "30%",
            backgroundImage: `url(https://img.freepik.com/premium-photo/street-food-delight-high-resolution-image-food-truck-serving-customers-vibrant-setting-e_980716-196718.jpg)`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            opacity: 1, // Make it look like a scaled-down version
          }}
        />

        {/* Bottom Section (70%) - Admin Content */}
        <Box
          sx={{
            height: "70%",
            p: 3,
            color: "white",
            overflow: "auto",
            backgroundColor: "rgba(0, 0, 0, 0.8)", // Background to contrast content
          }}
        >
          <Toolbar />
          <Typography variant="h4">Admin Dashboard</Typography>
          <Typography variant="body1">
            Select an option from the sidebar to manage the food truck operations.
          </Typography>

          
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
