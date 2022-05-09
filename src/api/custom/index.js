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
        return { ...data, dateCreated: new Date(data.dateCreated).toUTCString() };
    }

    async listMessages(from, to) {
        const { error, data } = await this.client
            .get("/message", { params: { from, to } })
            .then((res) => res.data)
            .then((res) => res.status === 200 ? { data: res.data } : { error: "Failed to retrieve messages" })
            .catch((e) => ({ error: e.response.data.message }));
        if (error) {
            throw new Error(error);
        }
        return data;
    }

}