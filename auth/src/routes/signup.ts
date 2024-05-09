import express, { Request, Response } from "express";
import { body } from "express-validator";
import { User } from "../models/user";
import { BadRequestError } from "@santicket/common";
import Jwt from "jsonwebtoken";
import { validateRequest } from "@santicket/common";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      throw new BadRequestError("User with this email already exists");
    }

    const user = User.build({ email, password });
    await user.save();

    const userJwt = Jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY!
    ); //generate jwt
    // req.session.jwt = userJwt; //cannot do this in ts
    //storing jwt in session, returns this session in cookie
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
