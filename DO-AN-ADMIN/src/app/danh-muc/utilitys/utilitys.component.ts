import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { FieldTypes, RegexTypes, PagingDefault, Paging } from 'app/shared/models/commonModels';
import { ColumnMode } from "@swimlane/ngx-datatable";
import { LinhVucRequest, LinhVucViewModel, ApiResultOfString, ApiResultOfBoolean, LinhVucManageClient } from 'app/api-lpm-client';
import { Observable } from 'rxjs';
import { ModalService } from 'app/shared/services/modal.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { FormBaseComponent } from 'app/shared/base/form-base.component';

@Component({
    selector: 'app-utilitys',
    templateUrl: './utilitys.component.html',
    styleUrls: ['./utilitys.component.scss']
})
export class LinhVucComponent extends FormBaseComponent<LinhVucViewModel> implements OnInit {

    // ===== End Fetch Data =====

    @ViewChild('tableRowDetails') tableRowDetails: any;

    // ===== Begin Init =====

    constructor(
        private linhVucManageClient: LinhVucManageClient,
        modalService: ModalService,
        toastr: ToastrService,
        cd: ChangeDetectorRef,
        translate: TranslateService
    ) {
        super(modalService, toastr, cd, translate);
    }

    async ngOnInit() {
        this.mapLanguagePath("DANH-MUC", "linhVuc");
        this.tableFormOptions = {
            pagingOption: new Paging(),
            columnMode: ColumnMode.force,
            columns: [
                {
                    prop: 'tenLinhVuc', name: 'tenLinhVuc', headerTemplate: 'tenLinhVuc', width: 150,
                    fieldPatternValue: RegexTypes.Default,
                    fieldType: FieldTypes.Textbox, fieldValidations: [Validators.required, Validators.maxLength(2000)],
                },
                {
                    prop: 'moTa', name: 'moTa', headerTemplate: 'moTa',
                    fieldPatternValue: RegexTypes.Default,
                    fieldType: FieldTypes.Textbox,
                    fieldValidations: [Validators.maxLength(2000)]
                },
                {
                    prop: 'ngayTao', name: 'ngayTao', headerTemplate: 'ngayTao',
                    fieldPatternValue: RegexTypes.Default,
                    fieldType: FieldTypes.Date,
                    fieldEditHidden: true,
                    fieldCreateHidden: true
                },
                {
                    prop: 'ngayCapNhat', name: 'ngayCapNhat', headerTemplate: 'ngayCapNhat',
                    fieldPatternValue: RegexTypes.Default,
                    fieldType: FieldTypes.Date,
                    fieldEditHidden: true,
                    fieldCreateHidden: true
                },
                {
                    prop: 'trangThai',
                    name: 'trangThai',
                    headerTemplate: 'trangThai',
                    fieldType: FieldTypes.Select,
                    fieldOptions: this.listStatus,
                    fieldValidations: [Validators.required],
                    fieldViewHidden: true,
                },
                {
                    prop: 'tenTrangThai', name: 'tenTrangThai', headerTemplate: 'trangThai',
                    fieldType: FieldTypes.Textbox, fieldEditHidden: true, fieldCreateHidden: true,
                },
            ]
        };
        this.ngOnBaseInit();
    }

    registerCallBackFunctions() {
        this.getDataCallBack = this.getData;

        this.deleteCallBack = function (id: string | null | undefined): Observable<ApiResultOfBoolean> {
            return this.linhVucManageClient.delete(id);
        };

        this.createCallBack = function (command: LinhVucViewModel): Observable<ApiResultOfString> {
            return this.linhVucManageClient.add(command);
        };

        this.editCallBack = function (command: LinhVucViewModel, idToUpdate): Observable<ApiResultOfString> {
            command.id = idToUpdate;
            return this.linhVucManageClient.edit(command);
        }

    }

    // ===== End Init =====

    // ===== Begin Fetch Data =====

    getData(searchKeyWord, newPageIndex?) {
        this.searchKeyword = searchKeyWord;
        this.tableFormOptions.pagingOption.pageIndex = newPageIndex ?? PagingDefault.pageIndex;
        this.linhVucManageClient.search(new LinhVucRequest({
            fullTextSearch: this.searchKeyword,
            pageNumber: this.tableFormOptions.pagingOption.pageIndex,
            pageSize: this.tableFormOptions.pagingOption.pageSize

        })).subscribe(res => {
            this.bindDataToTable(res);
        });
    }
    rowDetailsToggleExpand(row) {
        this.tableRowDetails.rowDetail.toggleExpandRow(row);
    }

}
