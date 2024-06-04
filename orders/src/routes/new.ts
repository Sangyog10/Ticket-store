import express, { Request, Response } from "express";
import mongoose from "mongoose";
import {
  BadRequestError,
  OrderStatus,
  notFoundError,
  requireAuth,
  validateRequest,
} from "@santicket/common";
import { body } from "express-validator";
import { Ticket } from "../models/ticket";
import { Order } from "../models/order";
import { OrderCreatedPublisher } from "../events/publisher/order-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

const EXPIRATION_WINDOWS_SECOND = 15; //IN SEC

router.post(
  "/api/orders",
  requireAuth,
  [
    body("ticketId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("TicketId must be provided"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { ticketId } = req.body;
    //find the ticket user is trying to purchase
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      throw new notFoundError();
    }

    //check if the result is already not reserved.
    const isReserved = await ticket.isReserved();
    if (isReserved) {
      throw new BadRequestError("Ticket already reserved");
    }

    //calculate the expireation order for this ticket
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOWS_SECOND);

    //build the ordr and save to database
    const order = Order.build({
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expiresAt: expiration,
      ticket: ticket,
    });
    await order.save();

    //publish an event saying that the order has been created
    new OrderCreatedPublisher(natsWrapper.client).publish({
      id: order.id,
      version:order.version,
      status: order.status,
      userId: order.userId,
      expiresAt: order.expiresAt.toISOString(),
      ticket: {
        id: ticket.id,
        price: ticket.price,
      },
    });
    res.status(200).send(order);
  }
);

export { router as newOrderRouter };
