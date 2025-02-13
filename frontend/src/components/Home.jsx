import React from "react";
import { AppBar, Toolbar, Typography, Button, Container, Grid, Card, CardMedia, CardContent } from "@mui/material";
import { Box } from "@mui/system";

const Home = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(https://www.brothersfireandsecurity.com/hubfs/AdobeStock_656242207.jpeg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Overlay for content visibility */}
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

      {/* Header */}
      <AppBar position="sticky" color="transparent" sx={{ zIndex: 3 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'Roboto Slab, serif', fontWeight: 700, color: "white" }}>
            Healthy Bites
          </Typography>
          <Button color="inherit" sx={{ fontFamily: 'Roboto Slab, serif', fontWeight: 500, color: "white" }}>Home</Button>
          <Button color="inherit" sx={{ fontFamily: 'Roboto Slab, serif', fontWeight: 500, color: "white" }}>Menu</Button>
          <Button color="inherit" sx={{ fontFamily: 'Roboto Slab, serif', fontWeight: 500, color: "white" }}>Order Now</Button>
          <Button color="inherit" sx={{ fontFamily: 'Roboto Slab, serif', fontWeight: 500, color: "white" }}>Contact</Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          height: "100%",
          position: "relative",
          zIndex: 3,
          color: "white",
        }}
      >
        <Typography variant="h2" gutterBottom sx={{ fontFamily: 'Lobster, cursive', fontWeight: 700 }}>
          Fresh, Healthy Meals Delivered to You
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Roboto Slab, serif', fontWeight: 500 }}>
          Find our food truck, pre-order your meals, and stay fit with delicious, nutritious food.
        </Typography>
        <Button variant="contained" color="secondary" size="large" sx={{ fontFamily: 'Roboto Slab, serif', fontWeight: 600 }}>
          Explore Menu
        </Button>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 6, position: "relative", zIndex: 3 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontFamily: 'Lobster, cursive', fontWeight: 700, color: "white" }}>
          Why Choose Us
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
              <CardMedia
                component="img"
                height="140"
                image="/images/fresh-ingredients.webp"
                alt="Fresh Ingredients"
              />
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Roboto Slab, serif', fontWeight: 600 }}>
                  Fresh Ingredients
                </Typography>
                <Typography sx={{ fontFamily: 'Roboto Slab, serif' }}>
                  We use only the freshest, locally-sourced ingredients for all our meals.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
              <CardMedia
                component="img"
                height="140"
                image="/images/fast-delivery2.webp"
                alt="Fast Delivery"
              />
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Roboto Slab, serif', fontWeight: 600 }}>
                  Fast Delivery
                </Typography>
                <Typography sx={{ fontFamily: 'Roboto Slab, serif' }}>
                  Get your meals delivered on time, every time, wherever you are.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
              <CardMedia
                component="img"
                height="140"
                image="/images/health-focused.jpg"
                alt="Health Focused"
              />
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Roboto Slab, serif', fontWeight: 600 }}>
                  Health Focused
                </Typography>
                <Typography sx={{ fontFamily: 'Roboto Slab, serif' }}>
                  Nutritional information and calorie count included with every meal.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box sx={{ backgroundColor: "#333", color: "white", py: 4, textAlign: "center", position: "relative", zIndex: 3 }}>
        <Typography variant="body1" sx={{ fontFamily: 'Roboto Slab, serif' }}>© 2025 Food Truck App. All rights reserved.</Typography>
      </Box>
    </Box>
  );
};

export default Home;
