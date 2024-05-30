import express, { Request, Response } from "express";
import {
  UnauthorizedError,
  notFoundError,
  requireAuth,
} from "@santicket/common";
import { Order } from "../models/order";

const router = express.Router();

router.get(
  "/api/orders/:orderId",
  requireAuth,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId).populate("ticket");
    if (!order) {
      throw new notFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new UnauthorizedError();
    }
    res.send(order);
  }
);

export { router as showOrderRouter };
