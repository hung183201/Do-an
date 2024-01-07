import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { FileResponse, HotelDetailsClient, HotelManageClient, HotelUtilityGroupClient } from 'src/app/api-client';

@Component({
    selector: 'app-hotel-details-page',
    templateUrl: './hotel-details-page.component.html',
    styleUrls: ['./hotel-details-page.component.scss']
})
export class HotelDetailsPageComponent implements OnInit {

    datePickerConfig = {
        format: 'YYYY-MM-DD'
    };
    public id: any;
    hotel: any =null;
    utylity : any =[];
    apiUrl: string = "";

    constructor(private activatedRoute: ActivatedRoute,
        private hotelManageClient: HotelManageClient,
        private hotelUtilityGroup :HotelUtilityGroupClient,
        private hotelDetailsClient :HotelDetailsClient,
        private router: Router,
        ) { }

    ngOnInit(): void {
        this.id = this.activatedRoute.snapshot.queryParams['id'];
        this.apiUrl = 'https://localhost:5001/api/HotelUtilityGroup';
        this.getHotel();
        this.getTienIch();
    }
    getHotel(){
        this.hotelDetailsClient.search(this.id).subscribe(res =>{
            if(!res.errors &&res.data){
                this.hotel = res.data[0];
                console.log(this.hotel);
            }
            else{
                var valueUrl = '/';
                 this.router.navigateByUrl(valueUrl);
            }
        })
    }
    getTienIch(){
        var apiUrl = `${this.apiUrl}/SearchUtilityByGroup?hotelId=${this.id}&utilityId=${0}&isInGroup=${1}`;
        this.hotelUtilityGroup.searchUtilityByGroup(this.id,0,1,null).subscribe(res =>{
            if(res){
                this.utylity = res.headers;
                console.log(this.utylity);
                console.log(res.data);
            }
            else{
                var valueUrl = '/';
                 this.router.navigateByUrl(valueUrl);
            }
        })
    }

}