import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-cruises-page',
    templateUrl: './cruises-page.component.html',
    styleUrls: ['./cruises-page.component.scss']
})
export class CruisesPageComponent implements OnInit {

    datePickerConfig = {
        format: 'YYYY-MM-DD'
    };

    constructor() { }

    ngOnInit(): void {}

}