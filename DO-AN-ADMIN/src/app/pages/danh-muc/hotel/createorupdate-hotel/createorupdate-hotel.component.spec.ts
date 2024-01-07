/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HotelCreatOrUpdateComponent } from './createorupdate-hotel.component';

describe('CmsPostAddoreditComponent', () => {
  let component: HotelCreatOrUpdateComponent;
  let fixture: ComponentFixture<HotelCreatOrUpdateComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [HotelCreatOrUpdateComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelCreatOrUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
