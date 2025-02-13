import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Switch, FormControlLabel } from "@mui/material";
import { toast } from "react-toastify"; // Importing react-toastify

const EditItemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [menuItem, setMenuItem] = useState({
    name: "",
    description: "",
    ingredients: "",
    nutritionalValues: {
      calories: 0,
      protein: 0,
      carbohydrates: 0,
      fats: 0,
      fiber: 0,
    },
    price: 0,
    imageUrl: "",
    allergyInfo: "",
    dietTags: "",
    availability: false, // Default to false
  });

  const [image, setImage] = useState(null); // State for image file
  const [imagePreview, setImagePreview] = useState(null); // For displaying image preview
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch existing item details
    fetch(`http://localhost:3000/menu/menuitem/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMenuItem(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching item:", error);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setMenuItem({ ...menuItem, [e.target.name]: e.target.value });
  };

  const handleNutritionalChange = (e) => {
    setMenuItem({
      ...menuItem,
      nutritionalValues: { ...menuItem.nutritionalValues, [e.target.name]: Number(e.target.value) },
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    if (file) reader.readAsDataURL(file);
  };

  const handleAvailabilityChange = (e) => {
    setMenuItem({
      ...menuItem,
      availability: e.target.checked, // Toggle availability
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate fields
    if (!menuItem.name || !menuItem.description || !menuItem.ingredients || menuItem.price <= 0) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    const formData = new FormData();
    formData.append("name", menuItem.name);
    formData.append("description", menuItem.description);
    formData.append("ingredients", menuItem.ingredients);
    formData.append("nutritionalValues", JSON.stringify(menuItem.nutritionalValues)); // Stringify nutritionalValues
    formData.append("price", menuItem.price);
    formData.append("allergyInfo", menuItem.allergyInfo);
    formData.append("dietTags", menuItem.dietTags);
    formData.append("availability", menuItem.availability); // Add availability to formData
    
    if (image) {
      formData.append("image", image); // Append image file
    }

    fetch(`http://localhost:3000/menu/menuUpdate/${id}`, {
      method: "PUT",
      body: formData, // No need to set Content-Type header; it will be set automatically
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Menu item updated successfully!");
        navigate("/view-menu"); // Redirect to menu page
      })
      .catch((error) => {
        console.error("Error updating item:", error);
        toast.error("Error updating item.");
      });
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ p: 3, maxWidth: "600px", margin: "auto" }}>
      <Typography variant="h4" gutterBottom>Edit Menu Item</Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={menuItem.name}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={menuItem.description}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Ingredients"
          name="ingredients"
          value={menuItem.ingredients}
          onChange={handleChange}
          margin="normal"
          required
        />

        {/* Nutritional Values */}
        <TextField
          fullWidth
          label="Calories"
          name="calories"
          value={menuItem.nutritionalValues.calories}
          onChange={handleNutritionalChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Protein"
          name="protein"
          value={menuItem.nutritionalValues.protein}
          onChange={handleNutritionalChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Carbs"
          name="carbohydrates"
          value={menuItem.nutritionalValues.carbohydrates}
          onChange={handleNutritionalChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Fats"
          name="fats"
          value={menuItem.nutritionalValues.fats}
          onChange={handleNutritionalChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Fiber"
          name="fiber"
          value={menuItem.nutritionalValues.fiber}
          onChange={handleNutritionalChange}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label="Price"
          name="price"
          value={menuItem.price}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Allergy Info"
          name="allergyInfo"
          value={menuItem.allergyInfo}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Diet Tags (comma separated)"
          name="dietTags"
          value={menuItem.dietTags}
          onChange={handleChange}
          margin="normal"
        />

        {/* Availability Toggle */}
        <FormControlLabel
          control={
            <Switch
              checked={menuItem.availability}
              onChange={handleAvailabilityChange}
              name="availability"
              color="primary"
            />
          }
          label="Available"
        />

        {/* Image Upload */}
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imagePreview && <img src={imagePreview} alt="Image Preview" style={{ width: 100, height: 100, marginTop: 10 }} />}

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Update Item
        </Button>
      </form>
    </Box>
  );
};

export default EditItemPage;
