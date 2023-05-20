import { ChangeDetectorRef, Component, Injectable, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import * as _moment from 'moment';
import { HoSoKhaiThacViewModel, InputSearchHoSoKhaiThacViewModel } from 'app/shared/models/cadas/storage/ho-so-khai-thac-viewmodel';
import { PagingViewmodel } from 'app/shared/models/common/atom/paging-viewmodel';
import { DanhMucService } from 'app/shared/services/danh-muc.service';
import { HoSoKhaiThacService } from 'app/shared/services/ho-so-khai-thac.service';
import { AuthService } from 'app/shared/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '-';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }
}

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }
}

@Component({
    selector: 'app-utilitys',
    templateUrl: './utilitys.component.html',
    styleUrls: ['./utilitys.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
      {provide: NgbDateAdapter, useClass: CustomAdapter},
      {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
    ]
})
export class UtilitysComponent implements OnInit {

  d1: any;
  d2: any;
  tungay = "";
  denngay = "";
  maHoSo: string = "";
  // row data
  public rows: Array<HoSoKhaiThacViewModel> = [];
  page: PagingViewmodel<HoSoKhaiThacViewModel> = { pageIndex: 1, pageSize: 20, totalCount: 0, totalPages: 0, towModify: 0, items: [], hasNextPage: false, hasPreviousPage: false };
  public ColumnMode = ColumnMode;
  columns = [{ prop: 'id',  name: 'id' }, { name: 'maphieumuon' }, { name: 'tieude', sortable: false }];
  selectedLoaiPhieu: any;
  listLoaiPhieu = [
    { value: -1,  text: 'Tất cả' },
    { value: 1,  text: 'Phiếu trực tuyến' },
    { value: 0,  text: 'Phiếu giấy' },
  ];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;
  @ViewChild('tableResponsive') tableResponsive: any;

  public chkBoxSelected = [];
  public SelectionType = SelectionType;

  constructor(private cd: ChangeDetectorRef,
    private _router: Router,
    private danhMucService: DanhMucService,
    private hoSoKhaiThacService: HoSoKhaiThacService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    public toastr: ToastrService) {
    this.page.pageIndex = 0;
    this.page.pageSize = 20;
  }

  /**
   * filterUpdate
   *
   * @param code
   */
  filterUpdate(event) {
    const val = event.target.value.toLowerCase();


    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  /**
   * rowDetailsToggleExpand
   *
   * @param row
   */
  rowDetailsToggleExpand(row) {
    this.tableRowDetails.rowDetail.toggleExpandRow(row);
  }
  aa(){
  }

  /**
   * toggleExpandRowResponsive
   *
   * @param row
   */
  toggleExpandRowResponsive(row) {
    this.tableResponsive.rowDetail.toggleExpandRow(row);
  }

  /**
   * customChkboxOnSelect
   *
   * @param { selected }
   */
  customChkboxOnSelect({ selected }) {

  }


  /**
   * Creates an instance of cms post component.
   * @param _router
   */


  /**
   * On init
   */
  ngOnInit() {
    this.selectedLoaiPhieu = this.listLoaiPhieu[0];
    this.timKiemHoSo();
  }


  public convertDateServerToString(date: any, strFormat: string) {
    if (date) {
      if (date.toString().indexOf('T') > -1 && date.toString().indexOf('Z') === -1) {
        date = date.toString() + 'Z';
      }
      let dateString;
      if (strFormat) {
        dateString = _moment(date).format(strFormat);
      } else {
        dateString = _moment(date).toDate();
      }
      return dateString;
    } else {
      return '';
    }
  }

  approveRequest(id : string){
   this._router.navigate(['back-office/reg-form-list-request-to-approve/reg-form-approve-request/' + id]);
  }

  viewDetailRequest(id : string){
     this._router.navigate(['back-office/reg-form-list-request-to-approve/reg-form-view-detail-request/' + id]);
  }
  editCmsPost(){}

  async setPage(pageInfo: { count?: number, pageSize?: number, limit?: number, offset?: number }) {
    const pageNumber = pageInfo.offset + 1;
    const pageSize = pageInfo.pageSize;

    this.loadHoSo(pageSize, pageNumber);
  };

  async timKiemHoSo() {
    this.page.pageIndex  = 0;
    const pageNumber = this.page.pageIndex + 1;
    const pageSize = this.page.pageSize;

    this.loadHoSo(pageSize, pageNumber);
  }

  loadHoSo(pageSize: number, pageNumber: number) {
    let user = this.authService.userValue;
    let hinhThucHoSo : number = null;
    if(this.selectedLoaiPhieu.value != -1)
    {
      hinhThucHoSo = this.selectedLoaiPhieu.value;
    }
    let input: InputSearchHoSoKhaiThacViewModel = {
      maHoSo : this.maHoSo,
      tenDangNhapNguoiLapHoSo : null,
      tenDangNhapNguoiDuyet: user.id_token_claims_obj.tenDangNhap,
      hinhThucHoSo : hinhThucHoSo,
      trangThaiHoSo : 1,
      pageIndex: pageNumber,
      pageSize: pageSize,
      lstTrangThaiHoSo :null
    }
    this.hoSoKhaiThacService.searchDanhSachHoSoKhaiThacPagingForNguoiDuyetByCurrentUser(input).pipe()
      .subscribe({
        next: data => {
          if(data == null || data.data == null || data.data.items == null || data.data.items.length == 0){
            this.toastr.warning('Không tìm thấy hồ sơ theo điều kiện tìm kiếm');
            this.page = { pageIndex: 0, pageSize: 20, totalCount: 0, totalPages: 0, towModify: 0, items: [], hasNextPage: false, hasPreviousPage: false };
            this.rows = [];
            this.cd.markForCheck();
            return;
          }
          this.page = data.data;
          if (this.page.pageIndex) {
            this.page.pageIndex = this.page.pageIndex - 1;
          }

          this.rows = data.data.items;
          this.rows = [...this.rows];
          this.cd.markForCheck();
        },
        error: error => {

        }
      });
  }

}