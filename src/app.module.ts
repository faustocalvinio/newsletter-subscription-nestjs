import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NewsletterModule } from "./newsletter/newsletter.module";
import { Subscriber } from "./newsletter/entities/subscriber.entity";
import { ConfigModule } from "@nestjs/config";

@Module({
   imports: [
      ConfigModule.forRoot({
         isGlobal: true,
      }),
      TypeOrmModule.forRoot({
         type: "mysql",
         host: process.env.MYSQL_HOST,
         port: +process.env.MYSQL_PORT!,
         username: process.env.MYSQL_USERNAME,
         password: process.env.MYSQL_PASSWORD,
         database: process.env.MYSQL_DB,
         entities: [Subscriber],
         synchronize: true,
      }),
      NewsletterModule,
   ],
})
export class AppModule {}
