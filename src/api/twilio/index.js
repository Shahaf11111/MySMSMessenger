import axios from "axios";

class SMSMessage {

    constructor(from, to, text, date_created) {
        this.from = from;
        this.to = to;
        this.text = text;
        this.dateCreated = date_created ? new Date(date_created) : new Date();
        this.validate();
    }

    isValidPhoneNumber(phoneNumber) {
        return phoneNumber && phoneNumber.match(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im);
    }

    validate() {
        if (!this.isValidPhoneNumber(this.from)) {
            throw new Error("The 'from' phone number is not a valid phone number");
        }
        if (!this.isValidPhoneNumber(this.to)) {
            throw new Error("The 'to' phone number is not a valid phone number");
        }
        if (!this.text) {
            throw new Error("Missing message text");
        }
    }

    dto() {
        return `Body=${this.text}&To=${this.to}&From=${this.from}`;
    }

    setCreationDate(dateString) {
        this.dateCreated = new Date(dateString);
    }
}

class TwilioClient {

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

const twilioClient = new TwilioClient();
export default twilioClient;