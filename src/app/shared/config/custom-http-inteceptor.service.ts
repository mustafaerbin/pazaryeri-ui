import {
  HttpErrorResponse,
  HttpHandler, HttpHeaderResponse, HttpInterceptor, HttpProgressEvent, HttpRequest, HttpResponse, HttpSentEvent,
  HttpUserEvent, HttpXsrfTokenExtractor
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Injectable} from "@angular/core";
import {AppStore} from "../utils/app.store";
import {Router} from "@angular/router";
import {tap} from 'rxjs/operators';
import {HttpStatus} from '../utils/constants';
import {ConfirmationService} from "primeng/api";

@Injectable()
export class CustomHttpInterceptorService implements HttpInterceptor {

  constructor(private tokenExtractor: HttpXsrfTokenExtractor,
              private appStore: AppStore,
              private confirmationService: ConfirmationService,
              private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    const headerName = 'X-XSRF-TOKEN';
    const angularHref = 'ANGULAR-HREF';
    let token = this.tokenExtractor.getToken() as string;
    let href = this.router.url as string;

    if (token !== null && !req.headers.has(headerName)) {
      req = req.clone({headers: req.headers.set(headerName, token)});
    }

    if (href !== null) {
      req = req.clone({headers: req.headers.set(angularHref, encodeURI(href))});
    }

    const nextReq = req.clone({
      headers: req.headers.set('Cache-Control', 'no-cache')
        .set('Pragma', 'no-cache')
        .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
        .set('If-Modified-Since', '0')
    });

    return next.handle(nextReq)
      .pipe(tap({
        error: e => {
          if (e instanceof HttpErrorResponse) {
            console.log("e",e);
            // todo alttaki yorum kısmı düzenlenecek
            // if (e.status === HttpStatus.UNAUTHORIZED) {
            //   window.location.href = "/";
            // }
          }
        }
      }));
    /*.pipe(catchError((err, caught) => {
      console.log(err);
      if(err.status === 401) {
        window.location.href =  "/icra/spring/auth/login";
      }

      return throwError(caught);
    }));*/
  }
}

