import { ViewChild, TemplateRef, ChangeDetectorRef } from '@angular/core';
import {
    IAppTableOptions, FieldTypes, BasePermission, IFieldConfig,
    RegexTypes, PagingDefault, IOption, ITableColumn, DateFormat, LanguageTranslationRoutingPath
} from 'app/shared/models/commonModels';
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { TrangThai, ApiResultOfBoolean, ApiResultOfString } from 'app/api-lpm-client';
import { clone } from 'lodash';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ModalService } from 'app/shared/services/modal.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from 'app/shared/base/base.component';
import { AppFormComponent } from '../components/forms/components/form';
export abstract class FormBaseComponent<TViewModel> extends BaseComponent {
    @ViewChild(AppFormComponent)
    protected appFormComponent: AppFormComponent;
    @ViewChild(DatatableComponent) table: DatatableComponent;

    // ===== Begin Declare Variables =====

    @ViewChild('formTemplate', { static: true }) formTemplate: TemplateRef<any>;

    listStatus: IOption[] = [
        { key: TrangThai.Active, value: 'Hoạt động', selected: true },
        { key: TrangThai.DeActive, value: 'Không hoạt động' },
    ];

    public trangThaiEnum: typeof TrangThai = TrangThai;

    // Data table
    pageSizeOptions: number[] = PagingDefault.pageSizeOptions;

    tableFormOptions: IAppTableOptions<TViewModel>;
    tableColumnsShowOnGrid: ITableColumn[];

    currentEditingRowId: string;
    rowdata: any;
    // filter
    searchChangeObserver;
    searchKeyword: string = "";
    dateFormat: string = DateFormat.Ngay;
    ngayGioPhutGiayFormat: string = DateFormat.NgayGioPhutGiay;
    ngayGioPhutFormat: string = DateFormat.NgayGioPhut;
    basePermission: BasePermission;

    getDataCallBack: (searchKeyword: string, pageIndex: number) => any;
    deleteCallBack: (id: string | null | undefined) => Observable<ApiResultOfBoolean>;
    createCallBack: (command: TViewModel) => Observable<ApiResultOfString>;
    editCallBack: (command: TViewModel, idToUpdate: string | null | undefined) => Observable<ApiResultOfString>;
    // ===== End Declare Variables =====

    // ===== Begin Init =====
    constructor(
        protected modalService: ModalService,
        public toastr: ToastrService,
        private cd: ChangeDetectorRef,
        private translate: TranslateService
    ) {
        super(translate);
        this.currentEditingRowId = '';
        this.registerCallBackFunctions();
    }

    abstract registerCallBackFunctions();

    async ngOnBaseInit(loadDataImmediately: boolean = true) {
        this.tableColumnsShowOnGrid = this.tableFormOptions.columns?.filter(f => f.fieldViewHidden == null || f.fieldViewHidden == false);
        this.languageData = await this.getTranslationData();
        if (loadDataImmediately) {
            this.getDataCallBack(this.searchKeyword, PagingDefault.pageIndex);
        }
    }

    mapLanguagePath(module: string, component: string) {
        this.module = module;
        this.component = component;
    }

    // ===== End Init =====

    // ===== Begin Fetch Data =====


    bindDataToTable(res) {
        if (!res.isError) {
            this.tableFormOptions.rows = res.data.items;
            this.tableFormOptions.pagingOption.totalCount = res.data.totalCount;
            this.tableFormOptions.pagingOption.totalPages = res.data.totalPages;
            // Whenever the filter changes, always go back to the first page
            this.table.offset = this.tableFormOptions.pagingOption.pageIndex - 1;
            this.cd.markForCheck();
        }
    }

    clearDataTable() {
        this.tableFormOptions.rows = [];
        this.tableFormOptions.pagingOption.totalCount = 0;
        this.tableFormOptions.pagingOption.totalPages = 0;
        this.table.offset = 0;
        this.cd.markForCheck();
    }


    // ===== End Fetch Data =====

    // ===== Begin Handle Business Logic =====

    async create() {
        this.languageData = await this.getTranslationData();
        this.createOrEdit()
            .then(() => {
                this.getDataCallBack(this.searchKeyword, PagingDefault.pageIndex);
                this.toastr.success(this.languageData.COMMON.defaultMessageInformation.createdSuccess);
            }, () => { });
    }

    async edit(row, rowIndex, event) {
        this.rowdata = row;
        this.languageData = await this.getTranslationData();
        // Form Template
        event.target.closest('datatable-body-cell').blur();
        this.createOrEdit(row, rowIndex)
            .then(() => {
                this.getDataCallBack(this.searchKeyword, PagingDefault.pageIndex);
                this.toastr.success(this.languageData.COMMON.defaultMessageInformation.editedSuccess);
            }, () => { });
    }

    async delete(row, event, idField = 'id') {
        this.languageData = await this.getTranslationData();
        event.target.closest('datatable-body-cell').blur();
        this.modalService.warn({
            title: this.languageData.COMMON.defaultTitle.confirm,
            message: this.languageData.COMMON.defaultMessageInformation.deletedConfirm,
            okLabel: this.languageData.COMMON.defaultButtonLabel.Ok,
            cancelLabel: this.languageData.COMMON.defaultButtonLabel.Close
        }).then(() => {
            this.deleteCallBack(row[idField]).subscribe((res) => {
                if (!res.isError) {
                    this.getDataCallBack(this.searchKeyword, PagingDefault.pageIndex);
                    this.toastr.success(this.languageData.COMMON.defaultMessageInformation.deletedSuccess);
                }
                else {
                    this.toastr.warning(res.message);
                }
            });
        }, () => { });
    }

    private createOrEdit(row = null, rowIndex = null): Promise<any> {
        this.currentEditingRowId = row?.id;
        const title = row ? this.languageData[this.module][this.component].editingTitle : this.languageData[this.module][this.component].addingTitle;
        const fields = (this.tableFormOptions.columns)
            .filter(f => f.fieldType
                && (row ? (f.fieldEditHidden == null || f.fieldEditHidden == false) : (f.fieldCreateHidden == null || f.fieldCreateHidden == false)))
            .map(x => {
                const field: IFieldConfig = {
                    name: x.prop.toString(),
                    type: x.fieldType,
                    label: this.languageData[this.module][this.component][x.headerTemplate],
                    validation: x.fieldValidations,
                    options: x.fieldOptions,
                    patternValue: x.fieldType === FieldTypes.Textbox ? x.fieldPatternValue : RegexTypes.Default,
                    templateReference: x.fieldTemplateReference,
                    onChange: x.onChange
                };
                return field;
            });
        const buttonLabel = this.languageData.COMMON.defaultButtonLabel.save;
        fields.push({
            name: 'button',
            type: FieldTypes.Button,
            label: buttonLabel,
            onSubmit: row ? update.bind(this) : create.bind(this)
        });

        function update(form) {

            if (form.valid) {
                var command = form.value as TViewModel;
                this.editCallBack(command, row.id)
                    .subscribe(res => {
                        if (!res.isError) {
                            this.modalService.close();
                        }
                        else {
                            this.toastr.warning(res.message);
                            this.getDataCallBack(this.searchKeyword, PagingDefault.pageIndex);
                        }
                    });
            }
        }

        function create(form) {
            if (form.valid) {
                var command = <TViewModel>form.value;
                this.createCallBack(command)
                    .subscribe(res => {
                        if (!res.isError) {
                            this.modalService.close();
                        }
                        else {
                            this.toastr.warning(res.message);
                        }
                    });
            }
        }

        const template = clone(<any>this.formTemplate);
        //Gán giá trị default cho các field.
        if (row) {
            template.data = { formConfig: fields, formModel: (row) };
        }
        else {
            let createRow = <TViewModel>{};
            template.data = { formConfig: fields, formModel: (createRow) };
        }

        return this.modalService.open({
            title,
            template,
        });

    }

    updateLimit(event) {
        this.tableFormOptions.pagingOption.pageSize = event.target.value;
        this.getDataCallBack(this.searchKeyword, PagingDefault.pageIndex);
    }

    // ===== End Handle Business Logic =====

    onSearchChange(searchValue: string) {

        if (!this.searchChangeObserver) {

            Observable.create(observer => {

                this.searchChangeObserver = observer;

            }).pipe(debounceTime(500)) // wait 500ms after the last event before emitting last event

                .pipe(distinctUntilChanged()) // only emit if value is different from previous value

                .subscribe(newText => {

                    const val = newText.toLowerCase();
                    this.getDataCallBack(val, PagingDefault.pageIndex);
                });

        }

        this.searchChangeObserver.next(searchValue);

    }

}
