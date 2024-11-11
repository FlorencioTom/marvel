import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(private spinner: NgxSpinnerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Mostrar el spinner antes de la solicitud
    //this.spinner.show();
    this.spinner.show();

    return next.handle(req).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            // Ocultar el spinner cuando la respuesta es exitosa
            this.spinner.hide();
          }
        },
        (error: HttpErrorResponse) => {
          // Ocultar el spinner en caso de error
          this.spinner.hide();
          // Manejar el error aquí si es necesario
        }
      )
    );
  }
}
