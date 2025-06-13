import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Subscriber } from "./entities/subscriber.entity";
import { SubscribeDto } from "./dto/subscribe.dto";
import * as nodemailer from "nodemailer";
import { ConfigService } from "@nestjs/config";
import axios from "axios";
import * as cheerio from "cheerio";

@Injectable()
export class NewsletterService {
   constructor(
      @InjectRepository(Subscriber)
      private subscriberRepository: Repository<Subscriber>,
      private readonly configService: ConfigService
   ) {}
   async subscribe(subscribeDto: SubscribeDto) {
      const existingSubscriber = await this.subscriberRepository.findOneBy({
         email: subscribeDto.email,
      });
      if (existingSubscriber) {
         return { message: "Ya estás suscrito", user: subscribeDto.email };
      }
      const subscriber = this.subscriberRepository.create(subscribeDto);
      await this.subscriberRepository.save(subscriber);
      return { message: "Suscripción exitosa", user: subscribeDto.email };
   }

   async subscribeWithoutNewsletter(subscribeDto: SubscribeDto) {}

   async scrapeNewsTitles(): Promise<string[]> {
      try {
         const { data } = await axios.get("https://www.lacapital.com.ar/");
         const $ = cheerio.load(data);
         let titles: string[] = [];

         $(".entry-title").each((_, element) => {
            const title = $(element).text().trim();
            if (title) {
               titles.push(title);
            }
         });

         return titles;
      } catch (error) {
         console.error("Error al extraer los títulos:", error.message);
         return [];
      }
   }
   async unsubscribe(subscribeDto: SubscribeDto) {
      const subscriber = await this.subscriberRepository.findOneBy({
         email: subscribeDto.email,
      });
      if (!subscriber) return { message: "No estás suscrito" };
      await this.subscriberRepository.delete(subscriber.id);
      return { message: "Desuscripción exitosa", user: subscribeDto.email };
   }

   async getSubscribers() {
      const subscribers = await this.subscriberRepository.find();
      return subscribers.map((subscriber) => subscriber.email);
   }

   async sendNewsletter() {
      const subscribers = await this.subscriberRepository.find();
      console.log(subscribers);
      if (subscribers.length === 0) return;
      
      const titles = await this.scrapeNewsTitles();
      if (titles.length === 0) {
         console.log("No hay títulos disponibles para enviar.");
         return;
      }

      const transporter = nodemailer.createTransport({
         service: "gmail",
         auth: {
            user: this.configService.get<string>("EMAIL_USER"),
            pass: this.configService.get<string>("EMAIL_PASS"),
         },
      });

      const fecha = new Date();
      const dia = fecha.getDate();
      const mes = fecha.getMonth() + 1;
      const anio = fecha.getFullYear();

      const newsletterContent = `Aquí están las últimas noticias:\n\n${titles.join(
         "\n"
      )}`;

      for (const subscriber of subscribers) {
         await transporter.sendMail({
            from: '"Newsletter" <facaldevelopment@gmail.com>',
            to: subscriber.email,
            subject: `Newsletter del día ${dia}/${mes}/${anio}`,
            text: newsletterContent,
         });
      }

      console.log("Newsletter enviado con éxito.");
   }

   
}
