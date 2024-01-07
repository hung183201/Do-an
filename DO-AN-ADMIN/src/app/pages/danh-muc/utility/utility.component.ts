import { Component, OnInit, Input, ViewChild, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import * as _moment from 'moment';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  TrangThai, Utility, UtilityManageClient, UtilityRequest } from 'app/api-client';
import {  IAppTableOptions,  IOption, ITableColumn, Paging, PagingDefault,  } from 'app/shared/model/commonModels';
import { ModalService } from 'app/shared/services/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { UtilityCreatOrUpdateComponent } from './createorupdate-utility/createorupdate-utility.component';

@Component({
  selector: 'app-utility',
  templateUrl: './utility.component.html',
  styleUrls: ['./utility.component.scss' ],
  // encapsulation: ViewEncapsulation.None,
//   providers: [
//     { provide: NgbDateAdapter, useClass: CustomAdapter },
//     { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
//   ]
        })


  export class UtilityComponent implements OnInit {
    active = 1; // Basic Navs
  constructor() { }

  ngOnInit() {
  }
  }