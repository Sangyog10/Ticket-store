import { Subjects,Publisher,ExpirationCompleteEvent } from "@santicket/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
    subject: Subjects.ExpirationComplete=Subjects.ExpirationComplete;
    
}