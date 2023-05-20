import { RouteInfo } from '../vertical-menu/vertical-menu.metadata';

export const HROUTES: RouteInfo[] = [
  {
    path: '', title: 'Dashboard', code:'1', icon: 'ft-home', class: 'dropdown nav-item has-sub', isExternalLink: false,
    submenu: [
      { path: '/dashboard/dashboard', code:'1',title: 'Dashboard', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
    ]
  }
  
];
