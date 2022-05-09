import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { ServerApiVersion } from "mongodb";
import { TwilioModule } from "nestjs-twilio";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MessageModule } from "./message/message.module";

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (config: ConfigService) => ({
                uri: config.get("MONGODB_CONNECTION_URL"),
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverApi: ServerApiVersion.v1,
                connectionFactory: (connection) => {
                    connection.plugin(require("mongoose-autopopulate"));
                    return connection;
                }
            }),
            inject: [ConfigService],
        }),
        TwilioModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (cfg: ConfigService) => ({
                accountSid: cfg.get("TWILIO_ACCOUNT_SID"),
                authToken: cfg.get("TWILIO_AUTH_TOKEN"),
            }),
            inject: [ConfigService],
        }),
        MessageModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
