import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserProFileService } from 'app/shared/services/user-profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {


  constructor(
    private formBuilder: FormBuilder,
    private userProFileService: UserProFileService,
    private changeDetectorRef: ChangeDetectorRef,
    private modalService: NgbModal,
    public toastr: ToastrService
  ) {
    this.myForm = this.formBuilder.group({
      tenDangNhap: [null],
      hoTenNguoiDung: [null],
      tenPhongBan: [null],
      chucVu: [null],
      oldPassword: [null],
      newPassword: [null],
      confirmPassword: [null],
    });
  }

  public myForm: FormGroup;
  public listQuyenUser: any[] = [];
  public quyenDonVi: any;
  public listDonVi: any[] = [];
  public listProfileUser: any;
  public showButtonSuaTenDayDu: boolean = true;
  public showButtonDoiMatKhau: boolean = true;
  public showRequired: boolean = false;
  public tenTinh: string = null;
  public closeResult: string;
  public searchText: any;

  async ngOnInit() {
    this.myForm.disable();
    this.showButtonSuaTenDayDu = true;
    this.getProfileUser();
    this.getQuyenUser();
    this.getDanhSachQuyenDuLieu();
  }

  //thông báo không tìm thấy dữ liệu trong năm
  alertKhongCoDuLieu(data) {
    this.toastr.info('Không có dữ liệu thống kê trong năm ' + data, 'Thông báo', { "progressBar": true });
  }

  //thông báo cập nhật tên đầy đủ thành công
  alertCapNhatTenThanhCong() {
    this.toastr.success('Cập nhật tên đầy đủ thành công', 'Thông báo', { "progressBar": true });
  }

  //thông báo cập nhật tên đầy đủ thất bại
  alertCapNhatTenThatBai() {
    this.toastr.error('Cập nhật tên đầy đủ thất bại', 'Thất bại', { "progressBar": true });
  }

  //thông báo api cập nhật tên đầy đủ lỗi
  alertApiCapNhatTenError() {
    this.toastr.error('Chức năng cập nhật tên đầy đủ đang gặp sự cố, vui lòng thử lại sau', 'Thất bại', { "progressBar": true });
  }

  //thông báo api đổi mật khẩu lỗi
  alertApiDoiMatKhauError() {
    this.toastr.error('Chức năng đổi mật khẩu đang gặp sự cố, vui lòng thử lại sau', 'Thất bại', { "progressBar": true });
  }

  //thông báo validate năm tìm kiếm
  alertValidateNameTimKiem() {
    this.toastr.warning('Năm tìm kiếm phải > 1980 và < 2080', 'Cảnh báo', { "progressBar": true });
  }

  //thông báo validate tên null
  alertValidateNameNull() {
    this.toastr.warning('Tên đầy đủ không được bỏ trống', 'Cảnh báo', { "progressBar": true });
  }

  //thông báo validate tên > length ký tự
  alertValidateNameQuaKyTu() {
    this.toastr.warning('Tên đầy đủ tối đa 100 ký tự', 'Cảnh báo', { "progressBar": true });
  }

  //thông báo validate mật khẩu cũ null
  alertValidateMatKhauNull() {
    this.toastr.warning('Mật khẩu cũ không được bỏ trống, vui lòng kiểm tra lại', 'Cảnh báo', { "progressBar": true });
  }

  //thông báo validate mật khẩu cũ không đúng
  alertValidateMatKhauSai(data) {
    this.toastr.warning(data, 'Cảnh báo', { "progressBar": true });
  }

  //thông báo validate mật khẩu cũ > length ký tự
  alertValidateMatKhauQuaKyTu() {
    this.toastr.warning('Mật khẩu cũ tối đa 20 ký tự', 'Cảnh báo', { "progressBar": true });
  }

  //thông báo validate mật khẩu mới null
  alertValidateMatKhauMoiNull() {
    this.toastr.warning('Mật khẩu mới không được bỏ trống, vui lòng kiểm tra lại', 'Cảnh báo', { "progressBar": true });
  }

  //thông báo validate mật khẩu mới > length ký tự
  alertValidateMatKhauMoiQuaKyTu() {
    this.toastr.warning('Mật khẩu mới tối đa 20 ký tự', 'Cảnh báo', { "progressBar": true });
  }

  //thông báo validate nhắc lại mật khẩu mới null
  alertValidateNhacLaiMatKhauMoiNull() {
    this.toastr.warning(' Nhắc lại mật khẩu mới không được bỏ trống, vui lòng kiểm tra lại', 'Cảnh báo', { "progressBar": true });
  }

  //thông báo validate nhắc lại mật khẩu mới > length ký tự
  alertValidateNhacLaiMatKhauMoiQuaKyTu() {
    this.toastr.warning('Nhắc lại mật khẩu mới tối đa 20 ký tự', 'Cảnh báo', { "progressBar": true });
  }

  //thông báo validate nhắc lại mật khẩu mới không đúng
  alertValidateNhacLaiMatKhauMoiError() {
    this.toastr.warning('Nhập lại mật khẩu mới không chính xác, vui lòng kiểm tra lại', 'Cảnh báo', { "progressBar": true });
  }

  /* get quyền user */
  async getProfileUser() {

    this.myForm.get('hoTenNguoiDung')!.enable();
    const rs = await this.userProFileService.getInfoProfileUser().toApiPromise();
    if (!rs.success) {
      return;
    }
    this.listProfileUser = rs.result.data;
    this.myForm.get('tenDangNhap')?.setValue(this.listProfileUser.tenDangNhap);
    this.myForm.get('hoTenNguoiDung')?.setValue(this.listProfileUser.hoTenNguoiDung);
    this.myForm.get('tenPhongBan')?.setValue(this.listProfileUser.phongBan.tenPhongBan);
    this.myForm.get('chucVu')?.setValue(this.listProfileUser.chucVu);
    this.changeDetectorRef.markForCheck();
  }

  /* button update tên đầy đủ */
  async updateTenDayDu() {
    var formData = this.myForm.getRawValue();
    var body = {
      tenDayDu: formData.hoTenNguoiDung
    }

    if (formData.hoTenNguoiDung == null || formData.hoTenNguoiDung == undefined || formData.hoTenNguoiDung.trim() == '') {
      this.alertValidateNameNull();
      this.changeDetectorRef.markForCheck();
      return
    }

    if (formData.hoTenNguoiDung.length > 100) {
      this.alertValidateNameQuaKyTu();
      this.changeDetectorRef.markForCheck();
      return
    }

    const rs = await this.userProFileService.postUpdateTenDayDu(body).toApiPromise();
    if (rs.success) {
      if (rs.result.data.status) {
        this.alertCapNhatTenThanhCong();
        this.showButtonSuaTenDayDu = true;
        this.changeDetectorRef.markForCheck();
      } else {
        this.alertCapNhatTenThatBai();
        this.changeDetectorRef.markForCheck();
      }
      return
    } else {
      this.alertApiCapNhatTenError();
      this.changeDetectorRef.markForCheck();
      return
    }
  }

  /* bỏ disable button cập nhật tên đầy đủ khi có thay đổi trên form text tên đầy đủ */
  onChangeTenDayDu(searchValue: string): void {
    this.showButtonSuaTenDayDu = false;
  }

  /* show button đổi mật khẩu */
  showButtonMatKhau() {
    this.myForm.get('oldPassword')!.enable();
    this.myForm.get('newPassword')!.enable();
    this.myForm.get('confirmPassword')!.enable();
    this.showButtonDoiMatKhau = false;
    this.showRequired = true;
  }

  // Open default modal
  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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

  /* button đổi mật khẩu */
  async buttonDoiMatKhau() {

    var formData = this.myForm.getRawValue();
    var body = {
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword
    }

    if (formData.oldPassword == null || formData.oldPassword == undefined || formData.oldPassword.trim() == '') {
      this.alertValidateMatKhauNull();
      this.changeDetectorRef.markForCheck();
      return
    }

    if (formData.oldPassword.length > 20) {
      this.alertValidateMatKhauQuaKyTu();
      this.changeDetectorRef.markForCheck();
      return
    }

    if (formData.newPassword == null || formData.newPassword == undefined || formData.newPassword.trim() == '') {
      this.alertValidateMatKhauMoiNull();
      this.changeDetectorRef.markForCheck();
      return
    }

    if (formData.newPassword.length > 20) {
      this.alertValidateMatKhauMoiQuaKyTu();
      this.changeDetectorRef.markForCheck();
      return
    }

    if (formData.confirmPassword == null || formData.confirmPassword == undefined || formData.confirmPassword.trim() == '') {
      this.alertValidateNhacLaiMatKhauMoiNull();
      this.changeDetectorRef.markForCheck();
      return
    }

    if (formData.confirmPassword.length > 20) {
      this.alertValidateNhacLaiMatKhauMoiQuaKyTu();
      this.changeDetectorRef.markForCheck();
      return
    }

    if (formData.newPassword != formData.confirmPassword) {
      this.alertValidateNhacLaiMatKhauMoiError();
      this.changeDetectorRef.markForCheck();
      return
    }

    const rs = await this.userProFileService.postDoiMatKhau(body).toApiPromise();
    if (rs.success) {
      if (rs.result.data.status) {
        this.setFormDoiMatKhauVeMacdinh();
      } else {
        this.alertValidateMatKhauSai(rs.result.data.message);
      }

      this.changeDetectorRef.markForCheck();
      return
    } else {
      this.alertApiDoiMatKhauError();
      this.setFormDoiMatKhauVeMacdinh();
      this.changeDetectorRef.markForCheck();
      return
    }
  }

  /* set form đổi mật khẩu về mặc định */
  setFormDoiMatKhauVeMacdinh() {
    this.myForm.get('oldPassword')?.setValue(null);
    this.myForm.get('newPassword')?.setValue(null);
    this.myForm.get('confirmPassword')?.setValue(null);
    this.myForm.get('oldPassword')!.disable();
    this.myForm.get('newPassword')!.disable();
    this.myForm.get('confirmPassword')!.disable();
    this.showButtonDoiMatKhau = true;
  }

  /* get danh sách đơn vị hành chính */
  async getDanhSachQuyenDuLieu() {

    const rs = await this.userProFileService.getDanhSachQuyenDuLieu().toApiPromise();
    if (!rs.success) {
      return;
    }

    this.quyenDonVi = rs.result.data;
    if (Object.keys(this.quyenDonVi).length !== 0) {
      this.tenTinh = this.quyenDonVi.ten;
      this.listDonVi = this.quyenDonVi.donViTrucThuocs;
    }

    this.changeDetectorRef.markForCheck();
  }

  /* get quyền user */
  async getQuyenUser() {

    const rs = await this.userProFileService.getDanhSachQuyenUser().toApiPromise();
    if (!rs.success) {
      return;
    }
    this.listQuyenUser = rs.result.data;
    this.changeDetectorRef.markForCheck();
  }

}
