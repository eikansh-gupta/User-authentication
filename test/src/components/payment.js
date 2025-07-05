import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [timeLeft, setTimeLeft] = useState(600); 
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          alert("Payment time expired. Restarting...");
          navigate("/payment");
          return 600;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h2>Scan & Pay (within 10 minutes)</h2>
      <p style={{ fontSize: "18px", marginBottom: "10px" }}>
        Time left: <strong>{formatTime(timeLeft)}</strong>
      </p>

      <div style={{ display: "flex", justifyContent: "center", gap: "40px" }}>
        <div>
          <img src="/images/qr-code.png" alt="QR Code" width={200} />
          <p>Scan with PhonePe / Paytm</p>
        </div>

        <div>
          <img src="/images/gpay.png" alt="Google Pay" width={200} />
          <p>Scan with Google Pay</p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
