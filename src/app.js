import express, {json} from "express";
import { MongoClient } from "mongodb";
import cors from "cors";


const port = process.env.SERVER_PORT;
const mongoURI = process.env.MONGO_URI;
const app = express();
app.use(json());
app.use(cors());

const client = new MongoClient(mongoURI);

app.get("/participants", getParticipants);
app.post("/particiants", postParticipants);
app.get("/messages", getMessages);
app.post("/messages", postMessages);
app.post("/status", postStatus);

app.listen(port)

