import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { NavigationExtras, Router } from "@angular/router";
import { catchError } from "rxjs/operators";
import { NbToastrService } from "@nebular/theme";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toastr: NbToastrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error) {
          switch (error.status) {
            case 400:
              if (error.error.errors) {
                const modalStateErrors = [];
                for (const key in error.error.errors) {
                  if (error.error.errors[key]) {
                    modalStateErrors.push(error.error.errors[key]);
                  }
                }
                throw modalStateErrors.reduce(
                  (acc, val) => acc.concat(val),
                  []
                );
              } else {
                this.toastr.danger(error.error.message, "Bad Request");
              }

              break;
            case 401:
              this.toastr.danger("Unauthorized", error.status);

              break;

            case 403:
              this.toastr.danger("You are not permitted for this action");

              break;

            case 404:
              this.toastr.danger("Not found", error.status);

              break;

            case 500:
              this.toastr.danger("Internal Server Error", error.status);

              break;

            default:
              this.toastr.danger("something unexpected went wrong");
              break;
          }
        }
        return throwError(error);
      })
    );
  }
}
