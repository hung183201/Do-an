import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hotel, HotelManageClient } from 'src/app/api-client';

@Component({
    selector: 'app-hotels-listing-page',
    templateUrl: './hotels-listing-page.component.html',
    styleUrls: ['./hotels-listing-page.component.scss']
})
export class HotelsListingPageComponent implements OnInit {

    datePickerConfig = {
        format: 'YYYY-MM-DD'
    };
    hotelList : any
    constructor(
    private hotelManageClient: HotelManageClient,
    private router: Router,
    ) { }

    ngOnInit(): void {
        this.getdata();
    }

    getdata(){
        this.hotelManageClient.getAll().subscribe(res => {
            if(!res.errors && res.data){
                this.hotelList = res.data;
            }
        })

    }

    detailData(row:any) {
        var valueUrl = '/hotel-details';
        this.router.navigate([valueUrl], { queryParams: { 'id': row.id } });
        // this.router.navigateByUrl(valueUrl);
    }
}