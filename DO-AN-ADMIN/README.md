# Apex

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.0.

## Development server

Run `ng serve` or `ng serve -aot` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


# How to build: 
## 1. Phiên bản node module của APEX theme yêu cầu đúng phiên bản 16.3.0
## 2. Nếu sai phiên bản node module thì Cài đặt chương trình quản lý phiên bản nuget NVM
Đường dẫn chương trình https://github.com/coreybutler/nvm-windows/releases
Sau khi cài đặt thành công sử dụng commnand   'nvm list' để kiểm tra các phiên bản node module hiện đang cài đặt

## 3. Cài đặt node module version 16.3.0 bằng chương trình quản lý phiên bản nvm
Gõ command nvm install 16.3.0

## 4. Chuyển môi trường node module vể version 16.3.0 để chạy
Gõ command nvm use 16.3.0

# How to deploy: 
Link tham khảo https://indepth.dev/posts/1239/deploy-an-angular-application-to-iis
## tóm lại gõ lệnh
ng build --base-href "/vnpt-ilis-frontend-sfm-bnh/" --configuration production

# bổ sung thư viện
## 11/10/2022
npm i ng2-search-filter : thư viện hỗ trợ tìm kiếm data trên giao diện (không gọi api) áp dụng trong thư mục profile

## 12/10/2022
npm i ng-apexcharts : thư viện vẽ biểu đồ áp dụng trong thư mục dashboard
'@swimlane/ngx-charts' npm i trong package.json

## 03/11/2022
npm i "@angular/material": "^12.0.3" : thư viện material áp dụng phần tree view checkbox quyền dữ liệu trong Chỉnh sửa quyền dữ liệu người dùng

npm i "@angular/cdk": "^12.0.3": nâng cdk lên version 12.0.3

thêm "mserve": "set NODE_OPTIONS=--max_old_space_size=8192 & ng serve --open" vào script trong package.json để chạy thư viện material

## 16/11/2022
bổ sung thêm biến deployUrl để khai báo máy chủ deploy web, dùng trong trường hợp deploy trên sub-domain, angular không tự lấy ra sub-domain được khi dùng để mở tab mới

## 01/12/2022
npm i sweetalert2@10.11.1 : thêm thư viện custom thông báo
thêm "node_modules/sweetalert2/dist/sweetalert2.min.css" vào style trong angular.json để chạy thư viện sweetalert2

## 08/12/2022
npm i "@syncfusion/ej2-angular-richtexteditor": "^19.4.44" : thêm thư viện dùng html editor
