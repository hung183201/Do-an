import { Component, OnInit } from '@angular/core';

import { FieldBaseComponent } from '../field-base';


@Component({
    selector: 'app-form-select',
    styleUrls: ['form-select.component.scss'],
    templateUrl: 'form-select.component.html'
})
export class FormSelectComponent extends FieldBaseComponent implements OnInit {
    selectedValue: string | number;
    ngOnInit(): void {
        const defaultValue = this.config.options?.find(function (el) {
            return el.selected;
        });
        this.selectedValue = defaultValue?.key;
    } 
    onChange(value) {
        console.log(value);
        if(this.config.onChange) {
            this.config.onChange(value);
        }
    }
}
