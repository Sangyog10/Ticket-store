import { Message } from "node-nats-streaming";
import { Listener ,OrderCancelledEvent,Subjects} from "@santicket/common";
import { queueGroupName } from "./queue-group-name";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-update-publisher";


export class OrderCancelledListener extends Listener<OrderCancelledEvent>{
    subject: Subjects.OrderCancelled=Subjects.OrderCancelled;
    queueGroupName=queueGroupName;
    async onMessage(data:OrderCancelledEvent['data'],msg:Message){
        const ticket=await Ticket.findById(data.ticket.id);
        if(!ticket){
            throw new Error("Ticket not found")
        }
        //mark the ticket as being reserved by setting the orderId
        ticket.set({orderId:undefined});
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
