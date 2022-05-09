import { Message } from "src/message/message.schema";

export interface MessageResponse {
    status: number,
    error: string,
    data: Message,
}