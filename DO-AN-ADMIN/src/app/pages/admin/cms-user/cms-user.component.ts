import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild, ViewEncapsulation, ChangeDetectorRef, Input } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CmsUserService } from 'app/shared/services/cms-user.service';

@Component({
  selector: 'app-cms-post',
  templateUrl: './cms-user.component.html',
  styleUrls: ['./cms-user.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class CmsUserComponent implements OnInit {

  public listOfData: any;
  public listDataXoaUser: any;
  public selectedFilterUser: any;
  public optionsFilterUser = [
    { id: 1, name: 'Tất cả' },
    { id: 2, name: 'Người dân, doanh nghiệp', value: 'CUSTOMER' },
    { id: 3, name: 'Cơ quan quản lý', value: 'PARTNER' }
  ];
  public paramsFromUrl: any;
  public closeResult: string;
  public dataUserXoa: string = null;
  public ColumnMode = ColumnMode;

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;
  @ViewChild('tableResponsive') tableResponsive: any;

  public chkBoxSelected = [];
  public SelectionType = SelectionType;

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

  /**
   * toggleExpandRowResponsive
   *
   * @param row
   */
  toggleExpandRowResponsive(row) {
    this.tableResponsive.rowDetail.toggleExpandRow(row);
  }

  constructor(
    private router: Router,
    private cmsUserService: CmsUserService,
    private changeDetectorRef: ChangeDetectorRef,
    private modalService: NgbModal,
    public toastr: ToastrService,
  ) {

  }


  /**
   * On init
   */
  async ngOnInit() {
    await this.getDanhSachUser();
  }

  //thông báo xóa thành công
  alertXoaThanhCong() {
    this.toastr.success('Xóa người dùng thành công', 'Thành công', { "progressBar": true });
  }

  //thông báo xóa thất bại
  alertXoaError(data) {
    this.toastr.error(data, 'Thất bại', { "progressBar": true });
  }

  /* redirect sang trang sửa thông tin user */
  async updateInfoUser(data) {
    var valueUrl = '/admin/cms-user/addorupdate-user?tenDangNhap=' + data.tenDangNhap;
    this.router.navigateByUrl(valueUrl);
  }

  /* redirect sang trang sửa quyền user */
  async updateQuyenUser(data) {
    var valueUrl = '/admin/cms-user/addorupdate-user?type=quyen&tenDangNhap=' + data.tenDangNhap;
    this.router.navigateByUrl(valueUrl);
  }

  /* redirect sang trang sửa quyền dữ liệu user */
  async updateQuyenDuLieuUser(data) {
    var valueUrl = '/admin/cms-user/addorupdate-user?type=quyenDuLieu&tenDangNhap=' + data.tenDangNhap;
    this.router.navigateByUrl(valueUrl);
  }

  /* get danh sách user */
  async getDanhSachUser() {

    var params = {};

    /* tìm kiếm theo loại người dùng */
    if (this.selectedFilterUser != null && this.selectedFilterUser != undefined && this.selectedFilterUser.value != null && this.selectedFilterUser.value != undefined) {
      params['module'] = this.selectedFilterUser.value;
    }

    const rs = await this.cmsUserService.getDanhSachUser(params).toApiPromise();

    if (!rs.success) {
      return;
    }

    this.listOfData = rs.result.data;

    for (var i = 0; i < this.listOfData.length; i++) {
      this.listOfData[i].STT = i + 1;
      for (const item of this.optionsFilterUser) {
        if (item.value == this.listOfData[i].appModule) {
          this.listOfData[i].appModuleText = item.name;
        }
      }
    }

    this.changeDetectorRef.markForCheck();
  }

  /* xóa user */
  async deleteUser(data) {
    var params = {
      tenDangNhap: data.tenDangNhap,
    }

    const rs = await this.cmsUserService.deleteUser(params).toApiPromise();

    if (!rs.success) {
      return;
    }

    this.listDataXoaUser = rs.result.data;

    if (this.listDataXoaUser.status) {
      this.alertXoaThanhCong();
      this.getDanhSachUser();
    } else {
      this.alertXoaError(this.listDataXoaUser.message);
    }
    this.changeDetectorRef.markForCheck();
  }

  // Open modal confirm
  open(content, data) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.dataUserXoa = data;
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

  editUser() {
    var valueUrl = '/danh-muc/cms-user/addorupdate-user';
    this.router.navigateByUrl(valueUrl);
  }

  addUser() {
    var valueUrl = '/danh-muc/cms-user/addorupdate-user';
    this.router.navigateByUrl(valueUrl);
  }

}


