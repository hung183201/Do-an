// import { CommonService } from './common.service';
// import { QthtClient, UserInfoQtht, UserLevelQtht,CustomerConfigViewModel, UserTitleQtht } from './../../api-lpm-client';
// import { Injectable } from '@angular/core';
// import { User, UserManager, UserManagerSettings, WebStorageStateStore } from './oidc-client';
// import { BehaviorSubject, concat, from, Observable } from 'rxjs';
// import { filter, map, mergeMap, take, tap } from 'rxjs/operators';
// import { environment } from 'environments/environment';
// import { ApplicationPaths, ActionGroupsStorageKey, CurrentUserQthtStorageKey,ConfigQthtStorageKey } from '../constants';
// // import { JwtHelperService } from './jwt-decode/jwthelper.service';

// export type IAuthenticationResult = SuccessAuthenticationResult | FailureAuthenticationResult | RedirectAuthenticationResult;

// export interface SuccessAuthenticationResult {
//   status: AuthenticationResultStatus.Success;
//   state: any;
// }
// export interface GiaTriConfigQtht {
//   isAllowMapping: boolean;
//   isHasCadas: boolean;
// }

// export interface FailureAuthenticationResult {
//   status: AuthenticationResultStatus.Fail;
//   message: string;
// }

// export interface RedirectAuthenticationResult {
//   status: AuthenticationResultStatus.Redirect;
// }

// export enum AuthenticationResultStatus {
//   Success,
//   Redirect,
//   Fail,
// }

// export interface IUser extends User {
//   name: string;
//   given_name: string;
//   role: string[];
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthorizeService {
//   // By default pop ups are disabled because they don't work properly on Edge.
//   // If you want to enable pop up authentication simply set this flag to false.
//   private _user: IUser;
//   private popUpDisabled = true;
//   private userManager: UserManager;
//   private userSubject: BehaviorSubject<IUser | null> = new BehaviorSubject(null);

//   constructor(private jwtHelper: JwtHelperService,
//     private qthtClient: QthtClient,
//     private commonService: CommonService
//   ) {
//   }

//   // get isLoggedIn(): boolean {
//   //   return !!this.user && this.user.access_token && !this.jwtHelper.isTokenExpired(this.user.access_token);
//   // }
//   get isLoggedIn(): boolean {
//     return !!this.user;
//   }


//   logout(): any {
//     this.clearLocalStorage();
//     return this.userManager.signoutRedirect();
//   }

//   get user(): IUser {
//     return this._user;
//   }

//   public actionGroups(): [] {
//     let actionGroup = localStorage.getItem(ActionGroupsStorageKey);
//     if (actionGroup != null && actionGroup != 'undefined') {
//       return JSON.parse(actionGroup);
//     } else {
//       return [];
//     }
//   }

//   public currentUserInfo(): UserInfoQtht {
//     let userQtht = localStorage.getItem(CurrentUserQthtStorageKey);
//     if (userQtht != null && userQtht != 'undefined') {
//       return UserInfoQtht.fromJS(JSON.parse(userQtht));
//     } else {
//       return null;
//     }
//   }

//   public configQthtInfo(): CustomerConfigViewModel {
//     let configQtht = localStorage.getItem(ConfigQthtStorageKey);
//     if (configQtht != null && configQtht != 'undefined') {
//       return CustomerConfigViewModel.fromJS(JSON.parse(configQtht));
//     } else {
//       return null;
//     }
//   }

//   public isSuperAdminRole(): boolean {
//     let currentUserQthtInfo = this.currentUserInfo();
//     return currentUserQthtInfo && (currentUserQthtInfo.userLevel === UserLevelQtht.System || currentUserQthtInfo.userLevel === UserLevelQtht.SubSystem);

//   }

//   public hasPermissionOnActionGroup(actionGroupsCode: string[]): boolean {
//     return this.commonService.getArraysIntersection(actionGroupsCode, this.actionGroups()).length > 0;
//   }

//   public isTaiKhoanChuyenVien(): boolean {
//     let currentUserQthtInfo = this.currentUserInfo();
//     return currentUserQthtInfo && (
//       currentUserQthtInfo.userTitle === UserTitleQtht.ChuyenVienVpdkTinh
//       || currentUserQthtInfo.userTitle === UserTitleQtht.Khac
//       || currentUserQthtInfo.userTitle === UserTitleQtht.ChuyenVien);

//   }

//   public isTaiKhoanLanhDao(): boolean {
//     let currentUserQthtInfo = this.currentUserInfo();
//     return currentUserQthtInfo && (currentUserQthtInfo.userTitle && 
//       (currentUserQthtInfo.userTitle === UserTitleQtht.LanhDaoChiNhanh 
//       || currentUserQthtInfo.userTitle === UserTitleQtht.LanhDaoPhongDangKyCapGcn
//       || currentUserQthtInfo.userTitle === UserTitleQtht.LanhDaoSo
//       || currentUserQthtInfo.userTitle === UserTitleQtht.LanhDaoVpdk
//       || currentUserQthtInfo.userTitle === UserTitleQtht.LanhDaoUBND
//       || currentUserQthtInfo.userTitle === UserTitleQtht.LanhDaoTNMT));
//   }

//   public isAllowMappingDvc(): boolean {
//     let result = false;
//     let currentConfigQthtInfo = this.configQthtInfo();
//     if(currentConfigQthtInfo){
//       if(currentConfigQthtInfo.giaTri){
//         let obj: GiaTriConfigQtht = JSON.parse(currentConfigQthtInfo.giaTri);
//         if(obj){
//           return obj.isAllowMapping
//         }
//       }
      
//     }
//     return result

//   }

//   public hasRole(role: string): boolean {
//     return this._user && this._user.role && this._user.role.indexOf(role) > -1;
//   }

//   // public isAuthenticated(): Observable<boolean> {
//   //   debugger;
//   //   return this.getUser().pipe(map(u => !!u && u.access_token && !this.jwtHelper.isTokenExpired(u.access_token)));
//   //   // return this.getUser().pipe(map(u => u && u.access_token && !u.expired));
//   // }


//   public isAuthenticated(): Observable<boolean> {
//     let isAuthenticatedFromStorage = this.getUser().pipe(map(u => !!u));
//     let isAuthenticatedFromUserManager = this.getUserFromUserManager().pipe(map(u => !!u && u.access_token && !this.jwtHelper.isTokenExpired(u.access_token)));
//     return isAuthenticatedFromStorage && isAuthenticatedFromUserManager;
//     // return this.getUser().pipe(map(u => !!u));
//   }

//   public getUser(): Observable<IUser | null> {
//     return concat(
//       this.userSubject.pipe(
//         take(1),
//         filter(u => !!u),
//       ),
//       this.getUserFromStorage().pipe(
//         filter(u => !!u),
//         tap(u => {
//           this._user = u;
//           this.userSubject.next(u);
//         }),
//       ),
//       this.userSubject.asObservable(),
//     );
//   }

//   public getAccessToken(): Observable<string> {
//     return from(this.ensureUserManagerInitialized()).pipe(
//       mergeMap(() => from(this.userManager.getUser())),
//       map(user => user && user.access_token),
//     );
//   }

//   public getUserFromUserManager(): Observable<User> {
//     return from(this.ensureUserManagerInitialized()).pipe(
//       mergeMap(() => from(this.userManager.getUser())),
//       map(user => user)
//     );
//   }

//   // We try to authenticate the user in three different ways:
//   // 1) We try to see if we can authenticate the user silently. This happens
//   //    when the user is already logged in on the IdP and is done using a hidden iframe
//   //    on the client.
//   // 2) We try to authenticate the user using a PopUp Window. This might fail if there is a
//   //    Pop-Up blocker or the user has disabled PopUps.
//   // 3) If the two methods above fail, we redirect the browser to the IdP to perform a traditional
//   //    redirect flow.
//   public async signIn(state: any): Promise<IAuthenticationResult> {
//     await this.ensureUserManagerInitialized();
//     let user: User = null;
//     try {
//       user = await this.userManager.signinSilent(this.createArguments());
//       this.userSubject.next(user.profile as any);
//       await (this.loadActionGroups()).toPromise();
//       await (this.loadCurrentUserInfo()).toPromise();
//       await (this.loadConfigQthtInfo()).toPromise();
//       return this.success(state);
//     } catch (silentError) {
//       // User might not be authenticated, fallback to popup authentication
//       console.log('Silent authentication error: ', silentError);

//       try {
//         if (this.popUpDisabled) {
//           throw new Error("Popup disabled. Change 'authorize.service.ts:AuthorizeService.popupDisabled' to false to enable it.");
//         }
//         user = await this.userManager.signinPopup(this.createArguments());
//         this.userSubject.next(user.profile as any);
//         await (this.loadActionGroups()).toPromise();
//         await (this.loadCurrentUserInfo()).toPromise();
//         await (this.loadConfigQthtInfo()).toPromise();
//         return this.success(state);
//       } catch (popupError) {
//         if (popupError.message === 'Popup window closed') {
//           // The user explicitly cancelled the login action by closing an opened popup.
//           return this.error('The user closed the window.');
//         } else if (!this.popUpDisabled) {
//           console.log('Popup authentication error: ', popupError);
//         }

//         // PopUps might be blocked by the user, fallback to redirect
//         try {
//           await this.userManager.signinRedirect(this.createArguments(state));
//           return this.redirect();
//         } catch (redirectError) {
//           console.log('Redirect authentication error: ', redirectError);
//           return this.error(redirectError);
//         }
//       }
//     }
//   }
//   public loadActionGroups(): Observable<void> {
//     return this.qthtClient.getActionGroupsCodeByCurrentUser().pipe(map(actionGroups => {
//       localStorage.setItem(ActionGroupsStorageKey, JSON.stringify(actionGroups.data));
//     }));
//   }

//   public loadCurrentUserInfo(): Observable<void> {
//     return this.qthtClient.getCurrentUserInfo().pipe(map(user => {
//       localStorage.setItem(CurrentUserQthtStorageKey, JSON.stringify(user.data));
//     }));
//   }

//   public loadConfigQthtInfo(): Observable<void> {
//     return this.qthtClient.getConfigFromQtht().pipe(map(user => {
//       localStorage.setItem(ConfigQthtStorageKey, JSON.stringify(user.data));
//     }));
//   }

//   public async completeSignIn(url: string): Promise<IAuthenticationResult> {
//     try {
//       await this.ensureUserManagerInitialized();
//       const user = await this.userManager.signinCallback(url);
//       this.userSubject.next(user && (user.profile as any));

//       await (this.loadActionGroups()).toPromise();
//       await (this.loadCurrentUserInfo()).toPromise();
//       await (this.loadConfigQthtInfo()).toPromise();
//       return this.success(user && user.state);
//     } catch (error) {
//       console.log('There was an error signing in: ', error);
//       return this.error('There was an error signing in.');
//     }
//   }

//   public async signOut(state: any): Promise<IAuthenticationResult> {
//     try {
//       if (this.popUpDisabled) {
//         throw new Error("Popup disabled. Change 'authorize.service.ts:AuthorizeService.popupDisabled' to false to enable it.");
//       }

//       await this.ensureUserManagerInitialized();
//       await this.userManager.signoutPopup(this.createArguments());
//       this.userSubject.next(null);
//       this.clearLocalStorage();
//       return this.success(state);
//     } catch (popupSignOutError) {
//       console.log('Popup signout error: ', popupSignOutError);
//       try {
//         await this.userManager.signoutRedirect(this.createArguments(state));
//         await this.userManager.removeUser();
//         this.clearLocalStorage();
//         return this.redirect();
//       } catch (redirectSignOutError) {
//         console.log('Redirect signout error: ', popupSignOutError);
//         return this.error(redirectSignOutError);
//       }
//     }
//   }

//   public async completeSignOut(url: string): Promise<IAuthenticationResult> {
//     await this.ensureUserManagerInitialized();
//     try {
//       const signoutResponse = await this.userManager.signoutCallback(url);
//       this.userSubject.next(null);
//       await this.userManager.removeUser();
//       this.clearLocalStorage();
//       return this.success(signoutResponse && signoutResponse.state.data);
//     } catch (error) {
//       console.log(`There was an error trying to log out '${error}'.`);
//       return this.error(error);
//     }
//   }

//   private createArguments(state?: any): any {
//     return { useReplaceToNavigate: true, data: state };
//   }

//   private error(message: string): IAuthenticationResult {
//     return { status: AuthenticationResultStatus.Fail, message };
//   }

//   private success(state: any): IAuthenticationResult {
//     return { status: AuthenticationResultStatus.Success, state };
//   }

//   private redirect(): IAuthenticationResult {
//     return { status: AuthenticationResultStatus.Redirect };
//   }

//   private async ensureUserManagerInitialized(): Promise<void> {
//     if (this.userManager !== undefined) {
//       return;
//     }
//     const settings: UserManagerSettings = {
//       authority: environment.STS_URL, // URL Authorization Service
//       client_id: 'vilis-client-code',
//       redirect_uri: `${location.origin}/${ApplicationPaths.LoginCallback}`, // page được SSO sử dụng để trả access_token
//       scope: 'openid authorize-vilis-api profile offline_access',
//       response_type: 'code',
//       client_secret: 'y47XC$2Xz3h^7R',
//       post_logout_redirect_uri: `${location.origin}${ApplicationPaths.LogOutCallback}`,
//       automaticSilentRenew: true,
//       //includeIdTokenInSilentRenew: true,
//       // metadata: {
//       //   issuer: environment.STS_URL,
//       //   authorization_endpoint: environment.STS_URL + `/connect/authorize`,
//       //   token_endpoint: environment.STS_URL + `/connect/token`,
//       //   end_session_endpoint: environment.STS_URL + `/connect/endsession`,
//       //   revocation_endpoint: environment.STS_URL + `/connect/revocation`,
//       //   // check_session_iframe: environment.STS_URL + `/connect/checksession`,
//       //   jwks_uri: environment.STS_URL + `/.well-known/openid-configuration/jwks`,
//       //   userinfo_endpoint: environment.STS_URL + `/connect/userinfo`,
//       //   introspection_endpoint: environment.STS_URL + `/connect/introspect`,
//       //   loadUserInfo: true
//       // },
//       userStore: new WebStorageStateStore({ store: window.localStorage }),
//     };

//     this.userManager = new UserManager(settings);

//     // this.userManager.events.addUserSignedOut(async () => {
//     //   await this.userManager.removeUser();
//     //   this.userSubject.next(null);
//     //   this.clearLocalStorage();
//     // });
//   }

//   private getUserFromStorage(): Observable<IUser> {
//     return from(this.ensureUserManagerInitialized()).pipe(
//       mergeMap(() => this.userManager.getUser()),
//       map(u => u && (u.profile as any)),
//     );
//   }

//   public clearLocalStorage() {
//     localStorage.clear();
//     this.userManager.clearStaleState();
//   }

// }
