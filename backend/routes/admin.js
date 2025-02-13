const express = require("express");
const Order = require("../model/Order");
const router = express.Router();

// Admin updates order status
router.put("/update-order/:orderId", async (req, res) => {
    const { status, riderPhone } = req.body;

    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.orderId, 
            { status, riderPhone }, 
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json({ message: "Order updated successfully", order: updatedOrder });
    } catch (error) {
        res.status(500).json({ message: "Error updating order", error });
    }
});

// router.get("/all", async (req, res) => {
//     console.log("inside admin get all")
//     try {
//         const orders = await Order.find().populate("items.productId");
//         res.json(orders);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching orders", error });
//     }
// });
router.get("/all", async (req, res) => {
    console.log("inside admin get all");
    try {
        const orders = await Order.find()
            .populate("items.productId", "name") // Populate only the name field
            .exec();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
});


module.exports = router;
