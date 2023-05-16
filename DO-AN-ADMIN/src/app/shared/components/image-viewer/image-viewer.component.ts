import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnInit {
  @Input('base64Data') base64Data: any;
  imgUrl: any;

  constructor() { }

  ngOnInit(): void {
    this.imgUrl = "data:image/png;base64," + this.base64Data;
    // console.log(this.imgUrl);
  }
}
