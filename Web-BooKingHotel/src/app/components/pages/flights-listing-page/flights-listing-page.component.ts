import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-flights-listing-page',
    templateUrl: './flights-listing-page.component.html',
    styleUrls: ['./flights-listing-page.component.scss']
})
export class FlightsListingPageComponent implements OnInit {

    datePickerConfig = {
        format: 'YYYY-MM-DD'
    };

    constructor() { }

    ngOnInit(): void {}

}