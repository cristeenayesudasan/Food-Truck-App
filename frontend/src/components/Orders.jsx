import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // Retrieve userId from sessionStorage
  const user = JSON.parse(sessionStorage.getItem("user"));
  const userId = user ? user.id : null;

  useEffect(() => {
    if (!userId) {
      console.error("User ID not found in session storage");
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `https://food-truck-app-backend.onrender.com/orders/user-orders/${userId}`
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(https://img.freepik.com/premium-photo/healthy-food-truck-serving-nutritious-meals-made-with-fresh-local-ingredients-offering-convenient_328432-17857.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 5,
      }}
    >
      <Typography variant="h4" sx={{ color: "white", fontWeight: "bold", mb: 3 }}>
        Your Orders
      </Typography>

      {orders.length > 0 ? (
        <Grid container spacing={3} justifyContent="center">
          {orders.map((order) => (
            <Grid item xs={12} sm={6} md={4} key={order._id}>
              <Card sx={{ maxWidth: 350, backgroundColor: "rgba(255, 255, 255, 0.9)", p: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Order ID: {order._id}
                  </Typography>
                  <Typography>Total Amount: ₹{order.totalAmount}</Typography>
                  <Typography>Payment Status: {order.paymentStatus}</Typography>
                  <Typography>Order Status: {order.status}</Typography>

                  {order.status === "out for delivery" ? (
                    <Typography color="green" fontWeight="bold">
                      Rider Contact: {order.riderPhone}
                    </Typography>
                  ) : (
                    <Typography color="orange" fontWeight="bold">
                      Preparing...
                    </Typography>
                  )}

                  <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 2 }}>
                    Items:
                  </Typography>
                  <ul>
                    {order.items.map((item) => (
                      <li key={item.productId._id}>
                        {item.productId.name} - {item.quantity} x ₹{item.price}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" sx={{ color: "white", mt: 3 }}>
          No orders found.
        </Typography>
      )}
    </Box>
  );
};

export default Orders;
