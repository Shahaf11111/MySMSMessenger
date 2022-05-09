import { OmitType, PartialType, PickType } from "@nestjs/mapped-types";
import { Message } from "./message.schema";

export class CreateMessageDto extends OmitType(Message, ["dateCreated"] as const) { }

export class DeleteMessageDto extends PartialType(OmitType(Message, ["dateCreated", "text"] as const)) { }

export class SearchMessageDto extends PickType(Message, ["from", "to"]) { }
