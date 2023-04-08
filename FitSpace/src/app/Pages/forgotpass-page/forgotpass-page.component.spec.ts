import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotpassPageComponent } from './forgotpass-page.component';

describe('ForgotpassPageComponent', () => {
  let component: ForgotpassPageComponent;
  let fixture: ComponentFixture<ForgotpassPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotpassPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotpassPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
