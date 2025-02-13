import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Function to fetch cart items from API
    const fetchCart = async () => {
        const token = sessionStorage.getItem("token");
        if (!token) return;

        try {
            const response = await axios.get("http://localhost:3000/cart/", {
                headers: { Authorization: `Bearer ${token}` },
            });

            const formattedCart = response.data.map(item => ({
                _id: item._id, // Store cart item ID
                productId: item.productId,
                quantity: item.quantity || 1
            }));
            
            console.log("Cart API Response:", response.data);
            setCart(formattedCart);
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    // Function to add an item to the cart
    const addToCart = async (productId, quantity = 1) => {
        const token = sessionStorage.getItem("token");
        if (!token) return;

        try {
            await axios.post(
                "http://localhost:3000/cart/add",
                { productId, quantity },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            await fetchCart(); // Ensure cart is updated correctly
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    // Function to remove an item from the cart
    const removeFromCart = async (productId) => {
        const token = sessionStorage.getItem("token");
        if (!token) return;

        // Find the correct cart item ID
        const cartItem = cart.find(item => item.productId === productId);
        if (!cartItem || !cartItem._id) {
            console.error("Cart item ID not found!");
            return;
        }

        try {
            await axios.delete(`http://localhost:3000/cart/remove/${cartItem._id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setCart((prevCart) => prevCart.filter((item) => item._id !== cartItem._id));
        } catch (error) {
            console.error("Error removing from cart:", error);
        }
    };

    const clearCart = () => {
        setCart([]);  // Reset cart state
        localStorage.removeItem("cart");
        sessionStorage.removeItem("cart");
      };
      

    // Fetch cart on mount
    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <CartContext.Provider value={{ cart, fetchCart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook for using the cart context
export const useCart = () => useContext(CartContext);
