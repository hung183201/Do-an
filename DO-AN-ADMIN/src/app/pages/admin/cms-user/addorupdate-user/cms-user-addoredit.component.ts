import { map } from 'rxjs/operators';
import { CmsUserService } from 'app/shared/services/cms-user.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { SelectionModel } from "@angular/cdk/collections";
import { FlatTreeControl } from "@angular/cdk/tree";
import { Injectable } from "@angular/core";
import {
  MatTreeFlatDataSource,
  MatTreeFlattener
} from "@angular/material/tree";
import { BehaviorSubject } from "rxjs";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";

declare let $: any;

/* -------- khai báo của phần tree view quyền dữ liệu
----------------------------------------------------- */
/**
 * modal info địa bàn
 */
export class infoDiaBan {
  children?: infoDiaBan[];
  ma: any;
  item: string;
}

/** modal chứa info chi tiết đơn vị trực thuộc của địa bàn */
export class infoDonViTrucThuoc {
  item: string;
  ma: number;
  level: number;
  expandable: boolean;
}

/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable({ providedIn: "root" })
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<infoDiaBan[]>([]);
  treeData: any[];

  get data(): infoDiaBan[] {
    return this.dataChange.value;
  }

  constructor() {
    // this.initialize();
  }

  initialize(arrData) {
    this.treeData = arrData;
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.
    const data = arrData;

    // Notify the change.
    this.dataChange.next(data);
  }

  public filter(filterText: string) {
    let filteredTreeData;
    // Filter the tree
    function filter(array, text) {
      const getChildren = (result, object) => {
        if (object.item.toLowerCase() === text.toLowerCase()) {
          result.push(object);
          return result;
        }
        if (Array.isArray(object.children)) {
          const children = object.children.reduce(getChildren, []);
          if (children.length) result.push({ ...object, children });
        }
        return result;
      };

      return array.reduce(getChildren, []);
    }

    filteredTreeData = filter(this.treeData, filterText);

    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    // file node as children.
    const data = filteredTreeData;
    // Notify the change.
    this.dataChange.next(data);
  }
}

/* ---kết thúc khai báo của phần tree view quyền dữ liệu
-------------------------------------------------------- */

@Component({
  selector: 'app-cms-user-addoredit',
  templateUrl: './cms-user-addoredit.component.html',
  styleUrls: ['./cms-user-addoredit.component.scss'], 
  providers: [ChecklistDatabase],
  encapsulation: ViewEncapsulation.None
})
export class CmsUserAddoreditComponent implements OnInit {

  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<infoDonViTrucThuoc, infoDiaBan>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<infoDiaBan, infoDonViTrucThuoc>();

  /** A selected parent node to be inserted */
  selectedParent: infoDonViTrucThuoc | null = null;

  /** The new item's name */
  newItemName = "";

  treeControl: FlatTreeControl<infoDonViTrucThuoc>;

  treeFlattener: MatTreeFlattener<infoDiaBan, infoDonViTrucThuoc>;

  dataSource: MatTreeFlatDataSource<infoDiaBan, infoDonViTrucThuoc>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<infoDonViTrucThuoc>(true /* multiple */);

  /// Filtering
  myControl = new FormControl();
  options: string[] = ["One", "Two", "Three"];
  filteredOptions: Observable<string[]>;

  public paramsFromUrl: any = this.activatedRoute.snapshot.queryParams;
  public listOfData: any;
  public listDVHC: any;
  public listCayDVHC: any;
  public listQuyen: any;
  public listOfInfoUser: any;
  public listOfQuyenDuLieu: any;
  public listOfQuyenDuLieuUserData: any;
  public maTinhUser: any;
  public loaiUser: string = 'CUSTOMER';
  public messErrorTenDangNhap: string = '';
  public messErrorTenDayDu: string = '';
  public messErrorMatKhau: string = '';
  public messErrorNhacLaiMatKhau: string = '';
  public messErrorEmail: string = '';
  public closeResult: string;
  public arrQuyenUser: any[] = [];
  public arrDonViFullCap: any[] = [];
  public listSelectedUser: any[] = [
    {
      key: 'CUSTOMER',
      value: 'Người dân, doanh nghiệp'
    },
    {
      key: 'PARTNER',
      value: 'Cơ quan quản lý'
    },
  ];
  public showFormAdd: boolean = true;
  public showButtonDoiMatKhau: boolean = true;
  public errorNhacLaiMatKhau: boolean = false;
  public errorMatKhau: boolean = false;
  public errorTenDayDu: boolean = false;
  public errorTenDangNhap: boolean = false;
  public errorEmail: boolean = false;
  public myForm: FormGroup;

  public chkBoxSelected = [];
  public SelectionType = SelectionType;
  public ColumnMode = ColumnMode;

  /* check all selected */
  customChkboxOnSelect({ selected }) {
    this.chkBoxSelected.splice(0, this.chkBoxSelected.length);
    this.chkBoxSelected.push(...selected);
  }

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private cmsUserService: CmsUserService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    public toastr: ToastrService,
    private modalService: NgbModal,
    private checklistDatabase: ChecklistDatabase
  ) {
    this.myForm = this.fb.group({
      tenDangNhap: [],
      email: [],
      tenDayDu: [],
      matKhau: [],
      nhacLaiMatKhau: [],
    });

    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren
    );
    this.treeControl = new FlatTreeControl<infoDonViTrucThuoc>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );

    checklistDatabase.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  //thông báo khi validate
  alertValidate(data) {
    this.toastr.error(data, 'Thất bại', { "progressBar": true });
  }

  //thông báo thêm mới thành công
  alertThemMoiThanhCong() {
    this.toastr.success('Thêm mới người dùng thành công', 'Thành công', { "progressBar": true });
  }

  //thông báo đổi mật khẩu thành công
  alertDoiMatKhauThanhCong() {
    this.toastr.success('Đổi mật khẩu thành công', 'Thành công', { "progressBar": true });
  }

  //thông báo cập nhật bài viết thành công
  alertUpdateUserThanhCong() {
    this.toastr.success('Cập nhật người dùng thành công', 'Thành công', { "progressBar": true });
  }

  //thông báo xóa thất bại
  alertXoaError(data) {
    this.toastr.error(data, 'Thất bại', { "progressBar": true });
  }

  alertValidateMatKhauSai(data) {
    this.toastr.error(data, 'Thất bại', { "progressBar": true });
  }

  alertApiDoiMatKhauError() {
    this.toastr.error('Có lỗi xảy ra không thể đổi mật khẩu, vui lòng thử lại', 'Thất bại', { "progressBar": true });
  }

  async ngOnInit() {
    await this.getCayDVHC();
    if (Object.keys(this.paramsFromUrl).length == 0) {
      this.showFormAdd = true;
    } else {
      this.showFormAdd = false;
      await this.getThongTinUser();
     
      if (this.paramsFromUrl.type == 'quyenDuLieu') {
        const arrMaXa = this.listOfInfoUser.quyenDuLieus.map(x => x.maXa);
        const modalArrMaXa = this.treeControl.dataNodes.filter(x => arrMaXa.includes(x.ma))
        this.checklistSelection.select(...modalArrMaXa);
      }
    }

  }

  /* show button đổi mật khẩu */
  showButtonMatKhau() {
    this.myForm.get('matKhau')!.enable();
    this.myForm.get('nhacLaiMatKhau')!.enable();
    this.showButtonDoiMatKhau = false;
  }

  /* set form đổi mật khẩu về mặc định */
  setFormDoiMatKhauVeMacdinh() {
    this.myForm.get('matKhau')?.setValue(null);
    this.myForm.get('nhacLaiMatKhau')?.setValue(null);
    this.myForm.get('matKhau')!.disable();
    this.myForm.get('nhacLaiMatKhau')!.disable();
    this.showButtonDoiMatKhau = true;
  }

  /* hàm chọn loại user */
  selectLoaiUser(data) {
    this.loaiUser = data.key;
  }

  // Open modal confirm
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

  /* get thông tin user theo tên đăng nhập */
  async getThongTinUser() {

    var params = {
      tenDangNhap: this.paramsFromUrl.tenDangNhap
    };

    const rs = await this.cmsUserService.getThongTinUserTheoTenDangNhap(params).toApiPromise();

    if (!rs.success) {
      return;
    }

    this.listOfInfoUser = rs.result.data;

    this.myForm?.get('email')?.setValue(this.listOfInfoUser.email);
    this.myForm?.get('tenDangNhap')?.setValue(this.listOfInfoUser.tenDangNhap);
    this.myForm?.get('tenDayDu')?.setValue(this.listOfInfoUser.hoTenNguoiDung);
    this.myForm.get('tenDangNhap')!.disable();
    this.setFormDoiMatKhauVeMacdinh();
    this.listOfQuyenDuLieu = this.listOfInfoUser.quyenDuLieus;

    this.changeDetectorRef.markForCheck();
  }

 

  /* get danh sách quyền chức năng */
  async getCayDVHC() {

    var values = JSON.parse(localStorage.getItem("OauthService"));
    this.maTinhUser = values.id_token_claims_obj.quyenDuLieus[0].maTinh;

    var params = {
      maTinh: this.maTinhUser,
    };

    const rs = await this.cmsUserService.getCayDVHC(params).toApiPromise();

    if (!rs.success) {
      return;
    }

    this.listDVHC = rs.result.data;
    this.listDVHC['item'] = this.listDVHC['ten'];
    this.listDVHC['children'] = this.listDVHC['donViTrucThuocs'];

    for (const item of this.listDVHC['donViTrucThuocs']) {
      item.item = item.ten;
      item.children = item.donViTrucThuocs;
    }

    this.listDVHC['children'] = this.listDVHC['children'].map(({ ma, item, children }) => ({ ma, item, children }));

    for (const item of this.listDVHC['children']) {
      for (const itemX of item['children']) {
        itemX.item = itemX.ten;
      }
      item['children'] = item['children'].map(({ ma, item }) => ({ ma, item }));
    }

    this.arrDonViFullCap.push(this.listDVHC)
    this.arrDonViFullCap = this.arrDonViFullCap.map(({ ma, item, children }) => ({ ma, item, children }));
    this.checklistDatabase.initialize(this.arrDonViFullCap);
    this.listCayDVHC = this.listDVHC.donViTrucThuocs;

    this.changeDetectorRef.markForCheck();
  }

  /* thêm mới user */
  async themMoiUser() {

    await this.resetValidate();
    if (this.validateFormData() != false && this.validateMatKhau() != false) {
      var formData = this.myForm.getRawValue();

      if (this.chkBoxSelected.length > 0) {
        for (const item of this.chkBoxSelected) {
          item.tenDangNhap = formData.tenDangNhap,
            item.maQuyen = item.ma
        }
        this.arrQuyenUser = this.chkBoxSelected.map(({ tenDangNhap, maQuyen }) => ({ tenDangNhap, maQuyen }));
      }

      var body = {
        nguoiDung: {
          email: formData.email,
          tenDangNhap: formData.tenDangNhap,
          tenDayDu: formData.tenDayDu,
          matKhau: formData.matKhau,
          app: "SFM_Portal",
          appModule: this.loaiUser
        },
        arrNguoiDungQuyen: this.arrQuyenUser
      };

      const rs = await this.cmsUserService.postThemMoiUser(body).toApiPromise();

      if (!rs.success) {
        return;
      }

      this.listOfData = rs.result.data;
      if (this.listOfData.status && this.listOfData.message == null) {
        this.alertThemMoiThanhCong();
        this.backListUser();
      } else {
        this.alertValidate(this.listOfData.message)
      }

      this.changeDetectorRef.markForCheck();
    }
  }

  /* update user */
  async updateUser() {

    var formData = this.myForm.getRawValue();
    await this.resetValidate();

    if (this.validateFormData() != false) {

      if (this.chkBoxSelected.length > 0) {
        for (const item of this.chkBoxSelected) {
          item.tenDangNhap = formData.tenDangNhap,
            item.maQuyen = item.ma
        }
        this.arrQuyenUser = this.chkBoxSelected.map(({ tenDangNhap, maQuyen }) => ({ tenDangNhap, maQuyen }));
      }

      var body = {
        nguoiDung: {
          tenDangNhap: formData.tenDangNhap,
          tenDayDu: formData.tenDayDu,
          email: formData.email,
          app: "SFM_Portal",
          appModule: this.listOfInfoUser.appModule
        },
        arrNguoiDungQuyen: this.arrQuyenUser
      };

      const rs = await this.cmsUserService.postUpdateUser(body).toApiPromise();

      if (!rs.success) {
        return;
      }

      this.listOfData = rs.result.data;

      if (this.listOfData.status && this.listOfData.message == null) {
        this.alertUpdateUserThanhCong();
        this.backListUser();
      }

      this.changeDetectorRef.markForCheck();
    }
  }

 

  /* button đổi mật khẩu */
  async buttonDoiMatKhau() {

    await this.resetValidate();
    var formData = this.myForm.getRawValue();

    if (this.validateMatKhau() != false) {
      var body = {
        nguoiDungId: formData.tenDangNhap,
        newPassword: formData.matKhau,
        confirmPassword: formData.nhacLaiMatKhau
      }

      const rs = await this.cmsUserService.postDoiMatKhau(body).toApiPromise();
      if (rs.success) {
        if (rs.result.data.status) {
          this.setFormDoiMatKhauVeMacdinh();
          this.alertDoiMatKhauThanhCong();
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
  }

  /* back lại trang danh sách user */
  async backListUser() {

    var valueUrl = '/admin/cms-user';
    this.router.navigateByUrl(valueUrl);

    this.changeDetectorRef.markForCheck();

  }

  /* reset Validate */
  async resetValidate() {

    this.errorEmail = false;
    this.errorTenDangNhap = false;
    this.errorTenDayDu = false;
    this.errorMatKhau = false;
    this.errorNhacLaiMatKhau = false;
    this.messErrorEmail = '';
    this.messErrorTenDangNhap = '';
    this.messErrorTenDayDu = '';
    this.messErrorMatKhau = '';
    this.messErrorNhacLaiMatKhau = '';
  }

  /* hàm validate các trường thông tin */
  validateFormData() {
    var formData = this.myForm.getRawValue();

    if (formData.email != null && formData.email != undefined && formData.email.trim() != '') {
      if (formData.email.length > 50) {
        this.errorEmail = true;
        this.messErrorEmail = 'Email không được vượt quá 50 ký tự';
        return false
      }
    }

    if (formData.email == null && formData.email == undefined && formData.email.trim() == '' && (this.paramsFromUrl.type == null || this.paramsFromUrl.type == undefined)) {
      this.errorEmail = true;
      this.messErrorEmail = 'Email không được bỏ trống';
      return false
    }

    if (this.validateEmail(formData.email) == null && (this.paramsFromUrl.type == null || this.paramsFromUrl.type == undefined)) {
      this.errorEmail = true;
      this.messErrorEmail = 'Email không đúng định dạng';
      return false
    }

    if (formData.tenDangNhap != null && formData.tenDangNhap != undefined && formData.tenDangNhap.trim() != '') {
      if (formData.tenDangNhap.length > 30) {
        this.errorTenDangNhap = true;
        this.messErrorTenDangNhap = 'Tên đăng nhập không được vượt quá 30 ký tự';
        return false
      }
      if (formData.tenDangNhap.length < 6) {
        this.errorTenDangNhap = true;
        this.messErrorTenDangNhap = 'Tên đăng nhập tối thiểu 6 ký tự';
        return false
      }
    } else {
      this.errorTenDangNhap = true;
      this.messErrorTenDangNhap = 'Tên đăng nhập không được bỏ trống';
      return false
    }

    if (formData.tenDayDu != null && formData.tenDayDu != undefined && formData.tenDayDu.trim() != '') {
      if (formData.tenDayDu.length > 100) {
        this.errorTenDayDu = true;
        this.messErrorTenDayDu = 'Tên đầy đủ không được vượt quá 100 ký tự';
        return false
      }
    } else {
      this.errorTenDayDu = true;
      this.messErrorTenDayDu = 'Tên đầy đủ không được bỏ trống';
      return false
    }

  }

  /* hàm validate mật khẩu */
  validateMatKhau() {
    var formData = this.myForm.getRawValue();

    if (formData.matKhau != null && formData.matKhau != undefined && formData.matKhau.trim() != '') {
      if (formData.matKhau.length > 20) {
        this.errorMatKhau = true;
        this.messErrorMatKhau = 'Mật khẩu không được vượt quá 20 ký tự';
        return false
      }
      if (formData.matKhau.length < 8) {
        this.errorMatKhau = true;
        this.messErrorMatKhau = 'Mật khẩu tối thiểu 8 ký tự';
        return false
      }
    } else {
      this.errorMatKhau = true;
      this.messErrorMatKhau = 'Mật khẩu không được bỏ trống';
      return false
    }

    if (formData.nhacLaiMatKhau != formData.matKhau) {
      this.errorNhacLaiMatKhau = true;
      this.messErrorNhacLaiMatKhau = 'Nhập lại mật khẩu không chính xác';
      return false
    }

  }

  /* hàm validate định dạng email */
  validateEmail(email) {

    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

  }

  refeshPage() { }

  /* ----------------------------
  các hàm xử lý treeview checkbox
  ------------------------------- */

  getLevel = (node: infoDonViTrucThuoc) => node.level;

  isExpandable = (node: infoDonViTrucThuoc) => node.expandable;

  getChildren = (node: infoDiaBan): infoDiaBan[] => node.children;

  getMa = (node: infoDiaBan): infoDiaBan[] => node.ma;

  hasChild = (_: number, _nodeData: infoDonViTrucThuoc) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: infoDonViTrucThuoc) => _nodeData.item === "";

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: infoDiaBan, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.item === node.item
        ? existingNode
        : new infoDonViTrucThuoc();
    flatNode.item = node.item;
    flatNode.ma = node.ma;
    flatNode.level = level;
    flatNode.expandable = !!node.children;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: infoDonViTrucThuoc): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    return descAllSelected;
  }

 



 


  

  getSelectedItems(): string {
    if (!this.checklistSelection.selected.length) return "Favorite Food";
    return this.checklistSelection.selected.map(s => s.item).join(",");
  }

  

  /* ------ hết hàm xử lý treeview checkbox ----------- */

}
