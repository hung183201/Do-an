import { CmsUserModule } from './cms-user/cms-user.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'cms-cate',
  },
  {
    path: 'cms-user',
    loadChildren: () => import('../admin/cms-user/cms-user.module').then(m => m.CmsUserModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
