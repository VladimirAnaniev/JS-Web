import { StorageService } from '../storage.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkRoute(state.url);
  }

  checkRoute(url: string): boolean {
    if (this.storageService.isUserAuthenticated()) {
      return true;
    }

    this.storageService.redirectUrl = url;

    this.router.navigate(['auth/login']);
    return false;
  }
}
