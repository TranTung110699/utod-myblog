import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const isLoggedIn = this.authService.isLoggedIn();
    const reqLast = req.url.split('/').reverse()[0];

    if (reqLast === 'articles' && !req.body) return next.handle(req);
    if (!isLoggedIn) return next.handle(req);
    else {
      const token = this.authService.getUserToken();
      const modifiedReq = req.clone({
        headers: req.headers.set('Authorization', token),
      });
      return next.handle(modifiedReq);
    }
  }
}
