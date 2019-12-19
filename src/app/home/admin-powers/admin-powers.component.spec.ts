import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPowersComponent } from './admin-powers.component';

describe('AdminPowersComponent', () => {
  let component: AdminPowersComponent;
  let fixture: ComponentFixture<AdminPowersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPowersComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
