import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UtilityComponent } from './utility/utility.component';
import { HotelComponent } from './hotel/hotel.component';
import { RoomTypeComponent } from './roomtype/roomtype.component';


const routes: Routes = [
  { path: 'khach-san', component: HotelComponent, data: { title: 'Danh sách khách sạn' } },
  { path: 'tien-ich', component: UtilityComponent, data: { title: 'Danh sách tiện ích' } },
  { path: 'loai-phong', component: RoomTypeComponent, data: { title: 'Danh sách Loại phòng' } },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DanhMucRoutingModule { }
