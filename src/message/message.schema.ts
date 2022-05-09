import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { SchemaTypes } from "mongoose";

const phoneNumberValidator = {
    validator: function (val: string): boolean {
        return /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(val);
    },
    message: ({ value }) => `${value} is not a valid phone number`
};

@Schema()
export class Message extends Document {
    @Prop({
        type: SchemaTypes.String,
        validate: phoneNumberValidator,
    })
    from: string;

    @Prop({
        type: SchemaTypes.String,
        validate: phoneNumberValidator,
        required: [true, "recepient was not provided"],
    })
    to: string;

    @Prop({
        type: SchemaTypes.String,
        required: [true, "message body was not provided"],
    })
    text: string;

    @Prop({
        type: SchemaTypes.Date,
        default: new Date(),
        max: new Date(),
    })
    dateCreated: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
