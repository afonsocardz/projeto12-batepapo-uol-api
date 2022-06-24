import { Participant } from "../model/Participant.js";
import dayjs from "dayjs";

async function postParticipants(req, res, db) {
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
        return;
    }

    const isUnvaiable = await db.collection("participants").findOne({name: req.body.name});
    
    if(!isUnvaiable){
        db.collection("participants").insertOne(value);
        db.collection("messages").insertOne(loginMessage);
        res.sendStatus(201);
    } else {
        res.sendStatus(409)
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

async function removeIdle(db) {
    try {
        const participants = await db.collection("participants").find().toArray();
        participants.map(async participant => {
            if (Date.now() - participant.lastStatus > 10000) {
                const message = {
                    from: participant.name,
                    to: 'Todos',
                    text: 'sai da sala...',
                    type: 'status',
                    time: dayjs().format("HH:mm:ss")
                }
                await db.collection("participants").deleteOne({ name: participant.name });
                await db.collection("messages").insertOne(message);
            }
        });
    } catch (err) {
        console.log(err);
    }
}

async function getParticipants(req, res, db) {
    const participants = await db.collection("participants").find().toArray();
    res.status(200).send(participants);
}

export { postParticipants, getParticipants, postStatus, removeIdle };