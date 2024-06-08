import { Subjects, Publisher,PaymentCreatedEvent } from "@santicket/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
    subject: Subjects.PaymentCreated=Subjects.PaymentCreated;   
}