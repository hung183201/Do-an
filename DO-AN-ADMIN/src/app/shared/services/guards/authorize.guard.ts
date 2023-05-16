// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
// import { Observable } from 'rxjs';
// import { AuthorizeService } from '../../../../../../../../../../VNPT/Code/ilis/vnpt.ilis.lpm.frontend/src/app/shared/services/authorize.service';
// import { tap } from 'rxjs/operators';
// import { ApplicationPaths, QueryParameterNames } from '../../../../../../../../../../VNPT/Code/ilis/vnpt.ilis.lpm.frontend/src/app/shared/constants';
// import { RoutePermissionConfig } from 'app/shared/models/routePermissionConfig';
// // import { CommonService } from '../../../../../../../../../../DO-An-ADMIN/src/app/shared/services/common.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthorizeGuard implements CanActivate {
//   constructor(private authorize: AuthorizeService, private router: Router, private commonService: CommonService) { }
//   canActivate(_next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
//     return this.authorize.isAuthenticated().pipe(tap(isAuthenticated => this.handleAuthorization(isAuthenticated, state)));
//   }

//   private handleAuthorization(isAuthenticated: boolean, state: RouterStateSnapshot) {
//     if (!isAuthenticated) {
//       this.router.navigate(ApplicationPaths.LoginPathComponents, {
//         queryParams: {
//           [QueryParameterNames.ReturnUrl]: state.url,
//         },
//       });
//     }
//     else {
//       if (!this.authorize.isSuperAdminRole() && !state.url.startsWith('/dashboard') && !state.url.startsWith('/content/dashboard') && !state.url.startsWith('/pages')) {
//         if (state.url.startsWith('/content') && state.root.queryParams.from) {
//           this.authorize.clearLocalStorage();
//           var currentUrl = state.url.substring(0, state.url.indexOf('?'));
//           window.location.href = currentUrl;
//         }
//         else {

//           let hasQueryString = state.url.indexOf('?') > -1;
//           let comparedUrl = hasQueryString ? state.url.substring(0, state.url.indexOf('?')) : state.url;
//           let routePermission = RoutePermissionConfig.filter(route => comparedUrl.startsWith(route.path))[0];
//           let hasPermission = routePermission && this.commonService.getArraysIntersection(routePermission.actionGroupsCode, this.authorize.actionGroups()).length > 0;
//           if (!hasPermission) {
//             this.router.navigateByUrl('/pages/permission-denied');
//           }
//         }
//       }
//     }
//   }
// }
