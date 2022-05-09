export class SMSMessage {

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

    dto(asJson) {
        if (asJson) {
            return { from: this.from, to: this.to, text: this.text };
        }
        return `Body=${this.text}&To=${this.to}&From=${this.from}`;
    }

    setCreationDate(dateString) {
        this.dateCreated = new Date(dateString);
    }
}
