import { AfterViewInit, Component, OnInit } from '@angular/core';

import { FieldBaseComponent } from '../field-base';
import * as _ from 'lodash';
declare var $: any;
@Component({
    selector: 'app-form-file',
    styleUrls: ['form-file.component.scss'],
    templateUrl: 'form-file.component.html'
})
export class FormFileComponent extends FieldBaseComponent implements OnInit, AfterViewInit {

    imageError: string;
    isImageSaved: boolean;
    cardImageBase64: string;
    ngOnInit() {

    }


    ngAfterViewInit(): void {
    }

    fileChangeEvent(fileInput: any) {
        this.imageError = null;
        if (fileInput.target.files && fileInput.target.files[0]) {
            // Size Filter Bytes
            const max_size = 209715200;
            const allowed_types = ['image/png', 'image/jpeg', 'image/png', 'image/gif'];
            const max_height = 15200;
            const max_width = 25600;

            if (fileInput.target.files[0].size > max_size) {
                this.imageError =
                    'Maximum size allowed is ' + max_size / 1000 + 'Mb';

                return false;
            }

            if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
                this.imageError = 'Only Images are allowed ( JPG | JPEG | PNG | GIF )';
                return false;
            }
            const reader = new FileReader();
            reader.onload = (e: any) => {
                const image = new Image();
                image.src = e.target.result;
                image.onload = rs => {
                    const img_height = rs.currentTarget['height'];
                    const img_width = rs.currentTarget['width'];

                    console.log(img_height, img_width);


                    if (img_height > max_height && img_width > max_width) {
                        this.imageError =
                            'Maximum dimentions allowed ' +
                            max_height +
                            '*' +
                            max_width +
                            'px';
                        return false;
                    } else {
                        const imgBase64Path = e.target.result;
                        this.cardImageBase64 = imgBase64Path;
                        this.isImageSaved = true;
                    }
                };
            };

            reader.readAsDataURL(fileInput.target.files[0]);
        }
    }
}