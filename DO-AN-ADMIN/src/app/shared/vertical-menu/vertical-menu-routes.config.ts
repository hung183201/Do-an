import { RouteInfo } from './vertical-menu.metadata';

//Sidebar menu Routes and data
export const ROUTES: RouteInfo[] = [

  {
    path: '/dashboard/dashboard', title: 'Bảng tổng quan', icon: 'ft-home', code: '14070', class: 'has-sub', badge: '', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false, submenu: [
      // { path: '/dashboard/dashboard', title: 'Dashboard', icon: 'ft-arrow-right submenu-icon', code: '14070', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    ]
  },
  {
    path: 'danh-muc', title: 'Danh Mục', icon: 'ft-command', code: '21082', class: 'has-sub', badge: '', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false,
    submenu: [
      { path: '/danh-muc/khach-san', title: 'Khách sạn', icon: 'ft-arrow-right submenu-icon', code: '21082', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/danh-muc/tien-ich', title: 'Tiện ích', icon: 'ft-arrow-right submenu-icon', code: '21082', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/danh-muc/loai-phong', title: 'Loại phòng', icon: 'ft-arrow-right submenu-icon', code: '21082', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/danh-muc/tien-ich2', title: 'Dịch vụ', icon: 'ft-arrow-right submenu-icon', code: '21082', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    ]
  },
  {   
    path: 'back-office', title: 'Trang nghiệp vụ', icon: 'ft-git-pull-request', code: '14070', class: 'has-sub', badge: '', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false,
    submenu: [
    ]
  },
  {   
    path: 'back-office', title: 'Thống kê', icon: 'ft-git-pull-request', code: '14070', class: 'has-sub', badge: '', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false,
    submenu: [
      //{ path: '/back-office/reg-form-statistic', title: 'Thống kê phiếu', icon: 'ft-arrow-right submenu-icon', code: '22089', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    ]
  },
];
