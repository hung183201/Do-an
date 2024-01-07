import { Component, OnInit, Input, ViewChild, ChangeDetectorRef, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import * as _moment from 'moment';
import { ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Hotel, HotelManageClient, HotelRequest, HotelViewModel, RoomTypeClient, RoomTypeViewModel, TrangThai } from 'app/api-client';
import { IAppTableOptions, IOption, ITableColumn, Paging, PagingDefault, } from 'app/shared/model/commonModels';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'app/shared/services/modal.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
    selector: 'app-addoredit-roomtype',
    templateUrl: './addoredit-roomtype.component.html',
    styleUrls: ['./addoredit-roomtype.component.scss'],
    encapsulation: ViewEncapsulation.None,
})


export class AddOrEditRoomTypeComponent implements OnInit {
    showFormAdd: boolean = true;
    errorTenkhachSan: boolean = false;
    errorDiachi: boolean = false;
    note: string;
    public myForm: FormGroup;
    public messErrorTenkhachSan: string = "";
    public messErrorDiachi: string = "";
    public typeAction: string = "";
    nameHotel: string = "";
    public selectedFilterStatus: any;

    public optionsStatus = [
        { id: 0, name: 'Tạm dừng', value: 'Tạm dừng' },
        { id: 1, name: 'Hoạt động', value: 'Hoạt động' },
    ];
    public id: number;
    constructor(private fb: FormBuilder,
        public activeModal: NgbActiveModal,
        public toastr: ToastrService,
        private changeDetectorRef: ChangeDetectorRef,
        translate: TranslateService,
        public hotelManageClient: HotelManageClient,
      private roomTypeClient: RoomTypeClient,
      ) {

        this.myForm = this.fb.group({
            tenkhachsan: [],
            diachi: [],
            note: [],
            status: [],
            price: [],
            totalBed:[]
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
        this.roomTypeClient.add(new RoomTypeViewModel({
            id : 1, 
            nameRoomType : formData.tenkhachsan,
            price : formData.price,
            maxPeople : formData.diachi,
            totalBed : formData.totalBed,
            idHotel : 1,
            status : formData.status.id,
            // categoryHotel : 1,
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
        this.hotelManageClient.edit(new HotelViewModel({
            id : this.id,
            nameHotel : formData.tenkhachsan,
            address : formData.diachi,
            note :  formData.note,
            status : formData.status.id,
            categoryHotel : 1,
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
        await this.hotelManageClient.getById(this.id).subscribe(res => {
            if (!res.isError) {
                if(res.data.status == 0){
                    this.selectedFilterStatus = { id: 0, name: 'Tạm dừng', value: 'Tạm dừng' }
                }else  {this.selectedFilterStatus = { id: 1, name: 'Hoạt động', value: 'Hoạt động' }}
                 
                this.myForm.get('tenkhachsan')?.setValue(res.data.nameHotel);
                this.myForm.get('diachi')?.setValue(res.data.address);
                this.myForm.get('note')?.setValue(res.data.note);
            }
        })
        this.changeDetectorRef.markForCheck();
    }

    validateFormData() {
        var formData = this.myForm.getRawValue();
    
        if (formData.tenkhachsan == null) {
          this.errorTenkhachSan = true;
          this.messErrorTenkhachSan = "tên không được bỏ trống";
          return false;
        }
    
        if (formData.diachi == null) {
          this.errorDiachi = true;
          this.messErrorDiachi = "Địa chỉ không được bỏ trống";
          return false;
        }
      }

}

