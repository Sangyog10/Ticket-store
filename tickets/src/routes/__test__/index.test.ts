import request from "supertest";
import { app } from "../../app";

// jest.mock("../../nats-wrapper"); //it is done in setup.ts

const createTicket = () => {
  return request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "ldfk",
      price: 20,
    })
    .expect(201);
};
it("can fetch the list of tickets", async () => {
  await createTicket();
  await createTicket();
  await createTicket();

  const response = await request(app).get("/api/tickets").send().expect(200);

  expect(response.body.length).toEqual(3);
});
