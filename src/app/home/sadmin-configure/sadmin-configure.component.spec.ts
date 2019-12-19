import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SadminConfigureComponent } from './sadmin-configure.component';

describe('SadminConfigureComponent', () => {
  let component: SadminConfigureComponent;
  let fixture: ComponentFixture<SadminConfigureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SadminConfigureComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SadminConfigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
