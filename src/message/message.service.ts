import axios from "axios";
import { Injectable, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { InjectTwilio, TwilioClient } from "nestjs-twilio";
import { CreateMessageDto, DeleteMessageDto, SearchMessageDto } from "./message.dto";
import { Message } from "./message.schema";

@Injectable()
export class MessageService {

    public constructor(
        @InjectModel(Message.name) private model: Model<Message>,
        @InjectTwilio() private readonly client: TwilioClient) { }

    async create(payload: CreateMessageDto): Promise<Message> {
        const message = new this.model(payload);
        await message.validate();
        await this.client.messages.create({
            body: message.text,
            from: message.from || process.env.TWILIO_PHONE_NUMBER,
            to: message.to,
        }).catch((e) => {
            throw new Error(`Twilio code ${e.code} - ${e.message}`);
        });
        return await message.save();
    }

    async findAll(): Promise<Message[]> {
        return this.model.find().exec();
    }

    async findBy(payload: SearchMessageDto): Promise<Message[]> {
        let query = {};
        if (payload.from) {
            query["from"] = payload.from;
        }
        if (payload.to) {
            query["to"] = payload.to;
        }
        return this.model.find(query).exec();
    }

    async removeAll(): Promise<number> {
        const deletedMessages = await this.model.deleteMany().exec();
        return deletedMessages.deletedCount;
    }

    async removeBy(payload: DeleteMessageDto): Promise<number> {
        let query = {};
        if (payload.from) {
            query["from"] = payload.from;
        }
        if (payload.to) {
            query["to"] = payload.to;
        }
        const deletedMessages = await this.model.deleteMany(query).exec();
        return deletedMessages.deletedCount;
    }

}
