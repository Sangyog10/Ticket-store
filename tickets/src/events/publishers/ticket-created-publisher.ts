import { Subjects, Publisher, TicketCreatedEvent } from "@santicket/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
