import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/admin/all");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId) => {
    const riderPhone = prompt("Enter Rider Contact Number:");
    if (!riderPhone) return alert("Rider phone is required!");

    try {
      await axios.put(`http://localhost:3000/admin/update-order/${orderId}`, {
        status: "out for delivery",
        riderPhone,
      });

      alert("Order updated!");
      setOrders(orders.map((order) =>
        order._id === orderId ? { ...order, status: "out for delivery", riderPhone } : order
      ));
      
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Admin Orders
      </Typography>
      <Grid container spacing={3}>
        {orders.map((order) => (
          <Grid item xs={12} sm={6} md={4} key={order._id}>
            <Card sx={{ boxShadow: 3, borderRadius: 2, padding: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Order ID: {order._id}
                </Typography>
                <Typography variant="body1">
                  <strong>Address:</strong> {order.address}
                </Typography>
                <Typography variant="body1">
                  <strong>Total Amount:</strong> ₹{order.totalAmount}
                </Typography>
                <Typography variant="body1">
                  <strong>Payment Status:</strong> {order.paymentStatus}
                </Typography>
                <Typography variant="body1">
                  <strong>Order Status:</strong> {order.status}
                </Typography>

                {/* Display menu items with quantity */}
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                  <strong>Items Ordered:</strong>
                </Typography>
                {order.items.map((item, index) => (
                  <Typography key={index} variant="body2">
                    {item.productId?.name} - {item.quantity}
                  </Typography>
                ))}

                {order.status === "preparing" && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => updateOrderStatus(order._id)}
                    sx={{ marginTop: 2 }}
                  >
                    Mark as Out for Delivery
                  </Button>
                )}

                {order.status === "out for delivery" && (
                  <Typography variant="body1" sx={{ marginTop: 2 }}>
                    <strong>Rider:</strong> {order.riderPhone}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AdminOrders;
