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

function getParticipants(req, res, db) {
    db.collection("participants").find().toArray().then(participants => {
        res.send(participants);
    });
}

export { postParticipants, getParticipants };