import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Startup } from "./features/users/startups/entities/startup.entity";
import { Investor } from "./features/users/investors/entities/investor";
import { StartupsController } from './features/users/startups/controllers/startups/startups.controller';
import { UsersModule } from './features/users/users.module';
import { InvestmentModule } from './features/investments/investment.module';
import { FundingRound } from "./features/investments/entities/funding-round/funding-round";
import { FundingRoundsController } from './features/investments/controllers/funding-rounds.controller';
import { AuthModule } from './features/auth/auth.module';
import { JwtTokenModule } from './features/token/jwt-token.module';
import { Investment } from "./features/investments/entities/investment/investment";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from 'path';
import { Tag } from "./features/tags/entities/tag/tag";
import { TagsModule } from './features/tags/tags.module';
import { ChatsModule } from './features/chats/chats.module';
import { Chat } from "./features/chats/entities/chat/chat";
import { Message } from "./features/chats/entities/message/message";
import { entities, migrations } from "./constants/typeorm";
import { NotificationsModule } from './features/notifications/notifications.module';
import { BaseGateway } from './common/gateways/base/base.gateway';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PaginateModule } from './common/paginate/paginate.module';
import { StatisticsModule } from './features/statistics/statistics.module';


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'uploads'),
            serveRoot: '/uploads'
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get("POSTGRES_HOST"),
                port: 5432,
                username: configService.get("POSTGRES_USER"),
                password: configService.get("POSTGRES_PASSWORD"),
                database: configService.get("POSTGRES_DB").toString(),
                entities: entities,
                // migrations: migrations,
                // migrationsRun: false,
                synchronize: false,
            }),
        }),
        EventEmitterModule.forRoot(),
        UsersModule,
        InvestmentModule,
        AuthModule,
        JwtTokenModule,
        TagsModule,
        ChatsModule,
        NotificationsModule,
        PaginateModule,
        StatisticsModule,
    ],
    controllers: [AppController, StartupsController, FundingRoundsController],
    providers: [AppService],
})
export class AppModule {}
