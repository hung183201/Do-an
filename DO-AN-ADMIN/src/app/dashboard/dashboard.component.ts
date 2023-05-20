import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DashBoardService } from 'app/shared/services/dashboard.service';
import * as chartsData from '../shared/configs-bieu-do-dashboard/ngx-charts.config';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  constructor(
    private dashBoardService: DashBoardService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    public toastr: ToastrService
  ) {

  }

  public donViHanhChinh = [
    { id: 1, name: 'Tỉnh/Thành phố' },
    { id: 2, name: 'Quận/Huyện' }
  ];
  public selectedCity: any = { id: 1, name: 'Tỉnh/Thành phố' };
  public selectedDistrict: any;
  public listQuanHuyen: any[] = [];
  public listHoSo: any[] = [];
  public listDataHoSo: any[] = [];
  public listInfoDiaBan: any;
  public tenTinhThongKe: string = null;
  public showDanhSachHuyen: boolean = false;
  public maTinhUser: number = null;
  public maHuyenUser: number = null;
  public barChartmulti: any[] = [];

  // options
  barChartShowYAxis = chartsData.barChartShowYAxis;
  barChartShowXAxis = chartsData.barChartShowXAxis;
  barChartGradient = chartsData.barChartGradient;
  barChartShowLegend = chartsData.barChartShowLegend;
  barChartShowXAxisLabel = chartsData.barChartShowXAxisLabel;
  barChartXAxisLabel = chartsData.barChartXAxisLabel;
  barChartShowYAxisLabel = chartsData.barChartShowYAxisLabel;
  barChartYAxisLabel = chartsData.barChartYAxisLabel;
  barChartColorScheme = chartsData.barChartColorScheme;

  async ngOnInit(): Promise<void> {
    this.getDanhSachHuyen();
    this.getTenDiaBan();
    await this.getBieuDo();
  }

  /* hàm change khi chọn tỉnh hoặc huyện */
  chonDiaBanTinh() {
    if (this.selectedCity != null) {
      if (this.selectedCity.id == 1) {
        this.showDanhSachHuyen = false;
        this.maHuyenUser = null;
        this.selectedDistrict = null;
        this.getBieuDo();
      }
      if (this.selectedCity.id == 2) {
        this.showDanhSachHuyen = true;
      }
    } else {
      this.showDanhSachHuyen = false;
      this.maHuyenUser = null;
    }
  }

  /* hàm change khi chọn địa bàn huyện */
  chonDiaBanHuyen() {
    if (this.selectedDistrict != null) {
      this.maHuyenUser = this.selectedDistrict.maHuyen
      this.getBieuDo();
    }
  }

  /* get danh sách quận/huyện */
  async getTenDiaBan() {

    var values = JSON.parse(localStorage.getItem("OauthService"));
    this.maTinhUser = values.id_token_claims_obj.quyenDuLieus[0].maTinh;

    let params: any = {
      maTinh: this.maTinhUser
    };

    const rs = await this.dashBoardService.getTenDiaBanThongKe(params).toApiPromise();

    if (!rs.success) {
      return;
    }

    this.listInfoDiaBan = rs.result.data;
    if (this.listInfoDiaBan != null) {
      this.tenTinhThongKe = this.listInfoDiaBan.tenTinh;
    }

    this.changeDetectorRef.markForCheck();
  }

  /* get danh sách quận/huyện */
  async getDanhSachHuyen() {

    var values = JSON.parse(localStorage.getItem("OauthService"));
    this.maTinhUser = values.id_token_claims_obj.quyenDuLieus[0].maTinh;

    let params: any = {
      maTinh: this.maTinhUser
    };

    const rs = await this.dashBoardService.getDanhSachQuanHuyen(params).toApiPromise();

    if (!rs.success) {
      return;
    }
    this.listQuanHuyen = rs.result.data;
    this.changeDetectorRef.markForCheck();
  }

  /* get danh sách quận/huyện */
  async getBieuDo() {

    var params = {}

    if (this.maHuyenUser == null || this.maHuyenUser == undefined) {
      params = {
        MaDVHC: this.maTinhUser,
        CapDo: 0
      };
    } else {
      params = {
        MaDVHC: this.maHuyenUser,
        CapDo: 1
      };
    }

    const rs = await this.dashBoardService.getBieuDoHoSo(params).toApiPromise();

    if (!rs.success) {
      return;
    }

    this.listDataHoSo = rs.result.data;
    this.listHoSo = this.listDataHoSo.map(function (item) {
      return item['tenDVHC'];
    });

    for (const item of this.listDataHoSo) {
      item.name = item.tenDVHC
      if (this.showDanhSachHuyen) {
        item.series = [
          {
            name: '',
            idHuyen: this.selectedDistrict.maHuyen,
            idXa: item.maDVHC,
            value: item.soLuongHoSo
          }
        ]
      } else {
        item.series = [
          {
            name: '',
            idHuyen: item.maDVHC,
            value: item.soLuongHoSo
          }
        ]
      }
    }

    this.listHoSo = this.listDataHoSo.map(({ name, series }) => ({ name, series }));
    this.barChartmulti = this.listHoSo;
    this.changeDetectorRef.markForCheck();
  }

  onSelect(event) {

    if (event.idXa) {
      var valueUrl = '/back-office/reg-form-search-by-request?maHuyen=' + event.idHuyen + '&maXa=' + event.idXa;
    } else {
      var valueUrl = '/back-office/reg-form-search-by-request?maHuyen=' + event.idHuyen;
    }

    this.router.navigateByUrl(valueUrl);
  }

}
