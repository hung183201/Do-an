import { MapboxglService } from 'app/shared/services/mapboxgl.service';
import { NgModule, APP_INITIALIZER } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ToastrModule } from "ngx-toastr";
import { AgmCoreModule } from "@agm/core";
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { DragulaService } from "ng2-dragula";
import { NgxSpinnerModule } from 'ngx-spinner';

import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface
} from 'ngx-perfect-scrollbar';

import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./shared/shared.module";
import { AppComponent } from "./app.component";
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";
import { FullLayoutComponent } from "./layouts/full/full-layout.component";

import { AuthService } from "./shared/auth/auth.service";
import { AuthGuard } from "./shared/auth/auth-guard.service";

import { CommonMainService } from "./shared/services/common-main.service";
import { DanhMucService } from "./shared/services/danh-muc.service";

import { JwtInterceptor } from "./shared/services/interceptors/jwt.interceptor";
import { ErrorInterceptor } from "./shared/services/interceptors/error.interceptor";
//import { initializeApp  } from "./app.initializer";

import { WINDOW_PROVIDERS } from './shared/services/window.service';
import { HoSoLuuTruService } from "./shared/services/ho-so-luu-tru.service";
import { ImportExcelService } from "./shared/services/import-excel.service";
import { HoSoKhaiThacService } from "./shared/services/ho-so-khai-thac.service";
import { NguoiDungService } from "./shared/services/nguoi-dung.service";
import { PhieuYeuCauKhaiThacService } from "./shared/services/phieu-yeu-cau-khai-thac.service";
//import { RequestPrintDocumentComponent, SafeHtmlPipe } from './pages/back-office/request-form-document/request-print-document/request-print-document.component';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { environment } from 'environments/environment';
import { API_BASE_URL } from './api-client';
import { DataService } from './shared/services/data.service';


//var firebaseConfig = {
//  apiKey: "YOUR_API_KEY", //YOUR_API_KEY
//  authDomain: "YOUR_AUTH_DOMAIN", //YOUR_AUTH_DOMAIN
//  databaseURL: "YOUR_DATABASE_URL", //YOUR_DATABASE_URL
//  projectId: "YOUR_PROJECT_ID", //YOUR_PROJECT_ID
//  storageBucket: "YOUR_STORAGE_BUCKET", //YOUR_STORAGE_BUCKET
//  messagingSenderId: "YOUR_MESSAGING_SENDER_ID", //YOUR_MESSAGING_SENDER_ID
//  appId: "YOUR_APP_ID", //YOUR_APP_ID
//  measurementId: "YOUR_MEASUREMENT_ID" //YOUR_MEASUREMENT_ID
//};


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false
};

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [AppComponent, FullLayoutComponent, ContentLayoutComponent,  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    RichTextEditorAllModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgbModule,
    NgxSpinnerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    AgmCoreModule.forRoot({
      apiKey: "YOUR_GOOGLE_MAP_API_KEY"
    }),
    PerfectScrollbarModule,
  ],
  providers: [

    AuthService,
    AuthGuard,
    HoSoLuuTruService,
    CommonMainService,
    ImportExcelService,
    DanhMucService,
    HoSoKhaiThacService,
    NguoiDungService,
    DragulaService,
    MapboxglService,
    PhieuYeuCauKhaiThacService,
    DataService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: API_BASE_URL,
      useValue: environment.API_BASE_URL
    },
    //{ provide: APP_INITIALIZER, useFactory: initializeApp, multi: true, deps: [AuthService] },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    WINDOW_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
