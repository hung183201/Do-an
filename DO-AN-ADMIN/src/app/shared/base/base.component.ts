import { TranslateService } from '@ngx-translate/core';
import { LanguageTranslationRoutingPath, RegexTypes } from 'app/shared/models/commonModels';
import { FormGroup, FormControl } from '@angular/forms';
export class BaseComponent {
    private translationData: any;
    private currentLanguage: string;
    protected languageData: any;
    module: string;
    component: string;
    regexTypesPattern = RegexTypes;
    protected mappingLanguage = LanguageTranslationRoutingPath;
    constructor(
        private translateService: TranslateService
    ) {
    }

    mapLanguagePath(module: string, component: string) {
        this.module = module;
        this.component = component;
    }

    async getTranslationData() {
        const lang: string = this.translateService.currentLang;

        if (this.currentLanguage == undefined || this.currentLanguage == null || this.currentLanguage != lang) {
            this.currentLanguage = lang;
            this.translationData = await this.translateService
                .getTranslation(lang)
                .toPromise();
        }

        return this.translationData;
    }

    getCurrentLanguage() {
        return this.currentLanguage;
    }

    getCustomClassByTrangThaiXuLy(trangThaiValue = undefined): string {
        if (trangThaiValue == 1) return "badge bg-light-warning"; // chưa xử lý
        if (trangThaiValue == 2 || trangThaiValue == 3) return "badge bg-light-info"; // Đã xử lý, chờ chuyển bước
        if (trangThaiValue == 9) return "badge bg-light-success"; //Đã xử lý
        if (trangThaiValue == 5 || trangThaiValue == 10) return "badge bg-light-secondary"; // Tạm dừng
        if (trangThaiValue == 6) return "badge bg-light-danger"; // Hủy
        if (trangThaiValue == 8) return "badge bg-light-primary"; //Chờ phân công lại
        if (trangThaiValue == 13) return "badge bg-light-primary"; //Chờ xử lý yêu cầu nội bộ
        return "";
    }

    getCustomClassByColumn(columnName, trangThaiValue = undefined): string {
        if (columnName == 'tenTrangThai') {
            if (trangThaiValue == 0) return "badge bg-light-danger";
            if (trangThaiValue == 1) return "badge bg-light-success";
        }
        if (columnName == 'mucDoThuTuc') {
            if (trangThaiValue == 1 || trangThaiValue == 2) return "text-warning";
            if (trangThaiValue == 3 || trangThaiValue == 4) return "text-success";
        }
        if (columnName == 'idTrangThaiHoSo') {
            if (trangThaiValue == 1) return "badge bg-primary"; // Tiếp nhận hồ sơ
            if (trangThaiValue == 2) return "badge bg-warning"; // Thẩm định
            if (trangThaiValue == 3) return "badge bg-info"; // Xử lý
            if (trangThaiValue == 4) return "badge bg-success"; // Trả kết quả
        }
        if (columnName == 'idTrangThaiThucHien') {
            if (trangThaiValue == 1) return "badge badge-pill bg-light-warning"; // chờ xử lý
            if (trangThaiValue == 2) return "badge badge-pill bg-light-info"; // Đang xử lý
            if (trangThaiValue == 4) return "badge badge-pill bg-light-danger"; // Hủy
            if (trangThaiValue == 5) return "badge badge-pill bg-light-primary"; //Trả dịch vụ công
            if (trangThaiValue == 100) return "badge badge-pill bg-light-success"; //Đã hoàn thành
        }
        if (columnName == 'idTrangThaiXuLy') {
            return this.getCustomClassByTrangThaiXuLy(trangThaiValue);
        }

        if (columnName == 'moTaThongBaoThueDisplay' || columnName == 'moTaThongTinNvtcDisplay') {
            return "text-info";
        }

        if (columnName == 'tenThuTuc') return "list-group-item-text text-truncate-multiple-lines";
        return "";
    }

    deleteInputStream(data) {
        return data.target.value = data.target.value.replace(/[@!|^%+-;&\/\\#,+()$~%.'":*?<>{}]/g, '');
    }

    submitAndValidateForm(form: FormGroup) {
        if (form.valid) {
            return true;
        } else {
            this.validateAllFormFields(form);
            return false;
        }

    }

    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }


}