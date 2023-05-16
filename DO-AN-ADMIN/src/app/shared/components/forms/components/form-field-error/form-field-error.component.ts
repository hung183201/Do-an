import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { IFieldConfig, RegexTypes } from 'app/shared/models/commonModels';
//import { error } from 'console';
import { AppFormComponent } from '../form';

@Component({
    selector: 'app-form-field-error, [appFormFieldError]',
    styleUrls: ['form-field-error.component.scss'],
    templateUrl: 'form-field-error.component.html'
})
export class FormFieldErrorComponent implements OnInit {
    @Input() public fieldConfig: IFieldConfig;
    constructor(public formComponent: AppFormComponent) { }
    ngOnInit() { }

    errorMessage(): string {
        // valid || (pristine && !submitted)
        const control: AbstractControl = this.formComponent.form.get(this.fieldConfig.name);
        let errorMessage = '';
        if (control) {
            for (const errorCode in control.errors) {
                if (control.errors.hasOwnProperty(errorCode) && (control.touched || this.formComponent.submitted)) {
                    if (errorCode === 'maxlength' || errorCode === 'minlength') {
                        const requiredLength = control.errors[errorCode].requiredLength;
                        errorMessage = this.getErrorText(errorCode) + ' ' + requiredLength + ' ký tự';
                        return errorMessage;
                    }
                    if (errorCode === 'pattern' && (control.errors[errorCode].requiredPattern as string).includes(RegexTypes.MaQuyTrinh)) {
                        errorMessage = this.getErrorText(errorCode) + '. Mã quy trình chỉ bao gồm các ký tự số, chữ không dấu, dấu gạch dưới(_) hoặc gạch ngang(-)';
                        return errorMessage;
                    }
                    if (errorCode === 'pattern' && (control.errors[errorCode].requiredPattern as string).includes(RegexTypes.MaThuTuc)) {
                        errorMessage = this.getErrorText(errorCode) + '. Mã thủ tục chỉ bao gồm các ký tự số, chữ không dấu, dấu gạch dưới(_) hoặc gạch ngang(-)';
                        return errorMessage;
                    }
                    if (errorCode === 'pattern' && (control.errors[errorCode].requiredPattern as string).includes(RegexTypes.MaLinhVuc)) {
                        errorMessage = this.getErrorText(errorCode) + '. Mã lĩnh vực chỉ bao gồm các ký tự số, chữ không dấu, dấu gạch dưới(_) hoặc gạch ngang(-)';
                        return errorMessage;
                    }
                    return this.getErrorText(errorCode);
                }
            }
        }
        return '';
    }

    private getErrorText(code: string) {
        const config: any = {
            required: 'Tham số bắt buộc',
            maxlength: 'Vượt quá độ dài tối đa',
            minlength: 'Không đủ độ dài tối thiểu',
            email: 'Email không hợp lệ',
            telephone: 'Số điện thoại không hợp lệ',
            date: 'Ngày giờ không hợp lệ',
            invalidDomain: 'Domain không hợp lệ',
            numberValidator: 'Số không hợp lệ',
            numberNotZeroValidator: 'Số phải lớn hơn 0',
            multipleCheckboxRequireAtLeastOne: 'At least one option required',
            multipleCheckboxRequireMoreThanOne: 'More than one options required',
            pattern : 'Có ký tự không phù hợp (có chứa các ký tự đặc biệt)'
        };
        return (this.fieldConfig.errorMessages && this.fieldConfig.errorMessages[code]) || config[code];
    }

}
