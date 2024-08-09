import orderModel from "../models/orderModel.js";
import Stripe from "stripe";
import fs from "fs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:3000";
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
    });
    await newOrder.save();

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Amount should be in the smallest currency unit
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { Payment: "true" });
      res.json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "ERROR" });
  }
};

//user oreder for frontend

const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "ERROR" });
  }
};

// cancel order
const cancelOrder = async (req, res) => {
  try {
    const appointment = await orderModel.findById(req.body.id);

    if (!appointment) {
      return res.json({ success: false, message: "Order not found" });
    }

    if (appointment.image) {
      fs.unlink(`uploads/${appointment.image}`, (err) => {
        if (err) {
          console.log("Error deleting image:", err);
          return res.json({
            success: false,
            message: "Failed to delete image",
          });
        }
      });
    }

    await orderModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Order Canceled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { placeOrder, verifyOrder, userOrders, cancelOrder };
