import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const { isAuthenticated, setIsAuthenticated, role, setRole, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setRole(null);
    setUser(null);
    navigate("/login");
  };

  return (
    <AppBar position="sticky" color="transparent" sx={{ backgroundColor: "rgba(0, 0, 0, 0.8)", boxShadow: "none" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: "white", fontFamily: "Poppins, sans-serif", fontWeight: 700 }}
        >
          Healthy Bites
        </Typography>

        {/* Common Links */}
        
        <Button component={Link} to="/about" color="inherit" sx={{ color: "white", fontFamily: "Poppins, sans-serif" }}>
          About
        </Button>

        {isAuthenticated ? (
          <>
            {role === "customer" && (
              <>
                <Button component={Link} to="/" color="inherit" sx={{ color: "white", fontFamily: "Poppins, sans-serif" }}>
                  Home
              </Button>
                <Button component={Link} to="/cart" color="inherit" sx={{ color: "white", fontFamily: "Poppins, sans-serif" }}>
                  Cart
                </Button>
                <Button component={Link} to="/orders" color="inherit" sx={{ color: "white", fontFamily: "Poppins, sans-serif" }}>
                  Orders
                </Button>
                
              </>
            )}

            {role === "admin" && (
              <Button component={Link} to="admin" color="inherit" sx={{ color: "white", fontFamily: "Poppins, sans-serif" }}>
                Dashboard
              </Button>
            )}

            <Button onClick={handleLogout} color="inherit" sx={{ color: "white", fontFamily: "Poppins, sans-serif" }}>
              Logout
            </Button>
          </>
        ) : (
          <Button component={Link} to="/login" color="inherit" sx={{ color: "white", fontFamily: "Poppins, sans-serif" }}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
