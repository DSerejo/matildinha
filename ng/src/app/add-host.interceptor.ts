import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { Injectable } from '@angular/core';

@Injectable()
export class AddHostInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(!req.url.startsWith('/')){
      return next.handle(req);
    }
    const url = environment.API_URL;
    req = req.clone({
      url: url + req.url,
      withCredentials: true
    });
    return next.handle(req);
  }
}