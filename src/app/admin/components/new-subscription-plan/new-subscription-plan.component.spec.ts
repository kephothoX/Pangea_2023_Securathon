import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSubscriptionPlanComponent } from './new-subscription-plan.component';

describe('NewSubscriptionPlanComponent', () => {
  const component: NewSubscriptionPlanComponent;
  const fixture: ComponentFixture<NewSubscriptionPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSubscriptionPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSubscriptionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
