import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { natsWrapper } from "../../nats-wrapper";

// jest.mock("../../nats-wrapper"); //it will mock the import to mocks

it("has a route handler listening to /api/tickets for  post request", async () => {
  const response = await request(app).post("/api/tickets").send({});
  expect(response.status).not.toEqual(404);
});

it("can only be accessed if the user is singed in", async () => {
  const response = await request(app).post("/api/tickets").send({}).expect(401);
});

it("returns a status other than 401 if the user is singed in", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({});
  expect(response.status).not.toEqual(401);
});

it("returns an error if invalid title is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "", price: 10 })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ price: 10 })
    .expect(400);
});

it("returns an error if invalid price is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "df", price: -10 })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "fsdf" })
    .expect(400);
});
it("creates a ticket if valid input", async () => {
  //check to make ticket was saved
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);
  //test
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "akdf",
      price: 20,
    })
    .expect(201);
  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
  expect(tickets[0].price).toEqual(20);
});

it("publish an event", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "akdf",
      price: 20,
    })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
