import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegFormSearchByRequestComponent } from './reg-form-search/reg-form-search-by-request/reg-form-search-by-request.component';


const routes: Routes = [
  // { path: 'tien-ich', component: RegFormSearchByRequestComponent, data: { title: 'Lập phiếu hồ sơ giấy' } },
  { path: 'reg-form-search-by-request', component: RegFormSearchByRequestComponent, data: { title: 'Danh sách hồ sơ quét theo yêu cầu' } },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BackOfficeRoutingModule { }
