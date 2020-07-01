import { MongoClient } from "./deps.ts";

const client = new MongoClient();
client.connectWithUri(
  "mongodb+srv://deno-server:3QVjF8RBJnOexoJW@denosurvey.6xj9w.mongodb.net/deno-survey?retryWrites=true&w=majority",
);

const db = client.database("deno-survey");

export const usersCollection = db.collection("users");
