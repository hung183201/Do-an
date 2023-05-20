import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { PagedListModel, ResponseModel } from 'app/shared/model/response-model';
import { Observable } from 'rxjs';

import { ValidatorExtension } from './validator-extension';

// dealare
declare global {
  interface String {
    convertToISOTime(this: string): string;
    convertToDate(this: string): Date;
    convertYYYYMMDDToDate(this: string): Date;
    toUnSign(this: string, toUper: boolean): string;
    isNotEmpty(this: string): boolean;
    stringDateVItoStringYYYYMMDD(this: string): string;
    toJsonArray(this: string, defaultValue: any): any;
    convertYYYYMMDDToString(this: string): string;
  }

  interface Number {
    convertYYYYMMDDToDate(this: Number): Date | null;
    toFixedAndClear(fractionDigits: number | undefined): string;
  }

  interface Date {
    toNumberYYYYMMDD(this: Date): Number | null;
    toStringShortDate(this: Date): string;
  }

  interface Array<T> {
    getMapingCombobox(
      this: Array<T>,
      keys: string,
      keyMap: string,
      apiService: any,
      apiParams?: any,
      apiActionName?: string,
      lastFix?: string
    ): Promise<Array<T>>;
    getMapingComboboxFromArrayNotObject(
      this: Array<T>,
      apiService: any,
      apiParams?: any,
      apiActionName?: string
    ): Promise<Array<T>>;
    getMapingComboboxJson(
      this: Array<T>,
      path: string,
      keys: string,
      keyMap: string,
      apiService: any,
      apiParams?: any,
      apiActionName?: string
    ): Promise<Array<T>>;
    clone(this: Array<T>): Array<T>;
    trim(this: Array<string>): Array<string>;
  }
}

declare module '@angular/forms' {
  interface FormGroup {
    bindError(this: FormGroup, errors: any[]): string | null;
    bindWarning(this: FormGroup, errors: any[]): string | null;
    textTrim(this: FormGroup): void;
    resetMulti(this: FormGroup, listControl: string[]): void;
    disableMulti(this: FormGroup, listControl: string[]): void;
    enableMulti(this: FormGroup, listControl: string[]): void;
    getRawValueClear(this: FormGroup): any;
    trimRawValueClear(this: FormGroup): any;
  }
  interface AbstractControl {
    markAllAsDirty(this: AbstractControl): void;
    markAllUnAsDirty(this: AbstractControl): void;
    clearWarning(this: AbstractControl): void;

  }
}

declare module 'rxjs' {
  interface Observable<T> {
    toApiPromise(this: Observable<T>): Promise<ResponseModel<T>>;
  }
}

// prototype
String.prototype.convertToISOTime = function (this: string) {
  return new Date(
    parseInt(this.substring(0, 4)),
    parseInt(this.substring(4, 6)) - 1,
    parseInt(this.substring(6, 8))
  ).toISOString();
};

String.prototype.convertToDate = function (this: string) {
  return new Date(
    parseInt(this.substring(0, 4)),
    parseInt(this.substring(4, 6)) - 1,
    parseInt(this.substring(6, 8))
  );
};

String.prototype.convertYYYYMMDDToDate = function (this: string) {
  return new Date(
    parseInt(this.substring(0, 4)),
    parseInt(this.substring(4, 6)) - 1,
    parseInt(this.substring(6, 8))
  );
};

String.prototype.stringDateVItoStringYYYYMMDD = function (
  this: string
): string {
  let arr = this.split('/');
  if (arr[0].length < 2) arr[0] = '0' + arr[0];
  if (arr[1].length < 2) arr[1] = '0' + arr[1];
  return arr[2] + arr[1] + arr[0];
};

String.prototype.convertYYYYMMDDToString = function (this: string): string {
  let arr1 = this.slice(0, 4);
  let arr2 = this.slice(4, 6);
  let arr3 = this.slice(6, 8);
  return arr3 + '/' + arr2 + '/' + arr1;
};

String.prototype.toJsonArray = function (
  this: string,
  defaultValue: any = []
): any {
  if (this !== null && this !== '') {
    return JSON.parse(this);
  }
  return [];
};

String.prototype.toUnSign = function (
  this: string,
  toUper: boolean = true
): string {
  let str = this;
  const AccentsMap = [
    'aàảãáạăằẳẵắặâầẩẫấậ',
    'AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ',
    'dđ',
    'DĐ',
    'eèẻẽéẹêềểễếệ',
    'EÈẺẼÉẸÊỀỂỄẾỆ',
    'iìỉĩíị',
    'IÌỈĨÍỊ',
    'oòỏõóọôồổỗốộơờởỡớợ',
    'OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ',
    'uùủũúụưừửữứự',
    'UÙỦŨÚỤƯỪỬỮỨỰ',
    'yỳỷỹýỵ',
    'YỲỶỸÝỴ',
  ];
  for (var i = 0; i < AccentsMap.length; i++) {
    var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
    var char = AccentsMap[i][0];
    str = str.replace(re, char);
  }
  if (toUper) {
    str = str.toUpperCase();
  }
  return str;
};

String.prototype.isNotEmpty = function (this: string): boolean {
  return this !== '' && this !== null;
};

Number.prototype.convertYYYYMMDDToDate = function (this: Number): Date | null {
  if (!this) return null;
  let source = this.toString();
  return new Date(
    parseInt(source.substring(0, 4)),
    parseInt(source.substring(4, 6)) - 1,
    parseInt(source.substring(6, 8))
  );
};

Number.prototype.toFixedAndClear = function (this: number, fractionDigits: number | undefined): string {
  if (!this) return '';
  let source = this.toFixed(fractionDigits);
  return (+source).toString();
};

Date.prototype.toNumberYYYYMMDD = function (this: Date): Number | null {
  if (!this) return null;
  let monthValue = (this.getMonth() + 1).toString();
  if (monthValue.length == 1) {
    monthValue = `0${monthValue}`;
  }
  let dateValue = this.getDate().toString();
  if (dateValue.length == 1) {
    dateValue = `0${dateValue}`;
  }
  return +`${this.getFullYear()}${monthValue}${dateValue}`;
};

Date.prototype.toStringShortDate = function (this: Date): string {
  let monthValue = (this.getMonth() + 1).toString();
  if (monthValue.length == 1) {
    monthValue = `0${monthValue}`;
  }
  let dateValue = this.getDate().toString();
  if (dateValue.length == 1) {
    dateValue = `0${dateValue}`;
  }
  return `${dateValue}/${monthValue}/${this.getFullYear()}`;
};

Array.prototype.getMapingComboboxFromArrayNotObject =
  // tslint:disable-next-line: only-arrow-functions
  async function <T>(
    this: Array<T>,
    apiService: any,
    apiParams?: any,
    apiActionName?: string
  ): Promise<Array<T>> {
    let dataConvert: any[] = this.map((x) => {
      return { id: x, name: '' };
    });
    dataConvert = await dataConvert.getMapingCombobox(
      'id',
      'name',
      apiService,
      apiParams
    );
    return dataConvert.map((x) => x.name);
  };

Array.prototype.clone = function <T>(this: Array<T>): Array<T> {
  return JSON.parse(JSON.stringify(this));
};

Array.prototype.trim = function <T>(this: Array<string>): Array<string> {
  return this.map((x) => {
    return x.trim();
  });
};

AbstractControl.prototype.markAllAsDirty = function (this: AbstractControl) {
  // tslint:disable-next-line: forin
  if (this instanceof FormGroup) {
    const formGroupValue = this as FormGroup;
    for (const item in formGroupValue.controls) {
      formGroupValue.get(item)!.markAllAsDirty();
    }
    this.updateValueAndValidity();
  } else if (this instanceof FormArray) {
    const formArrayValue = this as FormArray;
    for (let i = 0; i < formArrayValue.length; i++) {
      const formGroupValue = formArrayValue.at(i);
      (formGroupValue as AbstractControl).markAllAsDirty();
    }
  } else if (this instanceof FormControl) {
    this.markAsDirty();
    this.updateValueAndValidity();
  }
};

AbstractControl.prototype.markAllUnAsDirty = function (this: AbstractControl) {
  // tslint:disable-next-line: forin
  if (this instanceof FormGroup) {
    const formGroupValue = this as FormGroup;
    for (const item in formGroupValue.controls) {
      formGroupValue.get(item)!.markAllUnAsDirty();
    }
    this.updateValueAndValidity();
  } else if (this instanceof FormArray) {
    const formArrayValue = this as FormArray;
    for (let i = 0; i < formArrayValue.length; i++) {
      const formGroupValue = formArrayValue.at(i);
      (formGroupValue as AbstractControl).markAllUnAsDirty();
    }
  } else if (this instanceof FormControl) {
    let value = this.value;
    this.reset();
    this.setValue(value);
    this.updateValueAndValidity();
  }
};

FormGroup.prototype.getRawValueClear = function (this: FormGroup): any {
  let params = this.getRawValue();
  Object.keys(params).forEach((key) => {
    if (params[key] === null || params[key] === undefined) {
      delete params[key];
    }
    else {
      if (typeof (params[key]) === 'string') {
        params[key] = params[key]?.trim();
      }
    }
  });
  return params;
};

FormGroup.prototype.trimRawValueClear = function (this: FormGroup): any {
  let params = this.getRawValue();
  Object.keys(params).forEach((key) => {
    params[key].trim();
    if (params[key] === null || params[key] === undefined) {
      delete params[key];
    }
  });
  return params;
};

FormGroup.prototype.bindError = function (
  this: FormGroup,
  errors: any[]
): string | null {
  const getKeyName = function (keyName: string, form: FormGroup) {
    for (const control in form.controls) {
      if (keyName.toLocaleLowerCase() === control.toLocaleLowerCase()) {
        return control;
      }
    }
    return null;
  };
  let lstMessageAlert: string[] = [];

  for (const item of errors) {
    let messTxt = item.name;
    if (item.field) {
      let controlName = getKeyName(item.field, this);

      if (controlName != null) {
        if (messTxt) {
          const errorValue = { error: messTxt };
          this.get(controlName)!.setErrors(errorValue);
        }
      } else {
        lstMessageAlert.push(messTxt);
      }
    } else {
      lstMessageAlert.push(messTxt);
    }
  }
  lstMessageAlert = lstMessageAlert.filter(x => x !== undefined);
  return lstMessageAlert.length > 0 ? lstMessageAlert.join('/n') : null;
};

FormGroup.prototype.bindWarning = function (
  this: FormGroup,
  errors: any[]
): string | null {
  const getKeyName = function (keyName: string, form: FormGroup) {
    for (const control in form.controls) {
      if (keyName.toLocaleLowerCase() === control.toLocaleLowerCase()) {
        return control;
      }
    }
    return null;
  };
  let lstMessageAlert: string[] = [];

  for (const item of errors) {
    let messTxt = item.name;
    if (item.field) {
      let controlName = getKeyName(item.field, this);

      if (controlName != null) {
        if (messTxt) {
          const errorValue = { text: messTxt };
          (this.get(controlName)! as any).warning = errorValue;
        }
      } else {
        lstMessageAlert.push(messTxt);
      }
    } else {
      lstMessageAlert.push(messTxt);
    }
  }
  lstMessageAlert = lstMessageAlert.filter(x => x !== undefined);
  return lstMessageAlert.length > 0 ? lstMessageAlert.join('/n') : null;
};

AbstractControl.prototype.clearWarning = function (
  this: AbstractControl
): void {

  if (this instanceof FormGroup) {
    const formGroupValue = this as FormGroup;
    for (const item in formGroupValue.controls) {
      formGroupValue.get(item)!.clearWarning();
    }
  } else if (this instanceof FormArray) {
    const formArrayValue = this as FormArray;
    for (let i = 0; i < formArrayValue.length; i++) {
      const formGroupValue = formArrayValue.at(i);
      (formGroupValue as AbstractControl).clearWarning();
    }
  } else if (this instanceof FormControl) {
    (this as any).waring = undefined;
  }
};

FormGroup.prototype.textTrim = function (this: FormGroup) {
  for (const i in this.controls) {
    if (typeof this.controls[i].value === 'string') {
      this.controls[i].setValue(this.controls[i].value.trim());
    }
  }
};

// tslint:disable-next-line: typedef
FormGroup.prototype.resetMulti = function (
  this: FormGroup,
  listControl: string[]
) {
  for (const key of listControl) {
    this.get(key)!.reset();
  }
};

// tslint:disable-next-line: typedef
FormGroup.prototype.disableMulti = function (
  this: FormGroup,
  listControl: string[]
) {
  for (const key of listControl) {
    this.get(key)!.disable();
  }
};

// tslint:disable-next-line: typedef
FormGroup.prototype.enableMulti = function (
  this: FormGroup,
  listControl: string[]
) {
  for (const key of listControl) {
    this.get(key)!.enable();
  }
};

Observable.prototype.toApiPromise = function <T>(
  this: Observable<T>
): Promise<ResponseModel<T>> {
  return new Promise(async (resove) => {

    this.subscribe(

      (result: any) => {
        if (result) {
          let rs = new ResponseModel<T>();
          rs.result = result;
          rs.error = result?.error;

          if (rs.error) {
            if (rs.error instanceof Array && rs.error.length > 0) {
              rs.success = false;
              resove(rs);
              return;
            }
            else {
              if (!(rs.error instanceof Array)) {
                rs.success = false;
                resove(rs);
                return;
              }
            }

          }

          rs.success = true;
          resove(rs);
        } else {
          let rs = new ResponseModel<T>();
          rs.success = true;
          resove(rs);
        }
      },
      (error) => {
        let result = new ResponseModel<T>();
        result.success = false;
        result.error = error.response
          ? JSON.parse(error.response)
          : error.message;
        resove(result);
      }
    );
  });
};

export { };
