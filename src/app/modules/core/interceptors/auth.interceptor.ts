import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const bearerToken = this.authService.getToken();
    const apiToken = environment.apiKey;

    // TODO - check if request is of type HttpResponse or of type HttpErrorResponse (redirect user on failed login)
    if (bearerToken) {
      console.log('bearar');

      const headers = new HttpHeaders({
        Authorization: `Bearer ${bearerToken}`,
        'API-KEY': apiToken,
      });

      const cloned = req.clone({ headers });
      return next.handle(cloned);
    } else {
      console.log('no bearer');

      const headers = new HttpHeaders({
        'API-KEY': apiToken,
      });
      const cloned = req.clone({ headers });
      return next.handle(cloned);
    }
  }
}
