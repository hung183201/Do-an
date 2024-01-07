/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RegViewInfoFromCadasComponent } from './reg-view-info-from-cadas.component';

describe('RegViewInfoFromCadasComponent', () => {
  let component: RegViewInfoFromCadasComponent;
  let fixture: ComponentFixture<RegViewInfoFromCadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegViewInfoFromCadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegViewInfoFromCadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
