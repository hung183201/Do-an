import { async } from '@angular/core/testing';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef, Component, Injectable, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct, ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { HoSoLuuTruViewModel, InputSearchHoSoLuuTruViewModel } from 'app/shared/models/cadas/storage/ho-so-luu-tru-viewmodel';
import { HuyenViewModel, XaViewModel } from 'app/shared/models/common/atom/don-vi-hanh-chinh-viewmodel';
import { PagingViewmodel } from 'app/shared/models/common/atom/paging-viewmodel';
import { DanhMucService } from 'app/shared/services/danh-muc.service';
import { HoSoLuuTruService } from 'app/shared/services/ho-so-luu-tru.service';
import * as _moment from 'moment';
import { AuthService } from 'app/shared/auth/auth.service';
import { HoSoKhaiThacService } from 'app/shared/services/ho-so-khai-thac.service';
import { HoSoKhaiThacThanhPhanHoSoViewModel } from 'app/shared/models/cadas/storage/ho-so-khai-thac-thanh-phan-ho-so-viewmodel';
import { HoSoKhaiThacViewModel } from 'app/shared/models/cadas/storage/ho-so-khai-thac-viewmodel';
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '-';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
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
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }
}
@Component({
  selector: 'app-reg-form-search-by-request',
  templateUrl: './reg-form-search-by-request.component.html',
  styleUrls: ['./reg-form-search-by-request.component.scss', '../../../../../assets/sass/libs/datatables.scss', '../../../../../assets/sass/libs/datepicker.scss',],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})
export class RegFormSearchByRequestComponent implements OnInit {
  xaDisabled: boolean = true;
  public id: any;
  mahuyen: number = 0;
  maxa: number = 0;
  madonvihinhthanhphong: any = "none";
  madonviluutru: any = "none";
  public listDataXoaHoSo: any;
  d1: any;
  d2: any;
  tungay = { year: 2022, month: 7, day: 17 };
  denngay = { year: 2022, month: 7, day: 17 };

  maHoSo: string = "";
  soTaiLieu: string = "";
  tenHoSo: string = "";
  soTo: string = "";
  soThua: string = "";
  public xaId: string = "";
  public listXaPhuong: any;
  public optionsXaPhuong: any;
  public listKhoPhong: any;
  public optionsKhoPhong: any;
  public listGiaTu: any;
  public optionsGiaTu: any;
  public listTangNgan: any;
  public optionsTangNgan: any;
  public listHop: any;
  public optionsHop: any;
  public listLoaiHoSo: any;
  public listDataLoaiHoSo: any;
  public optionsLoaiHoSo: any;
  public paramsFromUrl: any;
  public closeResult: string;
  public valueUrlSearch: string = '';
  public idHoSoLuuTru: string = null;
  public myForm: FormGroup;

  lstHuyen: HuyenViewModel[];
  lstXa: XaViewModel[];
  // row data
  public rows: Array<HoSoLuuTruViewModel> = [];
  page: PagingViewmodel<HoSoLuuTruViewModel> = { pageIndex: 1, pageSize: 20, totalCount: 0, totalPages: 0, towModify: 0, items: [], hasNextPage: false, hasPreviousPage: false };
  public ColumnMode = ColumnMode;
  columns = [{ prop: 'id', name: 'id' }, { name: 'maphieumuon' }, { name: 'tieude', sortable: false }];

  public valuesSave: any = JSON.parse(localStorage.getItem("OauthService"));
  public quyenAdd: any[] = [
    '14050', '14051', '14052', '14053', '14054', '14055', '14056', '14057', '14059', '14060', '14061', '14062', '14063', '14064', '14065', '14066', '14067', '14068'
  ];
  public quyenEdit: any[] = [
    '14059', '14060', '14061', '14062', '14063', '14064', '14065', '14066', '14067', '14068'
  ];
  public quyenDelete: any[] = [
    '14069'
  ];
  public arrDiaBanXaPhuong: any[] = [];
  public xaIds: any[] = [];
  public showActionTheoQuyenAdd: boolean = false;
  public showActionTheoQuyenEdit: boolean = false;
  public showActionTheoQuyenDelete: boolean = false;

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;
  @ViewChild('tableResponsive') tableResponsive: any;

  public chkBoxSelected = [];
  public SelectionType = SelectionType;

  /**
     * Creates an instance of cms post component.
     * @param _router
     */
  constructor(
    private cd: ChangeDetectorRef,
    private _router: Router,
    private danhMucService: DanhMucService,
    private hoSoLuuTruService: HoSoLuuTruService,
    private hoSoKhaiThacService: HoSoKhaiThacService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private modalService: NgbModal,
    public toastr: ToastrService,
    private fb: FormBuilder,
  ) {
    this.page.pageIndex = 0;
    this.page.pageSize = 20;
    this.myForm = this.fb.group({
      infoKhoPhong: [],
      infoGiaTu: [],
      infoTangNgan: [],
      infoHop: [],
      infoHuyen: [],
      infoXa: [],
      maHoSo: [],
      soTaiLieu: [],
      soThua: [],
      soTo: [],
      infoLoaiHoSo: [],
      tenHoSo: [],
    });
  }

  /**
 * On init
 */
  async ngOnInit() {

    var quyenUser = this.valuesSave.id_token_claims_obj.quyens;
    var arrAdd = [];
    var arrEdit = [];
    var arrDelete = [];
    arrAdd = quyenUser.filter(value => this.quyenAdd.includes(value));
    arrEdit = quyenUser.filter(value => this.quyenEdit.includes(value));
    arrDelete = quyenUser.filter(value => this.quyenDelete.includes(value));

    if (arrAdd.length > 0) {
      this.showActionTheoQuyenAdd = true;
    } else {
      this.showActionTheoQuyenAdd = false;
    }
    if (arrEdit.length > 0) {
      this.showActionTheoQuyenEdit = true;
    } else {
      this.showActionTheoQuyenEdit = false;
    }
    if (arrDelete.length > 0) {
      this.showActionTheoQuyenDelete = true;
    } else {
      this.showActionTheoQuyenDelete = false;
    }


    await this.loadQuanHuyen();
    await this.disableFormXa();
    await this.disableFormGiaTu();
    await this.disableFormTangNgan();
    await this.disableFormHop();
    await this.getDanhSachKhoPhong();
    await this.getDanhSachLoaiTuLieu();

    this.paramsFromUrl = this.activatedRoute.snapshot.queryParams;

    if (Object.keys(this.paramsFromUrl).length > 0) {
      await this.mapDataSearch();
      await this.loadHoSo(this.page.pageSize, this.page.pageIndex + 1);
    } else {
      await this.timKiemHoSo();
    }



  }

  //thông báo xóa thành công
  alertXoaThanhCong() {
    this.toastr.success('Xóa hồ sơ thành công', 'Thành công', { "progressBar": true });
  }

  //thông báo xóa thất bại
  alertXoaError(data) {
    this.toastr.error(data, 'Thất bại', { "progressBar": true });
  }

  // Open modal confirm
  open(content, id) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    this.idHoSoLuuTru = id;
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
  aa() {
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

  approveRequest() {
    this._router.navigate(['back-office/reg-form-list-request-to-approve/reg-form-approve-request']);
  }
  viewDetailRequest() {
    this._router.navigate(['back-office/reg-form-list-request-to-approve/reg-form-view-detail-request']);
  }


  async setPage(pageInfo: { count?: number, pageSize?: number, limit?: number, offset?: number }) {

    const pageNumber = pageInfo.offset + 1;
    const pageSize = pageInfo.pageSize;

    this.loadHoSo(pageSize, pageNumber);
  };

  /* btn tìm kiếm hồ sơ */
  async timKiemHoSo() {
    var formData = this.myForm.getRawValue();
    this.valueUrlSearch = '/back-office/reg-form-search-by-request?';
    this.page.pageIndex = 0;
    const pageNumber = this.page.pageIndex + 1;
    const pageSize = this.page.pageSize;

    if (formData.infoHuyen) {
      this.valueUrlSearch = this.valueUrlSearch + 'maHuyen=' + formData.infoHuyen.maHuyen + '&'
    }
    if (formData.infoXa) {
      this.valueUrlSearch = this.valueUrlSearch + 'maXa=' + formData.infoXa.maXa + '&'
    }
    if (formData.maHoSo) {
      this.valueUrlSearch = this.valueUrlSearch + 'maHoSo=' + formData.maHoSo + '&'
    }
    if (formData.soTaiLieu) {
      this.valueUrlSearch = this.valueUrlSearch + 'soTaiLieu=' + formData.soTaiLieu + '&'
    }
    if (formData.infoKhoPhong) {
      this.valueUrlSearch = this.valueUrlSearch + 'idKhoPhong=' + formData.infoKhoPhong.id + '&'
    }
    if (formData.infoGiaTu) {
      this.valueUrlSearch = this.valueUrlSearch + 'idGiaTu=' + formData.infoGiaTu.id + '&'
    }
    if (formData.infoTangNgan) {
      this.valueUrlSearch = this.valueUrlSearch + 'idTangNgan=' + formData.infoTangNgan.id + '&'
    }
    if (formData.infoHop) {
      this.valueUrlSearch = this.valueUrlSearch + 'idHop=' + formData.infoHop.id + '&'
    }
    if (formData.soThua) {
      this.valueUrlSearch = this.valueUrlSearch + 'soThua=' + formData.soThua + '&'
    }
    if (formData.soTo) {
      this.valueUrlSearch = this.valueUrlSearch + 'soTo=' + formData.soTo + '&'
    }
    if (formData.infoLoaiHoSo) {
      this.valueUrlSearch = this.valueUrlSearch + 'idLoaiHoSo=' + formData.infoLoaiHoSo.id + '&'
    }
    if (formData.tenHoSo) {
      this.valueUrlSearch = this.valueUrlSearch + 'tenHoSo=' + formData.tenHoSo + '&'
    }
    this._router.navigateByUrl(this.valueUrlSearch);
    this.loadHoSo(pageSize, pageNumber);
  }

  /* hàm map dữ liệu đang tìm kiếm */
  async mapDataSearch() {
    if (this.paramsFromUrl.maHuyen != null) {
      for (const item of this.lstHuyen) {
        if (item['maHuyen'] == this.paramsFromUrl.maHuyen) {
          this.myForm?.get('infoHuyen')?.setValue(item);
          await this.enableOrDisableXa();
        }
      };
    }
    if (this.paramsFromUrl.maXa != null) {
      for (const item of this.optionsXaPhuong) {
        if (item['maXa'] == this.paramsFromUrl.maXa) {
          this.myForm?.get('infoXa')?.setValue(item);
        }
      };
    }
    if (this.paramsFromUrl.maHoSo != null) {
      this.myForm?.get('maHoSo')?.setValue(this.paramsFromUrl.maHoSo);
    }
    if (this.paramsFromUrl.soTaiLieu != null) {
      this.myForm?.get('soTaiLieu')?.setValue(this.paramsFromUrl.soTaiLieu);
    }
    if (this.paramsFromUrl.idKhoPhong != null) {
      for (const item of this.optionsKhoPhong) {
        if (item['id'] == this.paramsFromUrl.idKhoPhong) {
          this.myForm?.get('infoKhoPhong')?.setValue(item);
          await this.enableOrDisableGiaTu();
        }
      };
    }
    if (this.paramsFromUrl.idGiaTu != null) {
      for (const item of this.optionsGiaTu) {
        if (item['id'] == this.paramsFromUrl.idGiaTu) {
          this.myForm?.get('infoGiaTu')?.setValue(item);
          await this.enableOrDisableTangNgan();
        }
      };
    }
    if (this.paramsFromUrl.idTangNgan != null) {
      for (const item of this.optionsTangNgan) {
        if (item['id'] == this.paramsFromUrl.idTangNgan) {
          this.myForm?.get('infoTangNgan')?.setValue(item);
          await this.enableOrDisableHop();
        }
      };
    }
    if (this.paramsFromUrl.idHop != null) {
      for (const item of this.optionsHop) {
        if (item['id'] == this.paramsFromUrl.infoHop) {
          this.myForm?.get('infoHop')?.setValue(item);
        }
      };
    }
    if (this.paramsFromUrl.soThua != null) {
      this.myForm?.get('soThua')?.setValue(this.paramsFromUrl.soThua);
    }
    if (this.paramsFromUrl.soTo != null) {
      this.myForm?.get('soTo')?.setValue(this.paramsFromUrl.soTo);
    }
    if (this.paramsFromUrl.idLoaiHoSo != null) {
      for (const item of this.optionsLoaiHoSo) {
        if (item['id'] == this.paramsFromUrl.idLoaiHoSo) {
          this.myForm?.get('infoLoaiHoSo')?.setValue(item);
        }
      };
    }
    if (this.paramsFromUrl.tenHoSo != null) {
      this.myForm?.get('tenHoSo')?.setValue(this.paramsFromUrl.tenHoSo);
    }
  }

  /* xóa hồ sơ lưu trữ */
  async xoaHoSoLuuTru(data) {
    var params = {
      Id: data,
    }

    const rs = await this.hoSoKhaiThacService.deleteHoSoLuuTru(params).toApiPromise();

    if (!rs.success) {
      return;
    }

    this.listDataXoaHoSo = rs.result.data;

    if (this.listDataXoaHoSo.status) {
      this.alertXoaThanhCong();
      this.timKiemHoSo();
    } else {
      this.alertXoaError(this.listDataXoaHoSo.message);
    }
    this.cd.markForCheck();
  }

  /* thêm mới hồ sơ lưu trữ */
  themHoSoLuuTru() {
    var valueUrl = '/back-office/addorupdate-ho-so-luu-tru';
    this._router.navigateByUrl(valueUrl);
  }

  loadHoSo(pageSize: number, pageNumber: number) {
    var formData = this.myForm.getRawValue();

    if (formData.infoHop == null) {
      var idHop = null
    } else {
      var idHop = formData.infoHop.id
    }
    if (formData.infoTangNgan == null) {
      var idTangNgan = null
    } else {
      var idTangNgan = formData.infoTangNgan.id
    }
    if (formData.infoGiaTu == null) {
      var idGiaTu = null
    } else {
      var idGiaTu = formData.infoGiaTu.id
    }
    if (formData.infoKhoPhong == null) {
      var idKhoPhong = null
    } else {
      var idKhoPhong = formData.infoKhoPhong.id
    }
    if (formData.infoLoaiHoSo == null) {
      var idLoaiHoSo = null
    } else {
      var idLoaiHoSo = formData.infoLoaiHoSo.id
    }
    if (formData.infoHuyen != null) {
      if (formData.infoXa == null) {
        this.xaIds = this.optionsXaPhuong.filter(x => x.maXa > 0).map(x => x.id);
      } else {
        this.xaId = formData.infoXa.id;
      }
    }

    let input: InputSearchHoSoLuuTruViewModel = {
      xaGuid: this.xaId,
      xaGuids: this.xaIds,
      maHoSo: formData.maHoSo,
      soTaiLieu: formData.soTaiLieu,
      tenHoSo: formData.tenHoSo,
      soTo: formData.soTo,
      soThua: formData.soThua,
      hopHoSoId: idHop,
      tangNganId: idTangNgan,
      giaKeTuId: idGiaTu,
      khoPhongId: idKhoPhong,
      loaiHoSoLuuTruId: idLoaiHoSo,
      donViLuuTruId: null,
      laGiayMoiNhat: null,
      pageIndex: pageNumber,
      pageSize: pageSize
    }

    this.hoSoLuuTruService.getDanhSachHoSoLuuTruAndComponentByCondition(input).pipe()
      .subscribe({
        next: data => {
          if (data == null || data.data == null || data.data.items == null || data.data.items.length == 0) {
            this.alertXoaError('Không tìm thấy hồ sơ theo điều kiện tìm kiếm')
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

  async loadQuanHuyen() {
    const user = this.authService.userValue;
    await this.danhMucService.getDanhSachHuyen(null, 27)
      .pipe()
      .toPromise().then(data => {
        let lstHuyenCoQuyen = user.id_token_claims_obj.quyenDuLieus.filter(
          (DonViHanhChinhViewModel, i, arr) => arr.findIndex(t => t.maHuyen === DonViHanhChinhViewModel.maHuyen) === i
        ).map(item => item.maHuyen);
        this.lstHuyen = data.filter(item => lstHuyenCoQuyen.includes(item.maHuyen));
        this.cd.markForCheck();
      });

  }

  /* nút clear tìm kiếm */
  async clearTimKiem() {
    this.myForm.reset();
    this.xaId = null;
    this.xaIds = null;
    await this.disableFormXa();
    await this.disableFormGiaTu();
    await this.disableFormTangNgan();
    await this.disableFormHop();
  }

  /* get danh sách xã/phường */
  async getDanhSachXaPhuong() {
    var formData = this.myForm.getRawValue();
    var diaban = this.valuesSave.id_token_claims_obj.quyenDuLieus;
    diaban = diaban.filter(x => x.maHuyen == formData.infoHuyen.maHuyen);
    this.arrDiaBanXaPhuong = diaban.map(({ maXa }) => maXa);

    var params = {
      danhSachMaXa: this.arrDiaBanXaPhuong.toString(),
    };

    const rs = await this.hoSoLuuTruService
      .getDanhSachXaPhuong(params)
      .toApiPromise();

    if (!rs.success) {
      return;
    }

    this.listXaPhuong = rs.result.data;
    this.optionsXaPhuong = this.listXaPhuong.map(({ id, maXa, tenXa }) => ({
      id,
      maXa,
      tenXa,
    }));

    this.cd.markForCheck();
  }

  /* get danh sách Kho/Phòng*/
  async getDanhSachKhoPhong() {
    var params = {};

    const rs = await this.hoSoLuuTruService
      .getDanhSachKhoPhong(params)
      .toApiPromise();

    if (!rs.success) {
      return;
    }

    this.listKhoPhong = rs.result.data;
    this.optionsKhoPhong = this.listKhoPhong.map(({ id, giaTri }) => ({
      id,
      giaTri,
    }));

    this.cd.markForCheck();
  }

  /* get danh sách Giá/Tủ */
  async getDanhSachGiaTu() {
    var formData = this.myForm.getRawValue();
    var params = {
      khoPhongId: formData.infoKhoPhong.id,
    };

    const rs = await this.hoSoLuuTruService
      .getDanhSachGiaTu(params)
      .toApiPromise();

    if (!rs.success) {
      return;
    }

    this.listGiaTu = rs.result.data;
    this.optionsGiaTu = this.listGiaTu.map(({ id, giaTri }) => ({
      id,
      giaTri,
    }));

    this.cd.markForCheck();
  }

  /* get danh sách Tầng/Ngăn */
  async getDanhSachTangNgan() {
    var formData = this.myForm.getRawValue();
    var params = {
      giaKeTuId: formData.infoGiaTu.id,
    };

    const rs = await this.hoSoLuuTruService
      .getDanhSachTangNgan(params)
      .toApiPromise();

    if (!rs.success) {
      return;
    }

    this.listTangNgan = rs.result.data;
    this.optionsTangNgan = this.listTangNgan.map(({ id, giaTri }) => ({
      id,
      giaTri,
    }));

    this.cd.markForCheck();
  }

  /* get danh sách Tầng/Ngăn */
  async getDanhSachHop() {
    var formData = this.myForm.getRawValue();
    var params = {
      tangNganId: formData.infoTangNgan.id,
    };

    const rs = await this.hoSoLuuTruService
      .getDanhSachHop(params)
      .toApiPromise();

    if (!rs.success) {
      return;
    }

    this.listHop = rs.result.data;
    this.optionsHop = this.listHop.map(({ id, giaTri }) => ({ id, giaTri }));

    this.cd.markForCheck();
  }

  /* get danh sách tư liệu */
  async getDanhSachLoaiTuLieu() {
    var paramsId = {
      ma: "HSDC",
    };

    const rs = await this.hoSoLuuTruService
      .getIdLoaiTuLieu(paramsId)
      .toApiPromise();

    if (!rs.success) {
      return;
    }

    this.listDataLoaiHoSo = rs.result.data;
    var id = this.listDataLoaiHoSo.id;

    const rsp = await this.hoSoLuuTruService
      .getDanhSachLoaiTuLieu(id)
      .toApiPromise();
    this.listLoaiHoSo = rsp.result.data;
    this.optionsLoaiHoSo = this.listLoaiHoSo.map(({ id, giaTri }) => ({
      id,
      giaTri,
    }));

    this.cd.markForCheck();
  }

  /* onchange disable/enable xã */
  async enableOrDisableXa() {

    var formData = this.myForm.getRawValue();
    if (formData.infoHuyen == null) {
      this.disableFormXa();
    } else {
      this.disableFormXa();
      this.myForm?.get("infoXa").enable();
      await this.getDanhSachXaPhuong();
    }
  }

  /* onchange disable/enable Giá/Tủ */
  async enableOrDisableGiaTu() {
    var formData = this.myForm.getRawValue();
    if (formData.infoKhoPhong == null) {
      this.disableFormGiaTu();
      this.disableFormTangNgan();
      this.disableFormHop();
    } else {
      this.disableFormGiaTu();
      this.disableFormTangNgan();
      this.disableFormHop();
      this.myForm?.get("infoGiaTu").enable();
      await this.getDanhSachGiaTu();
    }
  }

  /* onchange disable/enable Tầng/Ngăn */
  async enableOrDisableTangNgan() {
    var formData = this.myForm.getRawValue();
    if (formData.infoGiaTu == null) {
      this.disableFormTangNgan();
      this.disableFormHop();
    } else {
      this.myForm?.get("infoTangNgan").enable();
      await this.getDanhSachTangNgan();
    }
  }

  /* onchange disable/enable Hộp */
  async enableOrDisableHop() {
    var formData = this.myForm.getRawValue();

    if (formData.infoTangNgan == null) {
      this.disableFormHop();
    } else {
      this.myForm?.get("infoHop").enable();
      await this.getDanhSachHop();
    }
  }

  /* disable form xã */
  disableFormXa() {
    this.myForm?.get("infoXa").disable();
    this.myForm?.get("infoXa")?.setValue(null);
  }

  /* disable form Giá/Tủ */
  disableFormGiaTu() {
    this.myForm?.get("infoGiaTu").disable();
    this.myForm?.get("infoGiaTu")?.setValue(null);
  }

  /* disable form Tầng/Ngăn */
  disableFormTangNgan() {
    this.myForm?.get("infoTangNgan").disable();
    this.myForm?.get("infoTangNgan")?.setValue(null);
  }

  /* disable form Hộp */
  disableFormHop() {
    this.myForm?.get("infoHop").disable();
    this.myForm?.get("infoHop")?.setValue(null);
  }

  viewDetailHoSo(id: string) {
    this._router.navigate(['back-office/reg-form-search-by-request/' + id]);
  }

  /* đến trang sửa hồ sơ */
  editHoSo(id: string) {
    var valueUrl = "/back-office/addorupdate-ho-so-luu-tru?type=edit&&id=" + id;
    this._router.navigateByUrl(valueUrl);

    this.cd.markForCheck();
  }

  
}
