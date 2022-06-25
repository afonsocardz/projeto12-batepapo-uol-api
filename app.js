import express, { json } from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import dotenv from "dotenv";

import { postParticipants, getParticipants, postStatus, removeIdle } from "./src/controllers/participants-controller.js";
import { postMessage, getMessages } from "./src/controllers/messages-controller.js";

dotenv.config();
const PORT = process.env.SERVER_PORT;
const MONGO_URI = process.env.MONGODB_URI;
const IDLE_REMOVE_TIME = process.env.IDLE_REMOVE_TIME;

const app = express();
app.use(json());
app.use(cors());

app.post("/participants", (req, res) => postParticipants(req, res, db));
app.get("/participants", (req, res) => getParticipants(req, res, db));

app.get("/messages", (req, res) => getMessages(req, res, db));
app.post("/messages", (req, res) => postMessage(req, res, db));

app.post("/status", (req, res) => postStatus(req, res, db));

setInterval(() => removeIdle(db), IDLE_REMOVE_TIME);

const client = new MongoClient("mongodb://" + MONGO_URI);
let db;

async function start() {
    await client.connect();
    db = client.db("batepapouol");
    app.listen(PORT);
}

start();



