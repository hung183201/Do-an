import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { HoSoLuuTruService } from 'app/shared/services/ho-so-luu-tru.service';
import { HoSoLuuTruViewModel } from 'app/shared/models/cadas/storage/ho-so-luu-tru-viewmodel';
import { TaiLieuKemTheoHoSoDiaChinhViewModel } from 'app/shared/models/cadas/storage/tai-lieu-kem-theo-viewmodel';
import { ActivatedRoute, Router } from '@angular/router';
import * as _moment from 'moment';
import { HoSoKhaiThacService } from 'app/shared/services/ho-so-khai-thac.service';
import { AuthService } from 'app/shared/auth/auth.service';
import { HoSoKhaiThacThanhPhanHoSoViewModel } from 'app/shared/models/cadas/storage/ho-so-khai-thac-thanh-phan-ho-so-viewmodel';
import { HoSoKhaiThacViewModel } from 'app/shared/models/cadas/storage/ho-so-khai-thac-viewmodel';
import { ToastrService } from 'ngx-toastr';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-reg-view-detail-searched-document',
  templateUrl: './reg-view-detail-searched-document.component.html',
  styleUrls: ['./reg-view-detail-searched-document.component.scss', '../../../../../assets/sass/libs/datatables.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegViewDetailSearchedDocumentComponent implements OnInit {

  hs: HoSoLuuTruViewModel;
  lstFile: TaiLieuKemTheoHoSoDiaChinhViewModel[] = [];

  id: string;

  status = "Còn hiệu lực";
  startdate = "01/08/2022";
  enddate = "01/10/2022";
  public listOfData: any;
  public paramsFromUrl: any = this.activatedRoute.snapshot.queryParams;

  public listInfoView: any[] = [
    {
      key: "0",
      value: "Tên hồ sơ",
    },
    {
      key: "1",
      value: "Mã hồ sơ",
    },
    {
      key: "2",
      value: "Địa chỉ chủ",
    },
    {
      key: "3",
      value: "Loại hồ sơ",
    },
    {
      key: "4",
      value: "Đơn vị hình thành phông",
    },
    {
      key: "5",
      value: "Đơn vị lưu trữ",
    },
    {
      key: "12",
      value: "Vị trí lưu trữ",
    },
    {
      key: "6",
      value: "Thời gian bắt đầu",
    },
    {
      key: "7",
      value: "Thời gian kết thúc",
    },
    {
      key: "8",
      value: "Số lượng",
    },
    {
      key: "9",
      value: "Ngôn ngữ",
    },
    {
      key: "10",
      value: "Ghi chú",
    },
    // {
    //   key: "11",
    //   value: "Trạng thái",
    // },
  ];
  public ColumnMode = ColumnMode;

  constructor(private location: Location,
    private _router: Router,
    private hoSoLuuTruService: HoSoLuuTruService,
    private hoSoKhaiThacService: HoSoKhaiThacService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef,
    public toastr: ToastrService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    this.loadData();
  }
  backToPreviousPage() {
    this.location.back();
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
  async loadData() {
    // console.log(this.paramsFromUrl);
    var params = {
      Id: this.id,
    };
    // this.hoSoLuuTruService.getHoSoLuuTru(this.id).pipe()
    //   .subscribe({
    //     next: data => {
    //       this.hs = data;
    //       this.hs.ngonNguId = "Tiếng Việt";
    //       this.startdate = this.convertDateServerToString(this.hs.thoiGianBatDau, 'DD/MM/YYYY')
    //       this.enddate = this.convertDateServerToString(this.hs.thoiGianKetThuc, 'DD/MM/YYYY')
    //       console.log(this.hs.thoiGianBatDau);
    //       this.cd.markForCheck();
    //     },
    //     error: error => {

    //     }
    //   });
    const rs = await this.hoSoLuuTruService.getThongTinHoSoById(params).toApiPromise();

    if (!rs.success) {
      return;
    }

    this.listOfData = rs.result.data;
    this.hs = rs.result.data;
    console.log(this.listOfData);

    for (const item of this.listInfoView) {
      if (item['key'] == 0) {
        item['data'] = this.listOfData.tenHoSo;
      }
      if (item['key'] == 1) {
        item['data'] = this.listOfData.maHoSo;
      }
      if (item['key'] == 2) {
        if (this.listOfData.diaChi == null || this.listOfData.diaChi.trim() == '') {
          this.listInfoView = this.listInfoView.filter(x => x.key != 2)
        } else {
          item['data'] = this.listOfData.diaChi;
        }
      }
      if (item['key'] == 3) {
        item['data'] = this.listOfData.tenLoaiHoSoLuuTru;
      }
      if (item['key'] == 4) {
        if (this.listOfData.tenDonViHinhThanhPhong == null || this.listOfData.tenDonViHinhThanhPhong.trim() == '') {
          this.listInfoView = this.listInfoView.filter(x => x.key != 4)
        } else {
          item['data'] = this.listOfData.tenDonViHinhThanhPhong;
        }
      }
      if (item['key'] == 5) {
        if (this.listOfData.tenDonViLuuTru == null || this.listOfData.tenDonViLuuTru.trim() == '') {
          this.listInfoView = this.listInfoView.filter(x => x.key != 5)
        } else {
          item['data'] = this.listOfData.tenDonViLuuTru;
        }
      }
      if (item['key'] == 6) {
        if (this.listOfData.thoiGianBatDau == null || this.listOfData.thoiGianBatDau.trim() == '') {
          this.listInfoView = this.listInfoView.filter(x => x.key != 6)
        } else {
          item['data'] = this.convertDateServerToString(this.listOfData.thoiGianBatDau, 'DD/MM/YYYY');
        }
      }
      if (item['key'] == 7) {
        if (this.listOfData.thoiGianKetThuc == null || this.listOfData.thoiGianKetThuc.trim() == '') {
          this.listInfoView = this.listInfoView.filter(x => x.key != 7)
        } else {
          item['data'] = this.convertDateServerToString(this.listOfData.thoiGianKetThuc, 'DD/MM/YYYY');
        }
      }
      if (item['key'] == 8) {
        item['data'] = this.listOfData.soLuong;
        if (this.listOfData.soLuong == null) {
          this.listInfoView = this.listInfoView.filter(x => x.key != 8)
        }
      }
      if (item['key'] == 9) {
        if (this.listOfData.ngonNguId == null || this.listOfData.ngonNguId.trim() == '') {
          this.listInfoView = this.listInfoView.filter(x => x.key != 9)
        } else {
          item['data'] = 'Tiếng Việt';
        }
      }
      if (item['key'] == 10) {
        if (this.listOfData.ghiChu == null || this.listOfData.ghiChu.trim() == '') {
          this.listInfoView = this.listInfoView.filter(x => x.key != 10)
        } else {
          item['data'] = this.listOfData.ghiChu;
        }
      }
      // if (item['key'] == 11) {
      //   if (this.listOfData.hieuLuc) {
      //     item['data'] = 'Còn hiệu lực';
      //     item['css'] = 'badge badge-success style-status'
      //   } else {
      //     item['data'] = 'Hết hiệu lực';
      //     item['css'] = 'badge badge-warning style-status'
      //   }
      // }
      // if (item['key'] != 11) {
      //   item['css'] = 'color-text'
      // }
      if (item['key'] == 12) {
        if (this.listOfData.tenHop == null || this.listOfData.tenHop.trim() == '') {
          this.listInfoView = this.listInfoView.filter(x => x.key != 12)
        } else {
          item['data'] = this.listOfData.tenKho + ' / ' + this.listOfData.tenGia + ' / ' + this.listOfData.tenNgan + ' / ' + this.listOfData.tenHop
        }
      }
    }

    this.cd.markForCheck();

    this.hoSoLuuTruService.getDanhSachFileKemTheo(this.id).pipe()
      .subscribe({
        next: data => {
          this.lstFile = data;
          this.cd.markForCheck();
        },
        error: error => {

        }
      });
  }
  viewDetailFile(id: any) {
    this.hoSoLuuTruService.GetDownloadLinkTaiLieuKemTheo(id).pipe()
      .subscribe({
        next: data => {
          if (data != null) {
            if (data.status) {
              window.open(data.newId, "_blank");
            }
            else {
              this.toastr.error(data.message);
            }
          }
          else {
            this.toastr.error('Có lỗi khi lấy dữ liệu, vui lòng thử lại sau');
          }
        },
        error: error => {
          this.toastr.error('Có lỗi khi lấy dữ liệu, vui lòng thử lại sau');
        }
      });
  }
  borrowHoSo() {
    const user = this.authService.userValue;
    this.hoSoKhaiThacService.getHoSoKhaiThac(null, user.id_token_claims_obj.tenDangNhap, '0').pipe()
      .subscribe({
        next: data => {
          let thanhPhan: HoSoKhaiThacThanhPhanHoSoViewModel = {
            hoSoLuuTruId: this.hs.id,
            maHoSo: this.hs.maHoSo,
            tenLoaiHoSoLuuTru: this.hs.tenLoaiHoSoLuuTru,
            tenHoSo: this.hs.tenHoSo,
            diaChi: this.hs.diaChi,
            tenDonViHinhThanhPhong: this.hs.tenDonViHinhThanhPhong,
            tenKho: this.hs.tenKho,
            tenGia: this.hs.TenGia,
            tenNgan: this.hs.tenNgan,
            tenHop: this.hs.tenHop,
            thoiGianBatDau: this.hs.thoiGianBatDau,
            thoiGianKetThuc: this.hs.thoiGianKetThuc,
            soLuong: this.hs.soLuong,
            thoiHanBaoQuan: this.hs.thoiHanBaoQuan,
            donViBaoQuan: this.hs.donViBaoQuan,
            donViTinh: this.hs.donViTinh,
            tenNgonNgu: "Tiếng Việt",
            maCheDoSuDungTaiLieu: this.hs.maCheDoSuDungTaiLieu,
            tenDonViLuuTru: this.hs.tenDonViLuuTru,
            ghiChu: this.hs.ghiChu,
            tenFileGoc: this.hs.tenFileGoc,
            danhSachTaiLieuKemTheo: JSON.stringify(this.lstFile),
            id: null,
            hoSoKhaiThacId: null,
            tenHuyen: null,
            tenXa: null,
            doMat: "Thường"
          }
          if (data == null) {
            let hs: HoSoKhaiThacViewModel = new HoSoKhaiThacViewModel();
            hs.maHoSoKhaiThac = "TMP";
            hs.tenDangNhapNguoiLapHoSo = user.id_token_claims_obj.tenDangNhap;
            hs.hoTenNguoiLapHoSo = user.id_token_claims_obj.hoTenNguoiDung;
            hs.trangThaiHoSo = 0;
            hs.hinhThucHoSo = 0;
            let lst: Array<HoSoKhaiThacThanhPhanHoSoViewModel> = [];
            lst.push(thanhPhan);
            hs.hoSoKhaiThac_ThanhPhanHoSos = lst;
            this.hoSoKhaiThacService.insUpdateHoSoKhaiThacAndThanhPhanHoSoByCurrentUser(hs).pipe()
              .subscribe({
                next: data => {
                  if (data.data.status) {
                    this.toastr.success('Thêm hồ sơ thành công');
                  }
                  else {
                    this.toastr.error('Thêm hồ sơ không thành công' + data.data.message);
                  }
                  this.cd.markForCheck();
                },
                error: error => {
                  this.toastr.error('Thêm hồ sơ không thành công' + error.message);
                }
              });
          }
          else {
            thanhPhan.hoSoKhaiThacId = data.id;
            this.hoSoKhaiThacService.insUpdateThanhPhanHoSoKhaiThac(thanhPhan).pipe()
              .subscribe({
                next: data => {
                  if (data.data.status) {
                    this.toastr.success('Thêm hồ sơ thành công');
                  }
                  else {
                    this.toastr.error('Thêm hồ sơ không thành công' + data.data.message);
                  }
                  this.cd.markForCheck();
                },
                error: error => {
                  this.toastr.error('Thêm hồ sơ không thành công' + error.message);
                }
              });
          }


        },
        error: error => {
          this.toastr.error('Thêm hồ sơ không thành công' + error.message);
        }
      });
  }
  viewHoSoFromCadas() {
    var valueUrl = '/back-office/reg-view-info-from-cadas';
    this._router.navigateByUrl(valueUrl);
  }
}
