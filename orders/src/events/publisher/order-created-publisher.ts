import { Publisher, OrderCreatedEvent, Subjects } from "@santicket/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
