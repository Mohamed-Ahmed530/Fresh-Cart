import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const toastrService = inject(ToastrService)

  
  return next(req).pipe( catchError((err)=>{

    const errorMessage = err.error?.message;
    const excludedMessage = 'You are not logged in. Please login to get access';

    if(errorMessage && errorMessage !== excludedMessage){
      toastrService.error(err.error.message)
    }

    // console.log("interceptors",  err.error.message);

    return throwError( () => err )
    
  }) );

}; 