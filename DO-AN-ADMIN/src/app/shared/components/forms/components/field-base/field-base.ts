import { Injectable, Directive } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { IFieldConfig, Field } from 'app/shared/models/commonModels';
import { AppFormComponent } from '../form';
import { FormsService } from '../../forms.service';

@Directive()
@Injectable()
export abstract class FieldBaseComponent implements Field {
    config: IFieldConfig;
    constructor(
        public fc: AppFormComponent,
        private formService: FormsService) { }
    get formGroup(): FormGroup {
        return this.fc.form;
    }

    showAsterisk(config: IFieldConfig): boolean {
        return this.formService.showIndicator(config);
    }
}
