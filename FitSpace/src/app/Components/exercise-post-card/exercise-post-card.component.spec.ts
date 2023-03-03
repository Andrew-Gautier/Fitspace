import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisePostCardComponent } from './exercise-post-card.component';

describe('ExercisePostCardComponent', () => {
  let component: ExercisePostCardComponent;
  let fixture: ComponentFixture<ExercisePostCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExercisePostCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExercisePostCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
