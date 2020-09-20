import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Observable } from 'rxjs';

@Injectable()
export class AuthTokenGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const token = req && req.headers.authorization.split(' ')[1];
      console.log(req, token);
      if (!token) {
        return false;
      }
      //   jwt.verify(token, process.env.SERECT_KEY, (err, decode) => {
      //     if (err) {
      //       throw err;
      //     }
      //     ctx.getContext().authorID = decode.authorID;
      //   });
      return true;
    } catch (err) {
      return false;
    }
  }
}
