import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularResizedEventModule } from 'angular-resize-event';
import { MatchHeightModule } from "../shared/directives/match-height.directive";
import { NgApexchartsModule } from "ng-apexcharts";
import { DashboardComponent } from "./dashboard.component";
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        NgbModule,
        MatchHeightModule,
        AngularResizedEventModule,
        NgApexchartsModule,
        NgxChartsModule,
        NgSelectModule,
        FormsModule
    ],
    exports: [],
    declarations: [
        DashboardComponent,
    ],
    providers: [],
})
export class DashboardModule { }
