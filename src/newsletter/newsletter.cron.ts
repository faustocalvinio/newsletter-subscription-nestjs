import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { NewsletterService } from "./newsletter.service";

@Injectable()
export class NewsletterCron {
   constructor(private readonly newsletterService: NewsletterService) {}

   @Cron("*/1 * * * *") // Se ejecuta cada 1 minuto
   handleCron() {
      const currentDate = new Date();
      const currentHour = currentDate.getHours();
      const currentMinute = currentDate.getMinutes();
      const currentDay = currentDate.getDate();
      const currentMonth = currentDate.getMonth() + 1; // Los meses en JavaScript son 0-indexed
      const currentYear = currentDate.getFullYear();
      const fullDate = `${currentDay}/${currentMonth}/${currentYear}`;
      const fullTime = `${currentHour}:${currentMinute}`;
      // this.newsletterService.sendNewsletter();
      console.log(`Newsletter sent! at ${fullDate} ${fullTime}`);
   }
}
