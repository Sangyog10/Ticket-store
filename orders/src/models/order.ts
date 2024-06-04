import mongoose from "mongoose";
import { OrderStatus } from "@santicket/common";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { TicketDocs } from "./ticket";

interface OrderAtters {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: TicketDocs;
}

interface OrderDoc extends mongoose.Document {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: TicketDocs;
  version:number;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(atters: OrderAtters): OrderDoc;
}

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      requried: true,
      enum: Object.values(OrderStatus),
      default: OrderStatus.Created,
    },
    expiresAt: {
      type: mongoose.Schema.Types.Date,
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
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

orderSchema.set('versionKey','version');
orderSchema.plugin(updateIfCurrentPlugin)

orderSchema.statics.build = (atters: OrderAtters) => {
  return new Order(atters);
};

const Order = mongoose.model<OrderDoc, OrderModel>("Order", orderSchema);

export { Order };
