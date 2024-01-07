import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BackOfficeRoutingModule } from './back-office-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PipeModule } from 'app/shared/pipes/pipe.module';
import { QuillModule } from 'ngx-quill';
import { ArchwizardModule } from 'angular-archwizard';
import { UiSwitchModule } from 'ngx-ui-switch';
import { TagInputModule } from 'ngx-chips';
import { MatchHeightModule } from 'app/shared/directives/match-height.directive';
import { NgSelectModule } from '@ng-select/ng-select';
import { FileUploadModule } from 'ng2-file-upload';
import { RegFormSearchByRequestComponent } from './reg-form-search/reg-form-search-by-request/reg-form-search-by-request.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    PipeModule,
    FileUploadModule,
    BackOfficeRoutingModule,
    QuillModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    NgxSpinnerModule,
    HttpClientModule,
    ArchwizardModule,
    MatchHeightModule,
    UiSwitchModule,
    NgSelectModule,
    TagInputModule,
  ],
  declarations: [
    RegFormSearchByRequestComponent
  ],
  providers: [
    NgbModal
  ]
})
export class BackOfficeModule { }
