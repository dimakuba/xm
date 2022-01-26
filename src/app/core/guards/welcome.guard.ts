import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class WelcomeGuard implements CanLoad {
  constructor(private userService: UserService, private router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree {
    return this.userService.isAuthorized
      ? true
      : this.router.parseUrl('/registration');
  }
}
