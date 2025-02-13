import React from "react";
import { Box, Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";

const About = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(https://www.brothersfireandsecurity.com/hubfs/AdobeStock_656242207.jpeg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "white",
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Box sx={{ position: "relative", zIndex: 2 }}>
        {/* Hero Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            height: "70vh",
            color: "white",
          }}
        >
          <Typography variant="h2" gutterBottom sx={{ fontFamily: 'Lobster, cursive', fontWeight: 700 }}>
            About Us
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Roboto Slab, serif', fontWeight: 500 }}>
            Learn more about our journey and commitment to healthy food.
          </Typography>
        </Box>

        {/* Why Choose Us Section */}
        <Box sx={{ padding: 4 }}>
          <Typography variant="h3" align="center" gutterBottom sx={{ fontFamily: 'Lobster, cursive', fontWeight: 700 }}>
            Why Choose Us
          </Typography>
          <Typography variant="h6" align="center" gutterBottom sx={{ fontFamily: 'Roboto Slab, serif', fontWeight: 500 }}>
            Here’s what sets us apart
          </Typography>

          <Grid container spacing={4} sx={{ mt: 4 }}>
            {[
              {
                title: "Fresh Ingredients",
                description: "We use only the freshest, locally-sourced ingredients for all our meals.",
                image: "/images/fresh-ingredients.webp",
              },
              {
                title: "Fast Delivery",
                description: "Get your meals delivered on time, every time, wherever you are.",
                image: "/images/fast-delivery2.webp",
              },
              {
                title: "Health Focused",
                description: "Nutritional information and calorie count included with every meal.",
                image: "/images/health-focused.jpg",
              }
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ backgroundColor: "rgba(255, 255, 255, 0.8)", display: "flex", flexDirection: "column", height: "100%" }}>
                  <CardMedia component="img" height="140" image={item.image} alt={item.title} />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Roboto Slab, serif', fontWeight: 600 }}>
                      {item.title}
                    </Typography>
                    <Typography sx={{ fontFamily: 'Roboto Slab, serif' }}>
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Mission and Vision Section */}
        <Box sx={{ padding: 4 }}>
          <Typography variant="h3" align="center" gutterBottom sx={{ fontFamily: 'Lobster, cursive', fontWeight: 700 }}>
            Our Mission and Vision
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {[
              {
                title: "Our Mission",
                description: "To deliver healthy, sustainable, and delicious meals to promote better living.",
              },
              {
                title: "Our Vision",
                description: "To become the go-to food truck brand for healthy and nutritious meals.",
              }
            ].map((item, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card sx={{ backgroundColor: "rgba(255, 255, 255, 0.9)", display: "flex", flexDirection: "column", height: "100%" }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Roboto Slab, serif', fontWeight: 600 }}>
                      {item.title}
                    </Typography>
                    <Typography sx={{ fontFamily: 'Roboto Slab, serif' }}>
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default About;
