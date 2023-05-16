import { Component } from '@angular/core';
import { CustomDateAdapter } from 'app/shared/services/custom-date-adapter';
import { NgbDateCustomParserFormatter } from 'app/shared/services/ngb-date-custom-parser-formatter.service';
import { NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { FieldBaseComponent } from '../field-base';

@Component({
    selector: 'app-form-date',
    styleUrls: ['form-date.component.scss'],
    templateUrl: 'form-date.component.html',
    providers: [
        {provide: NgbDateAdapter, useClass: CustomDateAdapter},
        {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}
       ]
})
export class FormDateComponent extends FieldBaseComponent { }
