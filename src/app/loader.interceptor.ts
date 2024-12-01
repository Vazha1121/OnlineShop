import { HttpInterceptorFn } from '@angular/common/http';
import { ApiService } from './Services/api.service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const api = inject(ApiService);
  api.startLoader()
  return next(req).pipe(
    finalize(() => {
      api.stopLoader()
    })
  )
};
