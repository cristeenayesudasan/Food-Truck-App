import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Grid, Card, CardMedia, CardContent, Chip, Typography, Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; 
import { GoogleMap, LoadScript, Marker, InfoWindow  } from "@react-google-maps/api";


const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const Menu = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
 
  const { cart, addToCart, removeFromCart } = useCart();
  const [location, setLocation] = useState(null);

  const navigate = useNavigate();

  // Fetch menu items
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get("http://localhost:3000/customermenu/menuitems");
        setMenuItems(response.data);
      } catch (err) {
        setError("Error fetching menu items");
      } finally {
        setLoading(false);
      }
    };


    const fetchLocation = async () => {
      try {
        const response = await axios.get("http://localhost:3000/location/current");
        console.log("Fetched location:", response.data);
        if (response.data) setLocation(response.data);
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };

    fetchMenuItems();
    fetchLocation(); 

  }, []);

  const handleReadMoreClick = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const handleAddToCart = async (dishId) => {
    const isAuthenticated = sessionStorage.getItem("token"); // Check if token exists
    
    if (!isAuthenticated) {
      toast.warning("Please log in to add items to the cart!", { position: "top-right", autoClose: 1000 });
      navigate("/login", { state: { from: "/" } }); // Redirect to login page
      return;
    }
  
    try {
      await addToCart(dishId);
      toast.success("Item added to cart!", { position: "top-right", autoClose: 1000 });
    } catch (error) {
      toast.error("Error adding to cart!", { position: "top-right", autoClose: 1000 });
    }
  };
  

  const handleIncrement = async (dishId) => {
    await addToCart(dishId);
  };

  const handleDecrement = async (dishId) => {
    await removeFromCart(dishId);
  };

  if (loading) return <Typography variant="h6" align="center">Loading...</Typography>;
  if (error) return <Typography variant="h6" align="center">{error}</Typography>;

  return (
    <Box sx={{
      backgroundImage: `url(https://www.brothersfireandsecurity.com/hubfs/AdobeStock_656242207.jpeg)`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      color: "white",
      backgroundAttachment: "fixed",
    }}>
      
      <Box sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        zIndex: 1,
      }} />

      <Box sx={{ position: "relative", zIndex: 2 }}>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          height: "70vh",
          color: "white",
        }}>
          <Typography variant="h2" gutterBottom sx={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}>
            Fresh, Healthy Meals Delivered to You
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ fontFamily: "Poppins, sans-serif", fontWeight: 500 }}>
            Find our food truck, pre-order your meals, and stay fit with delicious, nutritious food.
          </Typography>
        </Box>

        <Box sx={{ padding: 4 }}>
          <Typography variant="h3" align="center" gutterBottom sx={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}>
            Our Menu
          </Typography>
          <Typography variant="h6" align="center" gutterBottom sx={{ fontFamily: "Poppins, sans-serif", fontWeight: 500 }}>
            Explore our delicious and healthy options
          </Typography>

          <Grid container spacing={4} sx={{ mt: 4 }}>
            {menuItems.map((dish, index) => {
              const cartItem = cart.find(item => item.productId === dish._id);
              return (
                <Grid item xs={12} sm={6} md={4} key={dish._id}>
                  <Card sx={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
                    <CardMedia component="img" height="200" image={dish.imageUrl} alt={dish.name} />
                    <CardContent>
                      <Typography variant="h6" gutterBottom sx={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
                        {dish.name}
                      </Typography>
                      <Typography variant="h6" color="primary" sx={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}>
                        ₹{dish.price}
                      </Typography>
                      <Typography variant="body2" gutterBottom sx={{ fontFamily: "Poppins, sans-serif", fontWeight: 400 }}>
                        {dish.description}
                      </Typography>
                      {expandedCard === index && (
                        <>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>Ingredients:</Typography>
                          <Typography variant="body2">{dish.ingredients.join(", ")}</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600, mt: 1 }}>Nutritional Values:</Typography>
                          <Typography variant="body2">Calories: {dish.nutritionalValues.calories} kcal</Typography>
                          <Typography variant="body2">Protein: {dish.nutritionalValues.protein} g</Typography>
                          <Typography variant="body2">Carbs: {dish.nutritionalValues.carbohydrates} g</Typography>
                          <Typography variant="body2">Fats: {dish.nutritionalValues.fats} g</Typography>
                          <Typography variant="body2">Fiber: {dish.nutritionalValues.fiber} g</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600, mt: 1 }}>Diet Tags:</Typography>
                          {dish.dietTags.map((tag, tagIndex) => (
                            <Chip key={tagIndex} label={tag} sx={{ mr: 0.5, mb: 0.5 }} />
                          ))}
                          <Typography variant="body2" sx={{ fontWeight: 600, mt: 1 }}>Allergy Info:</Typography>
                          <Typography variant="body2">{dish.allergyInfo}</Typography>
                        </>
                      )}
                      <Button onClick={() => handleReadMoreClick(index)} variant="contained" color="primary" sx={{ mt: 2, borderRadius: 2 }}>
                        {expandedCard === index ? "Show Less" : "Read More"}
                      </Button>
              
                      {cartItem ? (
                        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                          <Button variant="contained" color="error" onClick={() => handleDecrement(dish._id)} sx={{ borderRadius: 2 }}>−</Button>
                          <Typography sx={{ mx: 2 }}>{cartItem.quantity}</Typography>
                          <Button variant="contained" color="primary" onClick={() => handleIncrement(dish._id)} sx={{ borderRadius: 2 }}>+</Button>
                        </Box>
                      ) : (
                        <Button 
                          variant="contained" 
                          color="secondary" 
                          sx={{ mt: 2, ml: 2, borderRadius: 2 }} 
                          onClick={() => handleAddToCart(dish._id)}
                        >
                          Add
                        </Button>    
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              );
              
            })}
          </Grid>
          <ToastContainer />
        </Box>
      </Box>
      <div>
  <h2>📍 Food Truck Location</h2>
  <LoadScript googleMapsApiKey="AIzaSyCaA_Ldw-VyRb3ePRJIbVImw0JC63LQ6x4">
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={location?.lat && location?.lng ? location : { lat: 9.9312, lng: 76.2673 }}
      zoom={15}
    >
      {location?.lat && location?.lng && (
        <>
          <Marker position={{ lat: location.lat, lng: location.lng }} />
          <InfoWindow position={{ lat: location.lat, lng: location.lng }}>
            <div style={{ fontWeight: "bold" }}>📍 Food Truck Location</div>
          </InfoWindow>
        </>
      )}
    </GoogleMap>
  </LoadScript>
</div>

    </Box>
    
  );
};

export default Menu;
