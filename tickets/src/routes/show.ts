import express, { Request, Response } from "express";
import { notFoundError, requireAuth, validateRequest } from "@santicket/common";
import { body } from "express-validator";
import { Ticket } from "../models/ticket";

const router = express.Router();
router.get("/api/tickets/:id", async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    throw new notFoundError();
  }
  res.send(ticket);
});

export { router as showTicketRouter };
