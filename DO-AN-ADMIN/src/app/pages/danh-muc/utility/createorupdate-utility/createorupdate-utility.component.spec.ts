/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UtilityCreatOrUpdateComponent } from './createorupdate-utility.component';

describe('CmsPostAddoreditComponent', () => {
  let component: UtilityCreatOrUpdateComponent;
  let fixture: ComponentFixture<UtilityCreatOrUpdateComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [UtilityCreatOrUpdateComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilityCreatOrUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
