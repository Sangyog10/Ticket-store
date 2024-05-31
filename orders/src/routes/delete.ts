import express, { Request, Response } from "express";
import {
  UnauthorizedError,
  notFoundError,
  requireAuth,
} from "@santicket/common";
import { Order } from "../models/order";
import { OrderStatus } from "@santicket/common";
import { OrderCancelledEvent } from "@santicket/common";
import { natsWrapper } from "../nats-wrapper";
import { OrderCancelledPublisher } from "../events/publisher/order-cancelled-publisher";

const router = express.Router();

router.delete(
  "/api/orders/:orderId",
  requireAuth,
  async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate("ticket");
    if (!order) {
      throw new notFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new UnauthorizedError();
    }
    order.status = OrderStatus.Cancelled;
    await order.save();

    //publish an event saying that it was cancelled
    new OrderCancelledPublisher(natsWrapper.client).publish({
      id: order.id,
      ticket: {
        id: order.ticket.id,
      },
    });

    res.status(204).send(order);
  }
);

export { router as deleteOrderRouter };
