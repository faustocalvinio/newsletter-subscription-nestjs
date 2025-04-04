import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { NewsletterService } from './newsletter.service';
import { NewsletterController } from './newsletter.controller';
import { Subscriber } from './entities/subscriber.entity';
import { NewsletterCron } from './newsletter.cron';

@Module({
  imports: [TypeOrmModule.forFeature([Subscriber]), ScheduleModule.forRoot()],
  controllers: [NewsletterController],
  providers: [NewsletterService, NewsletterCron],
})
export class NewsletterModule {}
