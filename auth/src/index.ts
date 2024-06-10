import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  console.log("starting");

  if (!process.env.JWT_KEY) {
    throw new Error("JWT key must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }
  try {
    await mongoose.connect(process.env.MONGO_URI); //from monogdb deployment
    console.log("Connected to the AUTH DB");
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log(" Auth Port running at 3000");
  });
};

start();
