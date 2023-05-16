import { FieldTypes, IFieldConfig, ITableColumn, RegexTypes } from './../models/commonModels';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class CommonService {
  convertDateAccordingToTimeZone(original: Date) {
    if (!original) {
      return null;
    }

    const offset = original.getTimezoneOffset();
    const offSetHourse = offset / 60;
    original.setHours(original.getHours() + (-offSetHourse));
  }

  getArraysIntersection(a1, a2) {
    return a1.filter(function (n) { return a2.indexOf(n) !== -1; });
  }

  isContainFile(listFiles, fileName: string) {
    if (listFiles && listFiles.length > 0) {
      for (let i = 0; i < listFiles.length; i++) {
        const fileItem = listFiles[i];
        if (fileItem.fileName === fileName) {
          return true;
        }
      }
    }
    return false;
  }

  isPdf(filePath) {
    return filePath && filePath.indexOf('pdf') > -1;
  }

  getMappingConfigFields(columns: ITableColumn[]) {
    return columns.map(x => {
      const field: IFieldConfig = {
        name: x.prop.toString(),
        type: x.fieldType,
        label: x.headerTemplate,
        validation: x.fieldValidations,
        options: x.fieldOptions,
        patternValue: x.fieldType === FieldTypes.Textbox ? x.fieldPatternValue : RegexTypes.Default,
        templateReference: x.fieldTemplateReference,
        onChange: x.onChange
      };
      return field;
    });
  }

  waitFor(condition, callback) {
    if (!condition()) {
      console.log('waiting');
      window.setTimeout(this.waitFor.bind(this, condition, callback), 100); /* this checks the flag every 100 milliseconds*/
    } else {
      console.log('done');
      callback();
    }
  }
}