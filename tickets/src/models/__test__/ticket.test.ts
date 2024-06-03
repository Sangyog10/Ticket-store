import { Ticket } from "../ticket";

it('implement optimistic concurrency control',async()=>{
    //create an instance of ticket
    const ticket=Ticket.build({
        title:"football",
        price:20,
        userId:"123"
    })

    //save the ticket to db
    await ticket.save()

    //fetch the ticket twice
    const firstInstance=await Ticket.findById(ticket.id)
    const secondInstance=await Ticket.findById(ticket.id)

    //make two separate changes to the ticket we fetched
    firstInstance!.set({price:100})
    secondInstance!.set({price:200})

    //save the first fetched ticket
    await firstInstance!.save()

    //save the second fetched ticket and expect an error
    try {
        await secondInstance!.save()

    } catch (error) {
        return ;
    }
    throw new Error("should not reach here")
})

it("increments the version number on multiple saves",async()=>{
    const ticket=Ticket.build({
        title:"football",
        price:20,
        userId:"123"
    })
    await ticket.save();
    expect(ticket.version).toEqual(0)
    await ticket.save();
    expect(ticket.version).toEqual(1)
    await ticket.save();
    expect(ticket.version).toEqual(2)
})