import { Message } from "node-nats-streaming";
import { Listener ,OrderCreatedEvent,Subjects} from "@santicket/common";
import { queueGroupName } from "./queue-group-name";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-update-publisher";


export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
    subject: Subjects.OrderCreated=Subjects.OrderCreated;
    queueGroupName=queueGroupName;
    async onMessage(data:OrderCreatedEvent['data'],msg:Message){
        const ticket=await Ticket.findById(data.ticket.id);
        if(!ticket){
            throw new Error("Ticket not found")
        }
        //mark the ticket as being reserved by setting the orderId
        ticket.set({orderId:data.id});
        await ticket.save();

        await new TicketUpdatedPublisher(this.client).publish({
            id:ticket.id,
            price:ticket.price,
            title:ticket.title,
            userId:ticket.userId,
            version:ticket.version,
            orderId:ticket.orderId
        })

        msg.ack();
    }
}
