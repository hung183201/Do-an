import { Component, OnInit, Input, ViewChild, ChangeDetectorRef, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import * as _moment from 'moment';
import { ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Hotel, HotelManageClient, HotelRequest, HotelViewModel, TrangThai, UtilityManageClient, UtilityViewModel } from 'app/api-client';
import { IAppTableOptions, IOption, ITableColumn, Paging, PagingDefault, } from 'app/shared/model/commonModels';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'app/shared/services/modal.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
    selector: 'app-utilitycreateorupdate',
    templateUrl: './createorupdate-utility.component.html',
    styleUrls: ['./createorupdate-utility.component.scss'],
    encapsulation: ViewEncapsulation.None,
})


export class UtilityCreatOrUpdateComponent implements OnInit {
    showFormAdd: boolean = true;
    errortentienich: boolean = false;
    errorDiachi: boolean = false;
    note: string;
    public myForm: FormGroup;
    public messErrortentienich: string = "";
    public messErrorDiachi: string = "";
    public typeAction: string = "";
    nameHotel: string = "";
    public selectedFilterStatus: any;
    public selectedFilterutilitiesType: any;
    public optionsStatus = [
        { id: 0, name: 'Tạm dừng', value: 'Tạm dừng' },
        { id: 1, name: 'Hoạt động', value: 'Hoạt động' },
    ];
    public optionsutilitiesType = [
        { id: 0, name: 'Tiện ích phòng', value: 'Tiện ích phòng' },
        { id: 1, name: 'Tiện ích khách sạn', value: 'Tiện ích khách sạn'},
    ];
    public id: number;
    constructor(private fb: FormBuilder,
        public activeModal: NgbActiveModal,
        public toastr: ToastrService,
        private changeDetectorRef: ChangeDetectorRef,
        translate: TranslateService,
        public utilityManageClient: UtilityManageClient) {

        this.myForm = this.fb.group({
            tentienich: [],
            status: [],
            utilitiesType: []
        });
    }

    ngOnInit(): void {
        if (!this.showFormAdd) {
            this.getThongTinHoSo();
        }
    }

    create() {
        var formData = this.myForm.getRawValue();
        console.log(formData);
        this.validateFormData()
        this.utilityManageClient.add(new UtilityViewModel({
            nameUtilities : formData.tentienich,
            status : formData.status.id,
            utilitiesType : formData.utilitiesType.id,
        })).subscribe(res => {
            if(!res.isError && res.data){
                this.activeModal.close('Cross click');
                this.toastr.success('Thêm mới thành công');
            }
            else{
                this.toastr.warning(res.message);
            }
        })
    }

    update(){
        var formData = this.myForm.getRawValue();
        this.validateFormData()
        this.utilityManageClient.edit(new UtilityViewModel({
            id : this.id,
            nameUtilities : formData.tentienich,
            status : formData.status.id,
            utilitiesType : formData.utilitiesType.id,
        })).subscribe(res => {
            if(!res.isError && res.data){
                this.activeModal.close('Cross click');
                this.toastr.success('Cập nhật thành công');
            }
            else{
                this.toastr.warning(res.message);
            }
        })
    }
    async getThongTinHoSo() {
        await this.utilityManageClient.getById(this.id).subscribe(res => {
            if (!res.isError) {
                if(res.data.status == 0){
                    this.selectedFilterStatus = { id: 0, name: 'Tạm dừng', value: 'Tạm dừng' }
                }else {this.selectedFilterStatus = { id: 1, name: 'Hoạt động', value: 'Hoạt động' }} 
                if(res.data.utilitiesType == 0){
                    this.selectedFilterutilitiesType = { id: 0, name: 'Tiện ích phòng', value: 'Tiện ích phòng' }
                }else  {this.selectedFilterutilitiesType =   { id: 1, name: 'Tiện ích khách sạn', value: 'Tiện ích khách sạn'}}
                 this.myForm.get('tentienich')?.setValue(res.data.nameUtilities);
            }
        })
        this.changeDetectorRef.markForCheck();
    }

    validateFormData() {
        var formData = this.myForm.getRawValue();
    
        if (formData.tentienich == null) {
          this.errortentienich = true;
          this.messErrortentienich = "tên không được bỏ trống";
          return false;
        }
      }

}

