import axios from "axios";
import { SMSMessage } from "../SMSMessage";
export default class TwilioClient {

    constructor(accountId) {
        this.accountId = accountId || process.env.REACT_APP_TWILIO_ACCOUNT_ID;
        this.client = axios.create({
            baseURL: `${process.env.REACT_APP_TWILIO_URL}/${process.env.REACT_APP_TWILIO_API_VERSION}`,
            headers: {
                Authorization: process.env.REACT_APP_TWILIO_AUTH_TOKEN,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            withCredentials: false,
        });
    }

    async sendMessage(author, recepient, text) {
        let message = new SMSMessage(author, recepient, text);
        const { error, data } = await this.client
            .post(`/Accounts/${this.accountId}/Messages.json`, message.dto())
            .then((res) => res.statusText === "Created" ? { data: res.data } : { error: "Failed to send message" })
            .catch((e) => ({ error: e.response.data.message }));
        if (error) {
            throw new Error(error);
        }
        const { from, to, body, date_created } = data;
        message = new SMSMessage(from, to, body, date_created);
        return { ...message, dateCreated: message.dateCreated.toUTCString() };
    }

}
