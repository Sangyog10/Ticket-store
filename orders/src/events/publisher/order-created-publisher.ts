import { Publisher, OrderCreatedEvents, Subjects } from "@santicket/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvents> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
