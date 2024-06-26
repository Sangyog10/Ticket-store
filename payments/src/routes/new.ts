import express, { Request, Response } from "express";
import { body } from "express-validator";
import { stripe } from "../stripe";
import {
  requireAuth,
  validateRequest,
  BadRequestError,
  notFoundError,
  UnauthorizedError,
  OrderStatus,
} from "@santicket/common";
import { Order } from "../models/order";
import { Payment } from "../models/payment";
import { natsWrapper } from "../nats-wrapper";
import { PaymentCreatedPublisher } from "../events/publisher/payment-created-publisher";

const router = express.Router();

router.post(
  "/api/payments",
  requireAuth,validateRequest,
  [body("token").not().isEmpty(), body("orderId").not().isEmpty()],
  async (req: Request, res: Response) => {
    const {token,orderId}=req.body;
    
    const order=await Order.findById(orderId);
    if(!order){
        throw new notFoundError()
    }

    if(order.userId!==req.currentUser!.id){
        throw new UnauthorizedError();
    }

    if(order.status===OrderStatus.Cancelled){
        throw new BadRequestError("Order already cancelled");
    }
    const charge=await stripe.charges.create({
      currency:'usd',
      amount:order.price*100,
      source:token
    });

    const payment=Payment.build({
      orderId,
      stripeId:charge.id
    });

    await payment.save();

    new PaymentCreatedPublisher(natsWrapper.client).publish({
      id:payment.id,
      orderId:payment.orderId,
      stripeId:payment.stripeId
    })

    res.status(201).send({id:payment.id})
  }
);


export {router as createChargeRouter}