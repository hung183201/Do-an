import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';

@Component({
    selector: 'app-popular-cruise',
    templateUrl: './popular-cruise.component.html',
    styleUrls: ['./popular-cruise.component.scss']
})
export class PopularCruiseComponent implements OnInit {

    constructor(
        public router: Router
	) { }

    ngOnInit(): void {}

    propertiesSlides: OwlOptions = {
		nav: true,
		loop: true,
		margin: 25,
		dots: false,
		autoplay: true,
		smartSpeed: 1000,
		autoplayHoverPause: true,
		navText: [
			"<i class='ri-arrow-left-line'></i>",
			"<i class='ri-arrow-right-line'></i>",
		],
		responsive: {
			0: {
				items: 1
			},
			515: {
				items: 2
			},
			695: {
				items: 3
			},
			935: {
				items: 4
			},
			1200: {
				items: 4
			}
		}
    }

}