import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelerBpmnComponent } from './modeler-bpmn.component';

describe('ModelerBpmnComponent', () => {
  let component: ModelerBpmnComponent;
  let fixture: ComponentFixture<ModelerBpmnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelerBpmnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelerBpmnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
