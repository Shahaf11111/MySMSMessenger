import { Controller, Get, Post, Body, Delete, HttpStatus } from "@nestjs/common";
import { MessageResponse } from "./message.common";
import { CreateMessageDto, DeleteMessageDto, SearchMessageDto } from "./message.dto";
import { Message } from "./message.schema";
import { MessageService } from "./message.service";

@Controller("message")
export class MessageController {
    constructor(private readonly messageService: MessageService) { }

    @Post()
    async create(@Body() payload: CreateMessageDto): Promise<MessageResponse> {
        try {
            const message = await this.messageService.create(payload);
            return { status: HttpStatus.OK, data: message, error: null };
        } catch (e) {
            return { status: HttpStatus.BAD_REQUEST, data: null, error: e.toString() };
        }
    }

    @Get()
    async findAll(): Promise<Message[]> {
        return this.messageService.findAll();
    }

    @Get()
    async findBy(@Body() payload: SearchMessageDto): Promise<Message[]> {
        return this.messageService.findBy(payload);
    }

    @Delete()
    async removeAll(): Promise<number> {
        return this.messageService.removeAll();
    }

    @Delete()
    async removeBy(payload: DeleteMessageDto): Promise<number> {
        return this.messageService.removeBy(payload);
    }

}
