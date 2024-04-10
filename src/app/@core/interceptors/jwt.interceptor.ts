import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { switchMap } from "rxjs/operators";
import { AuthService } from "../../Authentication/services/auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.indexOf("/user-login") > -1) {
      return next.handle(req);
    }

    const accessToken = localStorage.getItem("accessToken");
    const refreshTokenExpiration = localStorage.getItem(
      "refreshTokenExpiration"
    );

    if (accessToken) {
      const expiration = localStorage.getItem("expiration");
      if (Date.now() < Date.parse(expiration)) {
        const transformedReq = req.clone({
          headers: req.headers.set("Authorization", `bearer ${accessToken}`),
        });
        return next.handle(transformedReq);
      } else {
        if (Date.now() < Date.parse(refreshTokenExpiration)) {
          return this.authService.getNewRefreshToken().pipe(
            switchMap((newTokens: any) => {
              const transformedReq = req.clone({
                headers: req.headers.set(
                  "Authorization",
                  `bearer ${newTokens.data.token}`
                ),
              });
              console.log(transformedReq);
              return next.handle(transformedReq);
            })
          );
        } else {
          this.authService.logout();
          return next.handle(req);
        }
      }
    } else {
      return next.handle(req);
    }
  }
}
