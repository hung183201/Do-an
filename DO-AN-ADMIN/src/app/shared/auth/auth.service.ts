import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { BehaviorSubject, EMPTY, Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { map } from 'rxjs/operators';
import { switchMap, mergeMap as _observableMergeMap, catchError as _observableCatch, first } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { OauthServiceTokenResult, OauthServiceLocalStorage } from '../models/common/atom/oauthtoken-result';
//import { AddResultViewModel } from '../models/common/atom/add-result-viewmodel';
import { ApiResult, ApiCode } from '../models/common/atom/api-result';
import { ProfileNguoiDungViewModel } from '../models/common/account/profile-nguoi-dung-viewmodel';
import { promise } from 'protractor';

@Injectable()
export class AuthService {

  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;
  private userSubject: BehaviorSubject<OauthServiceLocalStorage>;
  public user: Observable<OauthServiceLocalStorage>;


  constructor(public router: Router, private http: HttpClient) {

    this.userSubject = new BehaviorSubject<OauthServiceLocalStorage>(null);
    this.user = this.userSubject.asObservable();


    let valueLocalStorage = this.getLocalStorage();
    if (valueLocalStorage) {
      var isValid = this.isLocalTokenStillValidated(valueLocalStorage);
      if (isValid) {
        this.userSubject.next(valueLocalStorage);
        this.refreshToken();
      }
    }
  }

  public get userValue(): OauthServiceLocalStorage {

    return this.userSubject.value;
  }

  public signupUser(email: string, password: string) {
    //your code for signing up the new user
  }


  public signinUser(email: string, password: string, rememberMe: boolean) {//: Observable<OauthServiceLocalStorage>

    //let rememberMe: boolean = true;
    var obsResult = this.fetchTokenUsingPasswordFlow(email, password).pipe(switchMap(tokenResult =>

      this.getUserInfoFromServer(tokenResult.token_type, tokenResult.access_token).pipe(map(user => {

        var localStore = this.initLocalStorage(email, password, rememberMe, tokenResult, user.data);
        this.userSubject.next(localStore);
        this.setLocalStorage(localStore);
        this.startRefreshTokenTimer();
        return localStore;
      }))

    ));

    return obsResult;

  }


  private getAccessToken(): string {

    let valueLocalStorage = this.getLocalStorage();

    if (valueLocalStorage != null) {

      var iStart = valueLocalStorage.access_token_stored_at;
      var iStop = valueLocalStorage.expires_at;
      if (iStart != null && iStop != null) {
        var iExcepted = iStart + ((iStop - iStart) * environment.authTimeoutFactor);

        var dateTime = new Date();
        var datetimeNow = dateTime.getTime();

        if (datetimeNow > iExcepted) {
          //this.refreshToken().;
        }
        console.log("interval check token");
      }
      //return valueLocalStorage?.access_token;
    }

    return null;
  }

  public refreshToken() {//: Observable<OauthServiceLocalStorage>

    if (this.userValue && this.userValue.refresh_token) {
      var obsResult = this.fetchTokenUsingRefreshFlow(this.userValue.refresh_token).pipe((map(tokenResult => {
        var localStore = this.userValue;

        var dateTime = new Date();
        var datetimeNow = dateTime.getTime();

        localStore.access_token = tokenResult.access_token;
        localStore.refresh_token = tokenResult.refresh_token;


        localStore.access_token_stored_at = datetimeNow;
        localStore.expires_at = datetimeNow + (tokenResult.expires_in * 1000);//because expires_in is second, datetimeNow is milisecond

        this.userSubject.next(localStore);
        this.setLocalStorage(localStore);
        this.startRefreshTokenTimer();

        return localStore;
      })
      ));
      return obsResult;
    }
  }

  private refreshTokenTimeout;
  /**
   * Hẹn giờ trước khi hết hạn token 1 phút thì gọi gàm refresh token
   * */
  private startRefreshTokenTimer() {

    var dateTime = new Date();
    var datetimeNow = dateTime.getTime();
    // set a timeout to refresh the token a minute before it expires
    const timeout = this.userValue.expires_at - datetimeNow - (60 * 1000);
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
    //The setTimeout() method calls a function after a number of milliseconds.
    //The setTimeout() is executed only once.
    //If you need repeated executions, use setInterval() instead.
  }

  /**
   * Hủy hẹn giờ refresh token
   * */
  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }

  /**
   * Lấy refresh token trong local, có check thời điểm hết hạn (đệm 30s),
   * return 'null' nếu không có hoặc không có giá trị hợp lệ.
   * */
  private getLocalRefreshToken(): string {
    var localStorageValue = this.getLocalStorage();
    var isValid = this.isLocalTokenStillValidated(localStorageValue);
    return isValid ? localStorageValue.refresh_token : null;
  }

  /**
   * Lấy access token trong local, có check thời điểm hết hạn (đệm 30s),
   * return 'null' nếu không có hoặc không có giá trị hợp lệ.
   * */
  private getLocalAccessToken(): string {
    var localStorageValue = this.getLocalStorage();
    var isValid = this.isLocalTokenStillValidated(localStorageValue);
    return isValid ? localStorageValue.access_token : null;
  }


  /**
   * Kiểm tra xem local token có hay không, có hợp lệ hay không, return 'true' nếu còn hợp lệ
   * @param localStorageVal
   */
  private isLocalTokenStillValidated(localStorageVal: OauthServiceLocalStorage): boolean {
    if (localStorageVal == null) return false;
    else {

      var iStart = localStorageVal.access_token_stored_at;
      var iStop = localStorageVal.expires_at;
      if (iStart != null && iStop != null) {

        var iExcepted = iStart + (iStop - 30 * 1000 - iStart);//đệm 30s

        var dateTime = new Date();
        var datetimeNow = dateTime.getTime();

        if (datetimeNow > iExcepted) {
          return false;
        }
        return true;
      }
    }
  }




  /**
     * Đổi tên đăng nhập và mật khẩu để lấy token
     * @param username (tên đăng nhập)
     * @param password (mật khẩu)
     * @param rememberMe (nhớ mật khẩu)
     */
  private fetchTokenUsingPasswordFlowAndLoadUserProfile(username: string, password: string, rememberMe: boolean): Observable<OauthServiceTokenResult> {

    let url_ = environment.authUrl + environment.authTokenPath;

    const body = new HttpParams()
      .set(`client_id`, environment.authClientId)
      .set(`client_secret`, environment.authClientSecret)
      .set(`grant_type`, 'password')
      .set(`username`, username)
      .set(`password`, password)
      ;
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(url_, body.toString(), { headers, observe: 'response', responseType: "blob" }).pipe(_observableMergeMap((response_: any) => {
      return this.processLogin(response_);
    }));


  }

  /**
   * Call API Get thông tin người dùng khi đã đăng nhập thành công
   * @param token_type
   * @param access_token
   */
  private getUserInfoFromServer(token_type: string, access_token: string): Observable<ApiResult<ProfileNguoiDungViewModel>> {

    const requestUri = environment.authUrl + environment.authUserInfoPath;
    //let requestHeaders = new HttpHeaders();
    //requestHeaders = requestHeaders.set('Content-Type', 'application/json; charset=utf-8');
    //requestHeaders = requestHeaders.set('Authorization', `${token_type} ${access_token}`);

    const headers = { 'Authorization': `${token_type} ${access_token}`, 'Content-Type': 'application/json; charset=utf-8' }

    return this.http.get<ApiResult<ProfileNguoiDungViewModel>>(`${requestUri}`, { headers });
  }

  /**
   * Call API Get Token theo Username & Password
   * @param username
   * @param password
   */
  private fetchTokenUsingPasswordFlow(username: string, password: string): Observable<OauthServiceTokenResult> {

    const requestUri = environment.authUrl + environment.authTokenPath;

    const body = new HttpParams()
      .set(`client_id`, environment.authClientId)
      .set(`client_secret`, environment.authClientSecret)
      .set(`grant_type`, 'password')
      .set(`username`, username)
      .set(`password`, password);


    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post<OauthServiceTokenResult>(`${requestUri}`, body.toString(), { headers });
  }

  /**
 * Call API Get Token theo refreshToken
 * @param refreshToken
 */
  private fetchTokenUsingRefreshFlow(refreshToken: string): Observable<OauthServiceTokenResult> {

    const requestUri = environment.authUrl + environment.authTokenPath;

    const body = new HttpParams()
      .set(`client_id`, environment.authClientId)
      .set(`client_secret`, environment.authClientSecret)
      .set(`grant_type`, 'refresh_token')
      .set(`refresh_token`, refreshToken);

    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post<OauthServiceTokenResult>(`${requestUri}`, body.toString(), { headers });

  }

  private getLocalStorage(): OauthServiceLocalStorage {
    let valueLocalStorage: OauthServiceLocalStorage = null;
    var strOauthService = localStorage.getItem('OauthService');
    if (strOauthService != null) {

      let jsonObj: any = JSON.parse(strOauthService); // string to generic object first

      valueLocalStorage = new OauthServiceLocalStorage();
      valueLocalStorage.access_token = jsonObj.access_token;
      valueLocalStorage.access_token_stored_at = jsonObj.access_token_stored_at;
      valueLocalStorage.expires_at = jsonObj.expires_at;
      valueLocalStorage.refresh_token = jsonObj.refresh_token;
      valueLocalStorage.remember_me = jsonObj.remember_me;
      valueLocalStorage.token_type = jsonObj.token_type;
      valueLocalStorage.id_token_claims_obj = jsonObj.id_token_claims_obj;
    }
    return valueLocalStorage;
  }

  private initLocalStorage(username: string, password: string, rememberMe: boolean, tokenResult: OauthServiceTokenResult, userInfo: ProfileNguoiDungViewModel): OauthServiceLocalStorage {

    let value2SaveLocalStorage: OauthServiceLocalStorage = new OauthServiceLocalStorage();
    var dateTime = new Date();
    var datetimeNow = dateTime.getTime();

    if (rememberMe) {
      value2SaveLocalStorage.remember_me = rememberMe;
      value2SaveLocalStorage.remember_me_username = username;
      localStorage.remember_me_security_stamp = this.newGuid();
      //npm install crypto-js --save
      //import * as CryptoJS from 'crypto-js';
      //this.conversionEncryptOutput = CryptoJS.AES.encrypt(this.plainText.trim(), this.encPassword.trim()).toString();
      // this.conversionDecryptOutput = CryptoJS.AES.decrypt(this.encryptText.trim(), this.decPassword.trim()).toString(CryptoJS.enc.Utf8);
      //localStorage.remember_me_password_hash = md5Encrypt(password, localStorage.remember_me_security_stamp, true);
    }
    else {
      value2SaveLocalStorage.remember_me = false;
    }
    value2SaveLocalStorage.token_type = tokenResult.token_type;
    value2SaveLocalStorage.access_token = tokenResult.access_token;
    value2SaveLocalStorage.refresh_token = tokenResult.refresh_token;
    value2SaveLocalStorage.access_token_stored_at = datetimeNow;
    value2SaveLocalStorage.expires_at = datetimeNow + (tokenResult.expires_in * 1000);//because expires_in is second, datetimeNow is milisecond
    value2SaveLocalStorage.id_token_claims_obj = userInfo;
    return value2SaveLocalStorage;

  }


  //private setLocalStorage(username: string, password: string, rememberMe: boolean, tokenResult: OauthServiceTokenResult, userInfo: ProfileNguoiDungViewModel): void {
  //  let value2SaveLocalStorage = this.initLocalStorage(username, password, rememberMe, tokenResult, userInfo);
  //  localStorage.setItem('OauthService', JSON.stringify(value2SaveLocalStorage));
  //}

  private setLocalStorage(input: OauthServiceLocalStorage): void {
    localStorage.setItem('OauthService', JSON.stringify(input));
  }

  private removeLocalStorage(): void {
    localStorage.removeItem('OauthService');
  }

  /**
   * Sinh GUID random
   * */
  private newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  private processLogin(response: HttpResponseBase): Observable<OauthServiceTokenResult> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
    if (status === 200) {
      return this.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {

        console.log('successfully logged in');
        let jsonObj: any = JSON.parse(_responseText); // string to generic object first
        let result200: OauthServiceTokenResult = <OauthServiceTokenResult>jsonObj;

        var dateTime = new Date();
        var datetimeNow = dateTime.getTime();

        let value2SaveLocalStorage = new OauthServiceLocalStorage();
        let rememberMe = true;//@Duy  Làm sao để truyền biến từ hàm kia vào đây nhỉ???

        if (rememberMe) {
          value2SaveLocalStorage.remember_me = true;
        }
        else {
          value2SaveLocalStorage.remember_me = false;
          //value2SaveLocalStorage.remember_me_username = username;
          //localStorage.remember_me_security_stamp = Guid.NewGuid().ToString();
          //localStorage.remember_me_password_hash = md5Encrypt(password, localStorage.remember_me_security_stamp, true);
        }
        value2SaveLocalStorage.token_type = result200.token_type;
        value2SaveLocalStorage.access_token = result200.access_token;
        value2SaveLocalStorage.refresh_token = result200.refresh_token;
        value2SaveLocalStorage.access_token_stored_at = datetimeNow;
        value2SaveLocalStorage.expires_at = datetimeNow + (result200.expires_in * 1000);//because expires_in is second, datetimeNow is milisecond
        //localStorage.id_token_claims_obj = getUserInfoFromServer(lstPhong.token_type, lstPhong.access_token);

        //this.lo

        localStorage.setItem('OauthService', JSON.stringify(value2SaveLocalStorage));
        return _observableOf(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      console.warn('@Duy hoi mr Tu cach bao loi neu dang nhap khong thanh cong!');
      return _observableOf<OauthServiceTokenResult>(<any>null);
      //return this.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
      //  return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      //}));
    }
    //return _observableOf<OauthServiceTokenResult>(<any>null);
  }

  private processRefresh(response: HttpResponseBase): Observable<OauthServiceTokenResult> {
    const status = response.status;
    const responseBlob = response instanceof HttpResponse ? response.body : (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let valueLocalStorage = this.getLocalStorage();

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
    if (status === 200) {
      return this.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {

        console.log('successfully refreshToken');
        let jsonObj: any = JSON.parse(_responseText); // string to generic object first
        let result200: OauthServiceTokenResult = <OauthServiceTokenResult>jsonObj;

        let dateTime = new Date();
        let datetimeNow = dateTime.getTime();


        if (valueLocalStorage == null) valueLocalStorage = new OauthServiceLocalStorage();
        valueLocalStorage.access_token = result200.access_token;
        valueLocalStorage.refresh_token = result200.refresh_token;
        valueLocalStorage.access_token_stored_at = datetimeNow;
        valueLocalStorage.expires_at = datetimeNow + (result200.expires_in * 1000);//because expires_in is second, datetimeNow is milisecond


        return _observableOf(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      console.log('err refreshToken!');

      //return this.fetchTokenUsingPasswordFlowAndLoadUserProfile(email, password, true)

      return _observableOf<OauthServiceTokenResult>(<any>null);
    }
  }


  private blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
      if (!blob) {
        observer.next("");
        observer.complete();
      } else {
        let reader = new FileReader();
        reader.onload = event => {
          observer.next((<any>event.target).result);
          observer.complete();
        };
        reader.readAsText(blob);
      }
    });
  }



  public logout() {

    var returnUrl = this.router.url;

    this.removeLocalStorage();
    this.stopRefreshTokenTimer();
    this.userSubject.next(null);
    //this.router.navigate(['/pages/login', { returnUrl: returnUrl }]);
    this.router.navigateByUrl(`/pages/login?returnUrl=${returnUrl}`);
  }

  //public isAuthenticated() {
  //  var localStorageValue = this.getLocalStorage();
  //  //if (localStorageValue == null) return localStorageValue.;
  //  return null;
  //  return true;
  //}
}
