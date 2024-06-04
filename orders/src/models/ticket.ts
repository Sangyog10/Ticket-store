import mongoose from "mongoose";
import { Order } from "./order";
import { OrderStatus } from "@santicket/common";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface TicketAtters {
  id: string;
  title: string;
  price: number;
}

export interface TicketDocs extends mongoose.Document {
  title: string;
  price: number;
  version: number;
  isReserved(): Promise<boolean>; //func to check if the ticket has already been reserved
}

interface TicketModel extends mongoose.Model<TicketDocs> {
  build(atters: TicketAtters): TicketDocs;
  findByEvent(event: {
    id: string;
    version: number;
  }): Promise<TicketDocs | null>;
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

ticketSchema.set("versionKey", "version");
ticketSchema.plugin(updateIfCurrentPlugin);

ticketSchema.statics.findByEvent = (event: { id: string; version: number }) => {
  return Ticket.findOne({ _id: event.id, version: event.version - 1 });
};
ticketSchema.statics.build = (atters: TicketAtters) => {
  return new Ticket({
    _id: atters.id,
    title: atters.title,
    price: atters.price,
  });
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
