import { Listener } from "../../../common/src/events/base-listener";
import nats, { Message, Stan } from "node-nats-streaming";
import { TicketCreatedEvent } from "../../../common/src/events/ticket-created-event";
import { Subjects } from "../../../common/src/events/subject";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = "payments-service";
  onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    console.log("Event-data", data);
    msg.ack();
  }
}
