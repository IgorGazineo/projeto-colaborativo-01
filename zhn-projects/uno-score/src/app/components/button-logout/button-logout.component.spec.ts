import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonLogoutComponent } from './button-logout.component';

describe('ButtonLogoutComponent', () => {
  let component: ButtonLogoutComponent;
  let fixture: ComponentFixture<ButtonLogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonLogoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
