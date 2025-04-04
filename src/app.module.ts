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
         type: "postgres",
         host: process.env.POSTGRES_HOST,
         port: +process.env.POSTGRES_PORT!,
         username: process.env.POSTGRES_USERNAME,
         password: process.env.POSTGRES_PASSWORD,
         database: process.env.POSTGRES_DB,
         entities: [Subscriber],
         synchronize: true,
         logging: true,
         ssl: true,
         extra: {
            ssl: {
               rejectUnauthorized: false,
            },
         },
      }),
      NewsletterModule,
   ],
})
export class AppModule {}
