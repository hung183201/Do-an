import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CmsUserComponent } from './cms-user.component';
import { CmsUserAddoreditComponent } from './addorupdate-user/cms-user-addoredit.component';



const routes: Routes = [
  {
    path: '',
    component: CmsUserComponent,
    data: {
      title: 'Quản trị người dùng'
    }
  },
  {
    path: 'addorupdate-user',
    component: CmsUserAddoreditComponent,
    data:{
      title: 'Thêm mới/ Chỉnh sửa người dùng'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CmsUserRoutingModule { }
