
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { DanhMucRoutingModule } from "./danh-muc-routing.module";

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { NgbActiveModal, NgbDatepickerModule, NgbModalModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import localeVi from '@angular/common/locales/vi';
import { NgSelectModule } from '@ng-select/ng-select';
// import { LinhVucComponent } from './utilitys/utilitys.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

registerLocaleData(localeVi);
@NgModule({
    imports: [
        CommonModule,
        DanhMucRoutingModule,
        SharedModule,
        NgSelectModule,
        FormsModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        }),
        NgbModalModule,
        NgbDatepickerModule,
        NgbTimepickerModule,
        NgxDatatableModule 
        // NgMultiSelectDropDownModule.forRoot()
    ],
    exports: [],
    declarations: [
        // LinhVucComponent,
      
    ],
    providers: [DatePipe, NgbActiveModal]
})
export class DanhMucModule { }
