import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { NewsletterService } from "./newsletter.service";

@Injectable()
export class NewsletterCron {
   constructor(private readonly newsletterService: NewsletterService) {}

   @Cron("*/1 * * * *") // Se ejecuta cada 1 minuto
   handleCron() {
      this.newsletterService.sendNewsletter();
   }
}
