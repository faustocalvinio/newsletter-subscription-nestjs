import { Controller, Post, Body } from "@nestjs/common";
import { NewsletterService } from "./newsletter.service";
import { SubscribeDto } from "./dto/subscribe.dto";

@Controller("newsletter")
export class NewsletterController {
   constructor(private readonly newsletterService: NewsletterService) {}

   @Post("subscribe")
   subscribe(@Body() subscribeDto: SubscribeDto) {
      return this.newsletterService.subscribe(subscribeDto);
   }

   @Post("unsubscribe")
   unsubscribe(@Body() subscribeDto: SubscribeDto) {
      return this.newsletterService.unsubscribe(subscribeDto);
   }
}
