import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-hmdt-banner',
    templateUrl: './hmdt-banner.component.html',
    styleUrls: ['./hmdt-banner.component.scss']
})
export class HmdtBannerComponent implements OnInit {

    datePickerConfig = {
        format: 'YYYY-MM-DD'
    };

    constructor() { }

    ngOnInit(): void {}

}