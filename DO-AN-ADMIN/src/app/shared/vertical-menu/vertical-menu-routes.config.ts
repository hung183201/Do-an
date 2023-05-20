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
      { path: '/danh-muc/tien-ich', title: 'Tiện ích', icon: 'ft-arrow-right submenu-icon', code: '21082', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/danh-muc/cms-user', title: 'Tiện ích2', icon: 'ft-arrow-right submenu-icon', code: '22086', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/admin/cms-post', title: 'Danh mục bài viết', icon: 'ft-arrow-right submenu-icon', code: '22087', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/admin/cms-setting', title: 'Nội dung khác', icon: 'ft-arrow-right submenu-icon', code: '22088', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/admin/cms-user', title: 'Quản trị người dùng', icon: 'ft-arrow-right submenu-icon', code: '11003', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/admin/cms-config', title: 'Cấu hình hệ thống', icon: 'ft-arrow-right submenu-icon', code: '22088', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    ]
  }
];
