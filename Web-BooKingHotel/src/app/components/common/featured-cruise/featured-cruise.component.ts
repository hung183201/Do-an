import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-featured-cruise',
    templateUrl: './featured-cruise.component.html',
    styleUrls: ['./featured-cruise.component.scss']
})
export class FeaturedCruiseComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {}

    cruiseSlides: OwlOptions = {
		nav: true,
		loop: true,
		margin: 25,
		dots: false,
		autoplay: true,
		smartSpeed: 2000,
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
				items: 2
			},
			935: {
				items: 3
			},
			1200: {
				items: 3
			}
		}
    }

}