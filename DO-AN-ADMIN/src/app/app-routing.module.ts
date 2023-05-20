import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { FullLayoutComponent } from "./layouts/full/full-layout.component";
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";

import { Full_ROUTES } from "./shared/routes/full-layout.routes";
import { CONTENT_ROUTES } from "./shared/routes/content-layout.routes";

import { AuthGuard } from './shared/auth/auth-guard.service';
import { ProfileComponent } from './profile/profile.component';
//import { RequestPrintDocumentComponent } from './pages/back-office/request-form-document/request-print-document/request-print-document.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard/dashboard',
    pathMatch: 'full',
  },
  // {
  //   path: 'cms-post',
  //   loadChildren: () => import('../app/pages/admin/admin-routing-module').then(m => m.AdminRoutingModule)
  // },
  { path: '', component: FullLayoutComponent, data: { title: 'full Views' }, children: Full_ROUTES, canActivate: [AuthGuard] },
  { path: '', component: ProfileComponent, data: { title: 'full Views' }, children: Full_ROUTES, canActivate: [AuthGuard] },
  { path: '', component: ContentLayoutComponent, data: { title: 'content Views' }, children: CONTENT_ROUTES },
 // {path: 'External/PrintHoSoKhaiThac/:id',canActivate: [AuthGuard] ,component: RequestPrintDocumentComponent, data: { title: 'In hồ sơ khai thác' }},
  {
    path: '**',
    redirectTo: 'pages/error'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
