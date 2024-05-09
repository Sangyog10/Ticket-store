import express from "express";
import { json } from "body-parser";
import "express-async-errors";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

import { errorHandler } from "./middlewares/error-handler";
import { notFoundError } from "./errors/not-found-error";

const app = express();
app.set("trust proxy", true);

app.use(json());
app.use(
  cookieSession({ signed: false, secure: process.env.NODE_ENV !== "test" })
); //not singning coz we will send jwt via cookie , setting the secure to false for testing and true for development

app.get("/api/users/test", (req, res) => {
  res.send("testing");
});

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", (req, res, next) => {
  throw new notFoundError();
});
app.use(errorHandler);

export { app };
