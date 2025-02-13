import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Payment = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    const initiatePayment = async () => {
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        alert("Failed to load Razorpay script. Please try again.");
        return;
      }

      const response = await axios.post("http://localhost:3000/payments/pay", { orderId });
      const { paymentId, amount } = response.data;

      const options = {
        key: "rzp_test_w57Iuw7kSs3GEj",
        amount: amount,
        currency: "INR",
        order_id: paymentId,
        handler: async (response) => {
          alert("Payment Successful!");
          await axios.post("http://localhost:3000/payments/success", { 
            orderId,
            paymentId: response.razorpay_payment_id
        }, {
            headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
        });
        
          navigate("/orders");
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    };

    initiatePayment();
  }, [orderId, navigate]);

  return <div>Processing Payment...</div>;
};

export default Payment;
