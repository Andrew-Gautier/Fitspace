import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyActivityPageComponent } from './my-activity-page.component';

describe('MyActivityPageComponent', () => {
  let component: MyActivityPageComponent;
  let fixture: ComponentFixture<MyActivityPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyActivityPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyActivityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
