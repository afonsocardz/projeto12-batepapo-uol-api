import express, {json} from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import dotenv from "dotenv";

import {postParticipants, getParticipants, postStatus} from "./controllers/participants-controller.js";
import {postMessage, getMessages} from "./controllers/messages-controller.js";

dotenv.config();
const port = process.env.SERVER_PORT;
const mongoURI = process.env.MONGO_URI;

const app = express();
app.use(json());
app.use(cors());

app.post("/participants", (req, res) => postParticipants(req,res,db));
app.get("/participants", (req, res) => getParticipants(req,res,db));

app.get("/messages", (req, res) => getMessages(req, res, db));
app.post("/messages", (req, res) => postMessage(req, res, db));

app.post("/status", (req, res) => postStatus(req, res, db));

const client = new MongoClient("mongodb://127.0.0.1:27017/");
let db;

client.connect().then(() => {
	db = client.db("batepapouol");
});

app.listen(5000)

