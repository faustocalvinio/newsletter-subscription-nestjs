import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NewsletterModule } from "./newsletter/newsletter.module";
import { Subscriber } from "./newsletter/entities/subscriber.entity";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { ThrottlerModule } from "@nestjs/throttler";

@Module({
   imports: [
      ThrottlerModule.forRoot({
         throttlers: [
            {
               ttl: 60, // Time to live in seconds
               limit: 10, // Maximum number of requests within the TTL
            },
         ],
      }),
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
         // ssl: true,
         // extra: {
         //    ssl: {
         //       rejectUnauthorized: false,
         //    },
         // },
      }),
      ServeStaticModule.forRoot({
         rootPath: join(__dirname, "..", "public"), // Carpeta donde está tu HTML
         exclude: ["/api*"], // Opcional: evita que interfiera con APIs REST
      }),
      NewsletterModule,
   ],
})
export class AppModule {}
