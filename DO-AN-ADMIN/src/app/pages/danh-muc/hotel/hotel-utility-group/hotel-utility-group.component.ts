import { Component, Input, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { IOption, PagingDefault } from 'app/shared/model/commonModels';
import { HotelUtilityGroupClient, Utility } from 'app/api-client';
import { DataService } from 'app/shared/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'app-hotel-utility-group',
    templateUrl: './hotel-utility-group.component.html',
    styleUrls: ['./hotel-utility-group.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HotelUtilityGroupComponent implements OnInit {
    @ViewChild('paginatorNotInGroup', { static: true }) paginatorNotInGroup: MatPaginator;
    @ViewChild('paginatorInGroup', { static: true }) paginatorInGroup: MatPaginator;
    @Input() hotelId;
    @Input() moduleId;
    @Input() listModules: IOption[];
    expanded: any = {};
    timeout: any;
    //childTempRows: any[];
    checkedAllNotInGroup: boolean;
    checkedAllInGroup: boolean;
    actionsInGroup = new MatTableDataSource<any>();
    actionsNotInGroup = new MatTableDataSource<any>();
    defaultModuleInGroup: number;
    defaultModuleNotInGroup: number;
    selectionInGroup = new SelectionModel<Utility>(true, []);
    selectionNotInGroup = new SelectionModel<Utility>(true, []);
    displayedColumns: string[] = ['STT', 'Detail', 'Select'];
    pageSizeOptions: number[] = PagingDefault.pageSizeOptions;
    searchChangeObserver;
    apiUrl: string;

    hasAssignActionRights: boolean = true;
    hasViewRights: boolean = true;


    constructor(
        private hotelUtilityGroupClient: HotelUtilityGroupClient,
        private dataChildService: DataService,
        private childToastr: ToastrService,
        private childCD: ChangeDetectorRef,
        public activeModal: NgbActiveModal,
        
    ) {

    }
    ngOnInit() {
        var lblThongBao = (<HTMLLabelElement>document.getElementById("lblThongBao"));
        if (lblThongBao) {
            lblThongBao.innerText = '';
        }
        this.actionsInGroup.paginator = this.paginatorInGroup;
        this.actionsNotInGroup.paginator = this.paginatorNotInGroup;
        this.checkedAllInGroup = false;
        this.checkedAllNotInGroup = false;
        this.defaultModuleInGroup = 0;
        this.defaultModuleNotInGroup = this.moduleId;
        this.apiUrl = 'https://localhost:5001/api/HotelUtilityGroup';
        this.getData("", 0, this.defaultModuleNotInGroup);
        this.getData("", 1, this.defaultModuleInGroup);
    }
  
    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected(isInGroup) {
        var numSelected;
        var numRows;
        if (isInGroup == 1) {
            numSelected = this.selectionInGroup.selected.length;
            numRows = this.actionsInGroup.data.length;
        }
        else {
            numSelected = this.selectionNotInGroup.selected.length;
            numRows = this.actionsNotInGroup.data.length;
        }
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle(isInGroup) {
        var isAll = this.isAllSelected(isInGroup);
        if (isInGroup == 1) {
            isAll ? this.selectionInGroup.clear() :
                this.actionsInGroup.data.forEach(row => this.selectionInGroup.select(row));
        }
        else {
            isAll ? this.selectionNotInGroup.clear() :
                this.actionsNotInGroup.data.forEach(row => this.selectionNotInGroup.select(row));
        }
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(isInGroup, row?: Utility): string {
        if (!row) {
            return `${this.isAllSelected(isInGroup) ? 'select' : 'deselect'} all`;
        }
        if (isInGroup == 1) {
            return `${this.selectionInGroup.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
        }
        else {
            return `${this.selectionNotInGroup.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
        }

    }
    onModuleChanged(event, isInGroup) {
        
        var filter = "";
        if (isInGroup == 1) {
            filter = (<HTMLTextAreaElement>document.getElementById("txtSearchActionsInGroup")).value.toLowerCase();
        }
        else {
            filter = (<HTMLTextAreaElement>document.getElementById("txtSearchActionsNotInGroup")).value.toLowerCase();
        }
        this.getData(filter, isInGroup, event);
    }
    getData(filter, isInGroup, moduleId) {
        var apiUrl = `${this.apiUrl}/SearchUtilityByGroup?hotelId=${this.hotelId}&utilityId=${moduleId}&isInGroup=${isInGroup}&filter=${filter}`;
        this.dataChildService.get<Array<any>>(apiUrl)
            .subscribe(data => {
                if (isInGroup === 1) {
                    this.actionsInGroup.data = data;
                }
                else {
                    this.actionsNotInGroup.data = data;
                }
                this.childCD.markForCheck();
            });
    }
    moveSelected(direction) {
        var actions: number[] = [];
        if (direction == 'right') {
            if (this.selectionNotInGroup.selected.length == 0) {
                alert('Chọn chức năng cần thêm vào nhóm!');
                return;
            }
            for (let action of this.selectionNotInGroup.selected) {
                actions.push(action.id);
            }
            var apiUrl = `${this.apiUrl}/InsertUtilityIntoGroup/${this.hotelId}`;
            this.dataChildService.put(apiUrl, actions)
                .subscribe(() => {
                    for (let action of this.selectionNotInGroup.selected) {
                        this.actionsNotInGroup.data = this.actionsNotInGroup.data.filter(x => x.id !== action.id);
                    }
                    this.selectionNotInGroup.clear();
                    this.childToastr.success('Đã thêm thành công.', 'Thông báo');
                    this.getData((<HTMLTextAreaElement>document.getElementById("txtSearchActionsInGroup")).value.toLowerCase(), 1,
                        this.defaultModuleInGroup);
                    this.childCD.markForCheck();
                });
        }
        if (direction == 'left') {
            if (this.selectionInGroup.selected.length == 0) {
                alert('Chọn chức năng cần loại khỏi nhóm!');
                return;
            }
            for (let action of this.selectionInGroup.selected) {
                actions.push(action.id);

            }
            var apiUrl = `${this.apiUrl}/DeleteUtilityFromGroup/${this.hotelId}`;
            this.dataChildService.put(apiUrl, actions)
                .subscribe(() => {
                    for (let action of this.selectionInGroup.selected) {
                        this.actionsInGroup.data = this.actionsInGroup.data.filter(x => x.id !== action.id);
                        this.actionsNotInGroup.data.push(action);
                    }
                    this.selectionInGroup.clear();
                    this.childToastr.success('Đã bỏ thành công.', 'Thông báo');
                    this.getData((<HTMLTextAreaElement>document.getElementById("txtSearchActionsNotInGroup")).value.toLowerCase(), 0,
                        this.defaultModuleNotInGroup);
                    this.childCD.markForCheck();
                });

        }
    }
    moveAll(direction) {
        var actionIds = '';
        var actions: number[] = [];
        if (direction == 'right') {
            if (this.actionsNotInGroup.data.length == 0) {
                alert('Không có chức năng nào cần thêm vào nhóm!');
                return;
            }
            for (let action of this.actionsNotInGroup.data) {
                actions.push(action.id);
            }
            var apiUrl = `${this.apiUrl}/InsertUtilityIntoGroup/${this.hotelId}`;
            this.dataChildService.put(apiUrl, actions)
                .subscribe(() => {
                    //for (let action of this.actionsNotInGroup.data) {
                    //    this.actionsInGroup.data.push(action);
                    //}
                    //alert(this.actionsInGroup.data.length);
                    this.actionsNotInGroup.data = [];
                    this.selectionNotInGroup.clear();
                    this.checkedAllNotInGroup = false;
                    this.childToastr.success('Đã thêm thành công.', 'Thông báo');
                    this.getData((<HTMLTextAreaElement>document.getElementById("txtSearchActionsInGroup")).value.toLowerCase(), 1,
                        this.defaultModuleInGroup);
                    this.childCD.markForCheck();
                });
        }
        if (direction == 'left') {
            if (this.actionsInGroup.data.length == 0) {
                alert('Không có action nào cần loại khỏi nhóm!');
                return;
            }
            for (let action of this.actionsInGroup.data) {
                actions.push(action.id);
            }
            this.hotelUtilityGroupClient.deleteUtilityFromGroup(this.hotelId,actions)
                .subscribe(() => {
                    //for (let action of this.actionsInGroup.data) {
                    //    this.actionsNotInGroup.data.push(action);
                    //}
                    //alert(this.actionsNotInGroup.data.length);
                    this.actionsInGroup.data = [];
                    this.selectionInGroup.clear();
                    this.checkedAllInGroup = false;

                    this.childToastr.success('Đã bỏ thành công.', 'Thông báo');
                    this.getData((<HTMLTextAreaElement>document.getElementById("txtSearchActionsNotInGroup")).value.toLowerCase(), 0,
                        this.defaultModuleNotInGroup);
                    this.childCD.markForCheck();
                });

        }
    }

    onSearchChange(searchValue: string, isInGroup: number) {
        var filterObject = {
            newText: searchValue,
            isInGroup: isInGroup
        };
        if (!this.searchChangeObserver) {

            Observable.create(observer => {

                    this.searchChangeObserver = observer;

                }).pipe(debounceTime(500)) // wait 500ms after the last event before emitting last event
                .pipe(distinctUntilChanged()) // only emit if value is different from previous value
                .subscribe((filterObject) => {
                    const val = filterObject.newText.toLowerCase();
                    this.getData(val, filterObject.isInGroup, filterObject.isInGroup === 1 ? this.defaultModuleInGroup : this.defaultModuleNotInGroup);
                });
        }

        this.searchChangeObserver.next(filterObject);
    }

}
