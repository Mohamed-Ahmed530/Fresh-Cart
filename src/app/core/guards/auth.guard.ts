import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router} from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router)
  const pLATFORM_ID = inject(PLATFORM_ID)
  // check Browser or Server
  if (isPlatformBrowser(pLATFORM_ID)) {
    const token = localStorage.getItem("token")!;
    localStorage.setItem("userId", (jwtDecode(token) as {id:string}).id)
    if (localStorage.getItem("token") !== null) {
      return true;
    } else {
      router.navigate(['/login'])
      return false;
    }

  }else{
    return false;
  }

};