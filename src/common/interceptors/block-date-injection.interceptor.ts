import {
   BadRequestException,
   Injectable,
   NestInterceptor,
   ExecutionContext,
   CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class BlockDateInjectionInterceptor implements NestInterceptor {
   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const request = context.switchToHttp().getRequest();

      if ("dateOfSubscription" in request.body) {
         throw new BadRequestException(
            "dateOfSubscription cannot be set manually"
         );
      }

      return next.handle();
   }
}
