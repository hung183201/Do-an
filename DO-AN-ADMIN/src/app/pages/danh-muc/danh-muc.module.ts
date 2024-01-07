import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PipeModule } from 'app/shared/pipes/pipe.module';
import { QuillModule } from 'ngx-quill';
import { ArchwizardModule } from 'angular-archwizard';
import { UiSwitchModule } from 'ngx-ui-switch';
import { TagInputModule } from 'ngx-chips';
import { MatchHeightModule } from 'app/shared/directives/match-height.directive';
import { NgSelectModule } from '@ng-select/ng-select';
import { FileUploadModule } from 'ng2-file-upload';
import { DanhMucRoutingModule } from './danh-muc-routing.module';
import { UtilityComponent } from './utility/utility.component';
import { HotelComponent } from './hotel/hotel.component';
import { HotelCreatOrUpdateComponent } from './hotel/createorupdate-hotel/createorupdate-hotel.component';
import { UtilityCreatOrUpdateComponent } from './utility/createorupdate-utility/createorupdate-utility.component';
import { RoomTypeComponent } from './roomtype/roomtype.component';
 import { HotelUtilityGroupComponent } from './hotel/hotel-utility-group/hotel-utility-group.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTreeModule } from '@angular/material/tree';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
 import { MatPaginator } from '@angular/material/paginator';
 import { MatTableDataSource } from '@angular/material/table';
 import { SelectionModel } from '@angular/cdk/collections';
 import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
 import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SharedModule } from 'app/shared/shared.module';
import { TableUtilityComponent } from './utility/table-utility/table-utility.component';
import { AddOrEditRoomTypeComponent } from './roomtype/addoredit-roomtype/addoredit-roomtype.component';



export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    PipeModule,
    DanhMucRoutingModule,
    QuillModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    TagInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatToolbarModule,
    // BrowserAnimationsModule,
    MatTreeModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    HttpClientModule,
  ],
  declarations: [
    UtilityComponent,
    HotelComponent,
    HotelCreatOrUpdateComponent,
    UtilityCreatOrUpdateComponent,
    RoomTypeComponent,
    HotelUtilityGroupComponent,
    TableUtilityComponent,
    AddOrEditRoomTypeComponent,
    
  ],
  providers: [
    NgbModal
  ]
})
export class DanhMucModule { }
