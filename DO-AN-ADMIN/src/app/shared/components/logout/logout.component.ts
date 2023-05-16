import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationResultStatus, AuthorizeService } from 'app/shared/services/authorize.service';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

import { LogoutActions, ApplicationPaths, ReturnUrlType } from '../../constants';

// The main responsibility of this component is to handle the user's logout process.
// This is the starting point for the logout process, which is usually initiated when a
// user clicks on the logout button on the LoginMenu component.
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  public message = new BehaviorSubject<string>(null);

  constructor(private authorizeService: AuthorizeService, private activatedRoute: ActivatedRoute, private router: Router) { }

  async ngOnInit() {
    let action = this.activatedRoute.snapshot.url[1];
    if (!action) action = this.activatedRoute.snapshot.url[0];
    switch (action.path) {
      case LogoutActions.Logout:
        if (!!window.history.state.local) {
          await this.logout(this.getReturnUrl());
        } else {
          this.message.next('Hết phiên đăng nhập, yêu cầu đăng nhập lại.');
          setTimeout(() => {
            this.logout(this.getReturnUrl());
          }, 10000);
        }

        break;
      case LogoutActions.LogoutCallback:
        await this.processLogoutCallback();
        break;
      case LogoutActions.LoggedOut:
        this.message.next('Bạn đã đăng xuất thành công.');
        break;
      default:
        throw new Error(`Phương thức '${action}' không hợp lệ.`);
    }
  }

  private async logout(returnUrl: string): Promise<void> {
    const state: INavigationState = { returnUrl };
    const isAuthenticated = await this.authorizeService
      .isAuthenticated()
      .pipe(take(1))
      .toPromise();
    if (isAuthenticated) {
      const result = await this.authorizeService.signOut(state);
      switch (result.status) {
        case AuthenticationResultStatus.Redirect:
          break;
        case AuthenticationResultStatus.Success:
          await this.navigateToReturnUrl(returnUrl);
          break;
        case AuthenticationResultStatus.Fail:
          this.message.next(result.message);
          break;
        default:
          throw new Error('Phương thức xác thực không hợp lệ.');
      }
    } else {
      this.message.next('Bạn đã đăng xuất thành công.');
    }
  }

  private async processLogoutCallback(): Promise<void> {
    const result = await this.authorizeService.completeSignOut(window.location.href);
    switch (result.status) {
      case AuthenticationResultStatus.Redirect:
        // There should not be any redirects as the only time completeAuthentication finishes
        // is when we are doing a redirect sign in flow.
        throw new Error('Should not redirect.');
      case AuthenticationResultStatus.Success:
        await this.navigateToReturnUrl(this.getReturnUrl(result.state));
        break;
      case AuthenticationResultStatus.Fail:
        this.message.next(result.message);
        break;
      default:
        throw new Error('Phương thức xác thực không hợp lệ.');
    }
  }

  private async navigateToReturnUrl(returnUrl: string) {
    await this.router.navigateByUrl(returnUrl, {
      replaceUrl: true,
    });
  }

  private getReturnUrl(state?: INavigationState): string {
    const fromQuery = (this.activatedRoute.snapshot.queryParams as INavigationState).returnUrl;
    // If the url is coming from the query string, check that is either
    // a relative url or an absolute url
    if (fromQuery && !(fromQuery.startsWith(`${window.location.origin}/`) || /\/[^\/].*/.test(fromQuery))) {
      // This is an extra check to prevent open redirects.
      throw new Error('Invalid return url. The return url needs to have the same origin as the current page.');
    }
    return (state && state.returnUrl) || fromQuery || ApplicationPaths.LoggedOut;
  }
}

interface INavigationState {
  [ReturnUrlType]: string;
}
