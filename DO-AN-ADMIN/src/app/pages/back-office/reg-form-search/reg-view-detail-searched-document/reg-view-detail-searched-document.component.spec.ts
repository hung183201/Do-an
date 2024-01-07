/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RegViewDetailSearchedDocumentComponent } from './reg-view-detail-searched-document.component';

describe('RegViewDetailSearchedDocumentComponent', () => {
  let component: RegViewDetailSearchedDocumentComponent;
  let fixture: ComponentFixture<RegViewDetailSearchedDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegViewDetailSearchedDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegViewDetailSearchedDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
