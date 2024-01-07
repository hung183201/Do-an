import { Component, OnInit, Input, ViewChild, ChangeDetectorRef, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import * as _moment from 'moment';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Hotel, HotelManageClient, HotelRequest, TrangThai } from 'app/api-client';
import { IAppTableOptions, IOption, ITableColumn, Paging, PagingDefault, } from 'app/shared/model/commonModels';
import { Validators } from '@angular/forms';
import { ModalService } from 'app/shared/services/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { HotelCreatOrUpdateComponent } from './createorupdate-hotel/createorupdate-hotel.component';
import { HotelUtilityGroupComponent } from './hotel-utility-group/hotel-utility-group.component';


@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss', '../../../../assets/sass/libs/datatables.scss'],
  encapsulation: ViewEncapsulation.None,
})


export class HotelComponent implements OnInit {
  @ViewChild('tableRowDetails') tableRowDetails: any;

  active = 1; // Basic Navs
  public rows: Array<any> = [];
  public ColumnMode = ColumnMode;
  public closeResult: string;
  intervalId: any;
  public errorMessage: string = null;
  tableFormOptions: IAppTableOptions<any>;
  @Input() idXa: string = null;
  @Input() showFormUpdateTaiLieuDinhKem: boolean = false;
  public hotelViewModel: Hotel = null;
  public hotelRequest: HotelRequest = null;
  searchKeyword: string = "";
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
    private hotelManageClient: HotelManageClient,
    public toastr: ToastrService,
    private pureModalService: NgbModal,

    private translate: TranslateService) { }


  ngOnInit() {
    this.tableFormOptions = {
      pagingOption: new Paging(),
      columnMode: ColumnMode.force,
      columns: [
        {
          prop: 'nameHotel', name: 'Tên khách sạn', headerTemplate: 'nameHotel', width: 10
        },
        {
          prop: 'address', name: 'Địa chỉ', headerTemplate: 'address', width: 10
        },
        {
          prop: 'note', name: 'Mô tả', headerTemplate: 'note', width: 10
        },
        {
          prop: 'categoryHotel', name: 'Loại khách sạn', headerTemplate: 'categoryHotel', width: 10
        },
        {
          prop: 'statusName', name: 'Trạng thái', headerTemplate: 'statusName', width: 10
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
    this.hotelManageClient.search(new HotelRequest({
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


  // This function is used in open
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  async delete(row, event) {
    if (confirm("Bạn có muốn xóa hồ sơ này không? ")) {
      this.hotelManageClient.delete(row.id).subscribe((res: any) => {
        if (!res.isError) {
          this.toastr.success('Xóa thông tin thành công');
        }
        else {
          this.toastr.error('Xóa thông tin thành công' + res.message);
        }
      });
    }
  }
  async create() {
    const modalRef = this.pureModalService.open(HotelCreatOrUpdateComponent, { size: 'lg', backdrop: 'static' });
    modalRef.result.then(() => {
      this.ngOnInit();
    }).catch((error) => {
    });
  }
  async edit(id: number) {
    const modalRef = this.pureModalService.open(HotelCreatOrUpdateComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.showFormAdd = false;
    modalRef.componentInstance.id = id;
    modalRef.result.then(() => {
      this.ngOnInit();
    }).catch((error) => {
    });
  }

  async GanChuNang(id: number){
    const modalRef = this.pureModalService.open(HotelUtilityGroupComponent, { size: 'xl', backdrop: 'static' });
    modalRef.componentInstance.showFormAdd =false;
    modalRef.componentInstance.hotelId =id;
    modalRef.result.then(() => {
      this.ngOnInit();
    }).catch((error) => {
    });
  }

}

