import { TestBed } from '@angular/core/testing';

import { WelcomeGuard } from './welcome.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../services/user.service';
import { UrlTree } from '@angular/router';

describe('WelcomeGuard', () => {
  let guard: WelcomeGuard;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
    guard = TestBed.inject(WelcomeGuard);
    userService = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('canLoad', () => {
    it('should return `true` for an authorized user', () => {
      userService.isAuthorized = true;

      expect(guard.canLoad()).toBeTruthy();
    });

    it('should redirect to `/registration` page for non-authorized users', () => {
      userService.isAuthorized = false;

      expect((guard.canLoad() as UrlTree).toString()).toBe('/registration');
    });
  });
});
