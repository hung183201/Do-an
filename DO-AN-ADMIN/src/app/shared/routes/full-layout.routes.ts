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
    loadChildren: () => import('../../danh-muc/danh-muc-routing.module').then(m => m.DanhMucRoutingModule)
  },
  
 
  
];
