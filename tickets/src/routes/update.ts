import express, { Request, Response } from "express";
import {
  notFoundError,
  requireAuth,
  validateRequest,
  UnauthorizedError,
  BadRequestError,
} from "@santicket/common";
import { body } from "express-validator";
import { Ticket } from "../models/ticket";
import { natsWrapper } from "../nats-wrapper";
import { TicketUpdatedPublisher } from "../events/publishers/ticket-update-publisher";

const router = express.Router();

router.put(
  "/api/tickets/:id",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Provide a valid title"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      throw new notFoundError();
    }

    if(ticket.orderId){
      throw new BadRequestError("Ticket cannot be updated right now, it is reserved")
    }

    if (ticket.userId !== req.currentUser!.id) {
      throw new UnauthorizedError();
    }
    ticket.set({
      title: req.body.title,
      price: req.body.price,
    });
    await ticket.save();

    //publishing the ticket created events after updating a ticket
    new TicketUpdatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      price: ticket.price,
      title: ticket.title,
      userId: ticket.userId,   
       version: ticket.version,

    });

    res.send(ticket);
  }
);

export { router as updateTicketRouter };
