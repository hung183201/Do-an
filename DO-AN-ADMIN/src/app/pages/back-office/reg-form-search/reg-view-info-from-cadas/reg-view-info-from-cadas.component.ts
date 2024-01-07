import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/shared/auth/auth.service';
import * as _moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-reg-view-info-from-cadas',
  templateUrl: './reg-view-info-from-cadas.component.html',
  styleUrls: ['./reg-view-info-from-cadas.component.scss', '../../../../../assets/sass/libs/datatables.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegViewInfoFromCadasComponent implements OnInit {
  id: string;

  status = "Còn hiệu lực";
  startdate = "01/08/2022";
  enddate = "01/10/2022";
  public listOfData: any;
  public paramsFromUrl: any = this.activatedRoute.snapshot.queryParams;

  public listInfoThuaDat: any[] = [
    {
      key: "0",
      value: "Số tờ",
      data: "01"
    },
    {
      key: "1",
      value: "Số thửa",
      data: "02"
    },
    {
      key: "2",
      value: "Tỉ lệ",
      data: "1:5000"
    },
    {
      key: "3",
      value: "Diện tích",
      data: "100 m2"
    },
    {
      key: "4",
      value: "Mục đích sử dụng",
      data: "ONT+CLN"
    },
    {
      key: "5",
      value: "Nguồn gốc sử dụng",
      data: "ONT+CLN"
    },
    {
      key: "6",
      value: "Thời hạn sử dụng",
      data: "Vĩnh viễn"
    },
  ];

  public listInfoChuSuDung: any[] = [
    {
      key: "0",
      value: "Tên chủ",
      data: "Đoàn Trung Đức"
    },
    {
      key: "1",
      value: "Địa chỉ chủ",
      data: "Quận Long Biên, thành phố Hà Nội"
    },
    {
      key: "2",
      value: "Số CMND/CCCD",
      data: "163424017"
    },
  ];

  public listInfoGCN: any[] = [
    {
      key: "0",
      value: "Số serial",
      data: "CS 01234"
    },
    {
      key: "1",
      value: "Số vào sổ",
      data: "CQ 13112"
    },
    {
      key: "2",
      value: "Mã vạch",
      data: "09385"
    },
  ];


  constructor(private location: Location,

    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef,
    public toastr: ToastrService) { }

  ngOnInit() {
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

}
