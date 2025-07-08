import React from "react";
import axios from "axios";

const RazorpayPayment = ({ userId }) => {
  const handlePayment = async () => {
    try {
      const amount = 500; 

      const { data } = await axios.post("http://localhost:5000/api/payment/create-order", {
        amount,
      });

      const options = {
        key: "rzp_test_Dwfo5bkWlNeLKk", 
        amount: data.amount,
        currency: data.currency,
        name: "My App",
        description: "Test Payment",
        order_id: data.orderId,
        handler: async function (response) {
          
          const verifyRes = await axios.post("http://localhost:5000/api/payment/verify-payment", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            userId, 
          });

          if (verifyRes.data.success) {
            alert("Payment Successful!");
          } else {
            alert("Payment Failed: Signature mismatch");
          }
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error(err);
      alert("Payment initiation failed.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2 style={{ color: 'golden' }}>Pay ₹500 using Razorpay</h2>
      <button
        onClick={handlePayment}
        style={{
        
          fontSize: "14px",
          backgroundColor: "purple",
          color: "white",
          border: "black",
          borderRadius: "4px",
          cursor: "pointer",
          width: "80px",
          height: "35px"
        }}
      >
        Pay Now
      </button>
    </div>
  );
};

export default RazorpayPayment;

