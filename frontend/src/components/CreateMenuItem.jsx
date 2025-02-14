import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box, FormControlLabel, Checkbox, Paper } from "@mui/material";

const CreateMenuItem = () => {
  const [dishName, setDishName] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fats, setFats] = useState("");
  const [fiber, setFiber] = useState("");
  const [price, setPrice] = useState("");
  const [allergyInfo, setAllergyInfo] = useState("");
  const [dietTags, setDietTags] = useState("");
  const [availability, setAvailability] = useState(true);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", dishName);
    formData.append("description", description);
    formData.append("ingredients", ingredients);
    
    const nutritionalValues = {
      calories: calories,
      protein: protein,
      carbohydrates: carbs,
      fats: fats,
      fiber: fiber
    };
    
    formData.append("nutritionalValues", JSON.stringify(nutritionalValues));
    formData.append("price", price);
    formData.append("allergyInfo", allergyInfo);
    formData.append("image", image);
    formData.append("dietTags", dietTags);
    formData.append("availability", availability);
    
    try {
      const response = await fetch("https://food-truck-app-backend.onrender.com/menu/create", {
        method: "POST",
        body: formData,
      });
    
      const data = await response.json();
      if (response.ok) {
        alert("Menu item created successfully!");
        navigate("/view-menu"); // Redirect after success
      } else {
        alert("Error creating menu item: " + data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error creating menu item");
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: "600px", mx: "auto" }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom align="center">
          Create New Menu Item
        </Typography>

        <TextField fullWidth label="Dish Name" value={dishName} onChange={(e) => setDishName(e.target.value)} margin="normal" />
        
        <Box sx={{ my: 2 }}>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            style={{
              display: "block",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              width: "100%",
              cursor: "pointer"
            }}
          />
        </Box>

        <TextField fullWidth label="Description" value={description} onChange={(e) => setDescription(e.target.value)} margin="normal" multiline rows={3} />
        <TextField fullWidth label="Ingredients" value={ingredients} onChange={(e) => setIngredients(e.target.value)} margin="normal" multiline rows={3} />
        <TextField fullWidth label="Calories (kcal)" value={calories} onChange={(e) => setCalories(e.target.value)} margin="normal" />
        <TextField fullWidth label="Protein (g)" value={protein} onChange={(e) => setProtein(e.target.value)} margin="normal" />
        <TextField fullWidth label="Carbohydrates (g)" value={carbs} onChange={(e) => setCarbs(e.target.value)} margin="normal" />
        <TextField fullWidth label="Fats (g)" value={fats} onChange={(e) => setFats(e.target.value)} margin="normal" />
        <TextField fullWidth label="Fiber (g)" value={fiber} onChange={(e) => setFiber(e.target.value)} margin="normal" />
        <TextField fullWidth label="Price (₹)" value={price} onChange={(e) => setPrice(e.target.value)} margin="normal" />
        <TextField fullWidth label="Allergy Information" value={allergyInfo} onChange={(e) => setAllergyInfo(e.target.value)} margin="normal" />
        <TextField fullWidth label="Diet Tags (comma-separated)" value={dietTags} onChange={(e) => setDietTags(e.target.value)} margin="normal" />

        <FormControlLabel
          control={<Checkbox checked={availability} onChange={(e) => setAvailability(e.target.checked)} />}
          label="Available"
          sx={{ mt: 1 }}
        />

        <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth sx={{ mt: 2 }}>
          Add Menu Item
        </Button>
      </Paper>
    </Box>
  );
};

export default CreateMenuItem;
