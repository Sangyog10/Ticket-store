import mongoose from "mongoose";
import { Order } from "./order";
import { OrderStatus } from "@santicket/common";

interface TicketAtters {
  title: string;
  price: number;
}

export interface TicketDocs extends mongoose.Document {
  title: string;
  price: number;
  isReserved(): Promise<boolean>; //func to check if the ticket has already been reserved
}

interface TicketModel extends mongoose.Model<TicketDocs> {
  build(atters: TicketAtters): TicketDocs;
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

ticketSchema.statics.build = (atters: TicketAtters) => {
  return new Ticket(atters);
};

// Run query to look for all orders. find an order where ticket is the ticker
//we just found and the order status is "not cancelled".If we find the order, it means that ticket is already reserved
ticketSchema.methods.isReserved = async function () {
  const exitsingOrder = await Order.findOne({
    ticket: this,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete,
      ],
    },
  });
  return !!exitsingOrder;
};

const Ticket = mongoose.model<TicketDocs, TicketModel>("Ticket", ticketSchema);

export { Ticket };
