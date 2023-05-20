import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StorageMinioService {
  constructor(private http: HttpClient) { }

  UploadFileWithPresignedUrlAsync(paraPresignedUrl: string, paraInputObject: File): Observable<HttpEvent<any>> {
    // const  localContentType = paraInputObject.type;
    // const localformData: FormData = new FormData();
    // localformData.append('file', paraInputObject);
    // const localHeaders = new Headers({
    //   'Content-Type': localContentType
    // });

    // const response = await fetch(paraPresignedUrl, {
    //   method: 'PUT',
    //   body: localformData,
    //   headers: localHeaders,
    //   // mode: 'cors'
    // });

    // return response;
    console.log(paraPresignedUrl);
    const req = new HttpRequest("PUT", paraPresignedUrl, paraInputObject, {
      reportProgress: true,
      responseType: 'json'
    })
    return this.http.request(req);
  }
}

