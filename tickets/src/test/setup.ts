import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";
import jwt from "jsonwebtoken";
import { json } from "express";

declare global {
  var signin: () => string[];
}

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = "asdf";
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin = () => {
  //build aJWT payload. {id, email}
  const payload = {
    id: "abc",
    email: "test@test.com",
  };
  //create the jwt!!
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  //build a jwt session object {jwt:MY_JWT}
  const session = { jwt: token };
  //turn that session into JSON
  const sessionJSON = JSON.stringify(session);
  //take json and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");
  //return a string that's the cookie with encoded data(as in cookie of headers)
  return [`session=${base64}`];
};