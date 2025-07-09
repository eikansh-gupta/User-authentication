console.log('paymentRoutes.js loaded');

const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require('../models/payment');
const verifyToken = require('../middleware/verifyToken');
require('dotenv').config();

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post('/create-order', verifyToken, async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100, 
    currency: 'INR',
    receipt: `receipt_order_${Date.now()}`
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json({ orderId: order.id, amount: order.amount, currency: order.currency });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/verify-payment', verifyToken, async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    userId
  } = req.body;
  
  const userIdFromToken = req.user.userId;
  const emailFromToken = req.user.email;
  console.log("From token:", userIdFromToken);
  console.log("From body:", userId);


   if (String(userId) !== String(userIdFromToken)) {
    return res.status(403).json({ success: false, message: 'Unauthorized user' });
  }

  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(sign.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    const payment = new Payment({
      userId,
      email: emailFromToken,
      razorpay_order_id,
      razorpay_payment_id,
      amount: 500, 
      status: "Success"
    });

    await payment.save();
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, message: "Signature verification failed" });
  }
});
console.log('Exporting router'); 

module.exports = router;
