import { Component, OnInit, Input, ViewChild, ChangeDetectorRef, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import * as _moment from 'moment';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  Hotel, HotelManageClient, HotelRequest, RoomType, RoomTypeClient, RoomtypeRequest, TrangThai } from 'app/api-client';
import {  IAppTableOptions,  IOption, ITableColumn, Paging, PagingDefault,  } from 'app/shared/model/commonModels';
import { Validators } from '@angular/forms';
import { ModalService } from 'app/shared/services/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { AddOrEditRoomTypeComponent } from './addoredit-roomtype/addoredit-roomtype.component';


@Component({
  selector: 'app-roomtype',
  templateUrl: './roomtype.component.html',
  styleUrls: ['./roomtype.component.scss', '../../../../assets/sass/libs/datatables.scss'],
  encapsulation: ViewEncapsulation.None,
})


export class RoomTypeComponent implements OnInit {
    @ViewChild('tableRowDetails') tableRowDetails: any;

    active = 1; // Basic Navs
    public rows: Array<any> = [];
    public ColumnMode = ColumnMode;
    public closeResult: string;
    intervalId: any;
    public errorMessage: string =null;
    tableFormOptions: IAppTableOptions<any>;
    public hotelViewModel : RoomType = null;
    searchKeyword : string = "";
    tableColumnsShowOnGrid: ITableColumn[];
    
    listStatus: IOption[] = [
        { key: TrangThai.Active, value: 'Hoạt động', selected: true },
        { key: TrangThai.DeActive, value: 'Không hoạt động' },
    ];

    currentEditingRowId: string;
    
    @ViewChild(DatatableComponent) table: DatatableComponent;

    constructor(
      private cd: ChangeDetectorRef,
      private _router: Router,
      private modalService: ModalService,
      private roomTypeClient: RoomTypeClient,
      public toastr: ToastrService,
      private pureModalService: NgbModal,

      private translate: TranslateService) { }


    ngOnInit() {
        this.tableFormOptions = {
            pagingOption: new Paging(),
            columnMode: ColumnMode.force,
            columns: [
                {
                    prop: 'nameRoomType', name: 'Tên phòng', headerTemplate: 'nameRoomType',width:10
                },
                {
                    prop: 'price', name: 'Giá', headerTemplate: 'price',width:10
                },
                {
                    prop: 'size', name: 'Size', headerTemplate: 'size',width:10
                },
                {
                    prop: 'maxPeople', name: 'Số người max', headerTemplate: 'maxPeople',width:10
                },
                {
                    prop: 'totalBed', name: 'Số gường chính', headerTemplate: 'totalBed',width:10
                },
                {
                    prop: 'statusName', name: 'Trạng thái', headerTemplate: 'statusName',width:10
                },
            ]
        };
        this.tableColumnsShowOnGrid = this.tableFormOptions.columns?.filter(f => f.fieldViewHidden == null || f.fieldViewHidden == false);

        this.loadData(this.searchKeyword, PagingDefault.pageIndex);
    }
  
    
   
    getCustomClassByColumn(columnName, trangThaiValue = undefined): string {
        if (columnName == 'Trạng thái') {
            if (trangThaiValue == 0) return "badge bg-light-danger";
            if (trangThaiValue == 1) return "badge bg-light-success";
        }
    }
  
    loadData(searchKeyWord, newPageIndex?) {
        this.searchKeyword = searchKeyWord;
        this.tableFormOptions.pagingOption.pageIndex = newPageIndex ?? PagingDefault.pageIndex;
        this.roomTypeClient.search(new RoomtypeRequest({
            fullTextSearch: this.searchKeyword,
            pageNumber: this.tableFormOptions.pagingOption.pageIndex,
            pageSize: this.tableFormOptions.pagingOption.pageSize

        })).subscribe(res => {
            if (!res.isError) {
                this.tableFormOptions.rows = res.data.items;
                this.tableFormOptions.pagingOption.totalCount = res.data.totalCount;
                this.tableFormOptions.pagingOption.totalPages = res.data.totalPages;
                this.table.offset = this.tableFormOptions.pagingOption.pageIndex - 1;
                for (var i = 0; i < this.tableFormOptions.rows.length; i++) {
                    this.tableFormOptions.rows[i].STT = i + 1;
                  }
                this.cd.markForCheck();
            }
        });
       
    }
  
  
    async delete(row, event) {
        if(confirm("Bạn có muốn xóa hồ sơ này không? ")) {
            this.roomTypeClient.delete(row.id).subscribe((res: any) => {
              if (!res.isError) {
                this.toastr.success('Xóa thông tin thành công');
              }
              else {
                this.toastr.error('Xóa thông tin thành công' + res.message);
              }
            });
          }
    }
    async create (){
        const modalRef = this.pureModalService.open(AddOrEditRoomTypeComponent, { size: 'lg', backdrop: 'static' });
        modalRef.result.then(() => {
          this.ngOnInit();
        }).catch((error) => {
        });
    }
    async edit(id: number){
        const modalRef = this.pureModalService.open(AddOrEditRoomTypeComponent, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.showFormAdd =false;
        modalRef.componentInstance.id =id;
        modalRef.result.then(() => {
          this.ngOnInit();
        }).catch((error) => {
        });
    }
    
  }

  