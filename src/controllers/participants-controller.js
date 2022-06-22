import { Participant } from "../model/Participant.js";

function getParticipants(req, res, db) {
    const participant = {
        name: req.body.name,
        lastStatus: Date.now()
    }
    const { value, error } = Participant.validate(participant);
    const valid = error == null;
    if (!valid) {
        res.status(422).send(error.details);
    } else {
        db.collection("participants").insertOne(value);
        res.sendStatus(201);
    }
};

export { getParticipants };