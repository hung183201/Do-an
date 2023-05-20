import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { TagInputModule } from 'ngx-chips';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { QuillModule } from 'ngx-quill'
import { CmsUserComponent } from './cms-user.component';
import { CmsUserRoutingModule } from './cms-user-routing.module';
import { CmsUserAddoreditComponent } from './addorupdate-user/cms-user-addoredit.component';
import { NgSelectModule } from '@ng-select/ng-select';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PipeModule } from 'app/shared/pipes/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    PipeModule,
    CmsUserRoutingModule,
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
    MatCheckboxModule,
    MatAutocompleteModule,
    MatCheckboxModule
  ],
  exports: [
    CmsUserComponent
  ],
  declarations: [
    CmsUserComponent,
    CmsUserAddoreditComponent
  ]
})
export class CmsUserModule { }
