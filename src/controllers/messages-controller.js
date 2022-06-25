import {Message} from "../model/Message.js";
import dayjs from "dayjs";

function postMessage(req, res, db){
    const message = {
        ...req.body, 
        from: req.headers.user, 
        time: dayjs().format("HH:mm:ss")
    };

    const {value, error } = Message.validate(message);
    const valid = error == null;
    
    if (!valid) {
        res.status(422).send(error.details);
    } else {
        db.collection("messages").insertOne(value);
        res.sendStatus(201);
    }
}

async function getMessages (req, res, db) {
    let limit = 0;
    if (req.query.limit){
        limit = parseInt(req.query.limit);
    }
    const messages = await db.collection("messages").find().limit(limit).sort({$natural:-1}).toArray();
    const filteredMgs = await messages.filter(message => message.to === "Todos" || message.to === req.headers.user || message.from === req.headers.user);
    res.send(filteredMgs.reverse());
}

export {postMessage, getMessages};