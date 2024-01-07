import { Routes } from '@angular/router';

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('../../profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'pages',
    loadChildren: () => import('../../pages/full-pages/full-pages.module').then(m => m.FullPagesModule)
  },
  {
    path: 'danh-muc',
    loadChildren: () => import('../../pages/danh-muc/danh-muc.module').then(m => m.DanhMucModule)
  },
  // {
  //   path: 'danh-muc',
  //   loadChildren: () => import('../../pages/back-office/back-office.module').then(m => m.BackOfficeModule)
  // },
  
  //   {
  //     path: 'back-office',
  //     loadChildren: () => import('../../pages/back-office/back-office.module').then(m => m.BackOfficeModule)
  //   },
  
 
  
];
