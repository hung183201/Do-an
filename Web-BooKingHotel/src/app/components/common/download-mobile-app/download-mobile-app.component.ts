import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-download-mobile-app',
    templateUrl: './download-mobile-app.component.html',
    styleUrls: ['./download-mobile-app.component.scss']
})
export class DownloadMobileAppComponent implements OnInit {

    constructor(
        public router: Router
    ) { }

    ngOnInit(): void {}

}