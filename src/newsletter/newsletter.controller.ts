import { Controller, Post, Body, UseInterceptors, Get } from "@nestjs/common";
import { NewsletterService } from "./newsletter.service";
import { SubscribeDto } from "./dto/subscribe.dto";
import { BlockDateInjectionInterceptor } from "src/common/interceptors/block-date-injection.interceptor";

@Controller("newsletter")
export class NewsletterController {
   constructor(private readonly newsletterService: NewsletterService) {}
   @UseInterceptors(BlockDateInjectionInterceptor)
   @Post("subscribe")
   subscribe(@Body() subscribeDto: SubscribeDto) {
      return this.newsletterService.subscribe(subscribeDto);
   }
   @Get("get-subscribers")
   getSubscribers() {
      return this.newsletterService.getSubscribers();
   }

   @Post("unsubscribe")
   unsubscribe(@Body() subscribeDto: SubscribeDto) {
      return this.newsletterService.unsubscribe(subscribeDto);
   }
}
