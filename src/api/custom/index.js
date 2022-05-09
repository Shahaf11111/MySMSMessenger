import axios from "axios";
import { SMSMessage } from "../SMSMessage";

export default class MyClient {

    constructor() {
        this.client = axios.create({
            baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    async sendMessage(author, recepient, text) {
        let message = new SMSMessage(author, recepient, text);
        const { error, data } = await this.client
            .post("/message", message.dto(true))
            .then((res) => res.data)
            .then((res) => res.status === 200 ? { data: res.data } : { error: `Failed to send message - ${res.error}` })
            .catch((e) => ({ error: e.response.data.message }));
        if (error) {
            throw new Error(error);
        }
        const { from, to, body, date_created } = data;
        message = new SMSMessage(from, to, body, date_created);
        return { ...message, dateCreated: message.dateCreated.toUTCString() };
    }

    async listMessages(author, recepient) {
        const { error, data } = await this.client
            .get("/messages", { params: { author, recepient } })
            .then((res) => res.status === 200 ? { data: res.data } : { error: "Failed to send message" })
            .catch((e) => ({ error: e.response.data.message }));
        if (error) {
            throw new Error(error);
        }
        return data;
    }

}