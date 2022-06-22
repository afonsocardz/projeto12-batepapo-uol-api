import {Message} from "../model/Message.js";
import dayjs from "dayjs";

function postMessage(req, res, db){
    const message = {...req.body, from: req.headers.user, time: dayjs().format("HH:mm:ss")};
    const {value, error } = Message.validate(message);
    const valid = error == null;
    if (!valid) {
        res.status(422).send(error.details);
    } else {
        db.collection("messages").insertOne(value);
        res.sendStatus(201);
    }
}

function getMessages (req, res, db) {
    
}