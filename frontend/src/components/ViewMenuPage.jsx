import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, CardMedia, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";



const ViewMenuPage = () => {
    const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    // Fetch menu items from your backend
    fetch("https://food-truck-app-backend.onrender.com/menu")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setMenuItems(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://food-truck-app-backend.onrender.com/menu/menuDelete/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error(`Failed to delete item: ${response.status}`);
      }
  
      // Remove the deleted item from state
      setMenuItems(menuItems.filter((item) => item._id !== id));
      console.log("Deleted item with id:", id);
      navigate("/view-menu");
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/edit-item/${id}`);
    console.log("Update item with id:", id);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        View Menu Items
      </Typography>

      <Grid container spacing={2}>
        {menuItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item._id}>
            <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <CardMedia component="img" sx={{ width: "100%", height: 150, objectFit: "cover" }} image={item.imageUrl} alt={item.name} />
              <Box sx={{ display: "flex", flexDirection: "column", p: 2 }}>
                <CardContent>
                  <Typography variant="h5">{item.name}</Typography>
                  <Typography variant="body1">{item.description}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Ingredients:</strong> {item.ingredients}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Nutritional Information:</strong>
                    <ul>
                      <li>Calories: {item.nutritionalValues.calories}</li>
                      <li>Protein: {item.nutritionalValues.protein}</li>
                      <li>Carbs: {item.nutritionalValues.carbohydrates}</li>
                      <li>Fats: {item.nutritionalValues.fats}</li>
                      <li>Fiber: {item.nutritionalValues.fiber}</li>
                    </ul>
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Price:</strong> ₹{item.price}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Allergy Info:</strong> {item.allergyInfo}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Diet Tags:</strong> {item.dietTags}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Available:</strong> {item.availability ? "Yes" : "No"}
                  </Typography>
                </CardContent>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button variant="contained" color="secondary" onClick={() => handleDelete(item._id)}>
                    Delete
                  </Button>
                  <Button variant="contained" color="primary" onClick={() => handleUpdate(item._id)}>
                    Update
                  </Button>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ViewMenuPage;
