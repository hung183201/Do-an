/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CmsUserAddoreditComponent } from './cms-user-addoredit.component';

describe('CmsPostAddoreditComponent', () => {
  let component: CmsUserAddoreditComponent;
  let fixture: ComponentFixture<CmsUserAddoreditComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [CmsUserAddoreditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsUserAddoreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
