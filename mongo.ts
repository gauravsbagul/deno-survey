import { MongoClient } from "./deps.ts";

const client = new MongoClient();
client.connectWithUri(Deno.env.get("MONGODB_URI")!);

const db = client.database("deno-survey");

export const usersCollection = db.collection("users");
export const surveyCollection = db.collection("surveys");
export const questionCollection = db.collection("questions");
