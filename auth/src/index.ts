import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT key must be defined");
  }
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth"); //from monogdb deployment
    // console.log("Connected to the db");
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("Port running at 3000");
  });
};

start();
