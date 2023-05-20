import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UtilitysComponent } from './utilitys/utilitys.component';

const routes: Routes = [
  { path: 'tien-ich', component: UtilitysComponent, data: { title: 'Lĩnh vực' } },
  // { path: 'nguoi-dung', component: CmsUserModule, data: { title: 'Người dùng' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DanhMucRoutingModule { }
