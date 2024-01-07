import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-hotels',
    templateUrl: './hotels.component.html',
    styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit {

    constructor(
        public router: Router
    ) { }

    ngOnInit(): void {}

}