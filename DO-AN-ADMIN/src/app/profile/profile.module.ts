import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { ProfileRoutingModule } from "./profile.routing";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularResizedEventModule } from 'angular-resize-event';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ProfileComponent } from "./profile.component";


@NgModule({
    imports: [
        CommonModule,
        ProfileRoutingModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2SearchPipeModule,
        AngularResizedEventModule
    ],
    exports: [],
    declarations: [
        ProfileComponent,
    ],
    providers: [],
})
export class ProfileModule { }
