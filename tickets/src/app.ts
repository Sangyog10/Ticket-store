import express from "express";
import { json } from "body-parser";
import "express-async-errors";
import cookieSession from "cookie-session";

import { errorHandler } from "@santicket/common";
import { notFoundError } from "@santicket/common";

const app = express();
app.set("trust proxy", true);

app.use(json());
app.use(
  cookieSession({ signed: false, secure: process.env.NODE_ENV !== "test" })
); //not singning coz we will send jwt via cookie , setting the secure to false for testing and true for development

app.get("/api/users/test", (req, res) => {
  res.send("testing");
});

app.all("*", (req, res, next) => {
  throw new notFoundError();
});
app.use(errorHandler);

export { app };
