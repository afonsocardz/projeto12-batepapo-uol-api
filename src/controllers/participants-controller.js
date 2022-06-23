import { Participant } from "../model/Participant.js";
import dayjs from "dayjs";

function postParticipants(req, res, db) {
    const participant = {
        name: req.body.name,
        lastStatus: Date.now()
    }
    const loginMessage = {
        from: participant.name,
        to: 'Todos',
        text: 'entra na sala...',
        type: 'status',
        time: dayjs().format("HH:mm:ss")
    }
    const { value, error } = Participant.validate(participant);
    const valid = error == null;
    if (!valid) {
        res.status(422).send(error.details);
    } else {
        db.collection("participants").insertOne(value);
        db.collection("messages").insertOne(loginMessage);
        res.sendStatus(201);
    }
};

async function postStatus(req, res, db) {
    const { user } = req.headers;
    try {
        await db.collection("participants").find({ name: user });
        await db.collection("participants").updateOne({ name: user },
            { $set: { lastStatus: Date.now() } });
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(404);
    }
}

async function getParticipants(req, res, db) {
    const participants = await db.collection("participants").find().toArray();
    res.status(200).send(participants);
}

export { postParticipants, getParticipants, postStatus };