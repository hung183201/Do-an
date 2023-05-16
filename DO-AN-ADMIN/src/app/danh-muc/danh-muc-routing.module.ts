import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { LinhVucComponent } from './utilitys/utilitys.component';

const routes: Routes = [
  // { path: 'linh-vuc', component: LinhVucComponent, data: { title: 'Lĩnh vực' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DanhMucRoutingModule { }
