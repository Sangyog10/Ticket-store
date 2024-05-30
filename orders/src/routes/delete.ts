import express, { Request, Response } from "express";
import {
  UnauthorizedError,
  notFoundError,
  requireAuth,
} from "@santicket/common";
import { Order } from "../models/order";
import { OrderStatus } from "@santicket/common";

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

    res.status(204).send(order);
  }
);

export { router as deleteOrderRouter };
