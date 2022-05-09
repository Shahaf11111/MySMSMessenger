import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MessageController } from "./message.controller";
import { Message, MessageSchema } from "./message.schema";
import { MessageService } from "./message.service";

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Message.name,
          schema: MessageSchema,
          collection: "messages",
        }
      ]
    ),
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule { }
