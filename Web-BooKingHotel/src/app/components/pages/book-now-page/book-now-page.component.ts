import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-book-now-page',
    templateUrl: './book-now-page.component.html',
    styleUrls: ['./book-now-page.component.scss']
})
export class BookNowPageComponent implements OnInit {

    datePickerConfig = {
        format: 'YYYY-MM-DD'
    };

    constructor() { }

    ngOnInit(): void {}

}