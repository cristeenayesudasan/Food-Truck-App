const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./db/connection');

const userRoutes = require('./routes/userRoutes');
const menuRoutes = require("./routes/menuRoutes");
const customerMenuRoutes = require("./routes/customerMenuRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes")
const admin = require("./routes/admin")
const locationRoutes = require("./routes/locationRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/users',userRoutes);
app.use("/menu", menuRoutes);
app.use('/customermenu',customerMenuRoutes);
app.use('/cart',cartRoutes);
app.use("/orders", orderRoutes);
app.use("/payments",paymentRoutes);
app.use("/admin",admin);
app.use("/location", locationRoutes);



// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));