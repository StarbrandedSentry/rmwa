import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SadminPowersComponent } from './sadmin-powers.component';

describe('SadminPowersComponent', () => {
  let component: SadminPowersComponent;
  let fixture: ComponentFixture<SadminPowersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SadminPowersComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SadminPowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
