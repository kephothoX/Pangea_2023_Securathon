import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PauseSubscriptionComponent } from './pause-subscription.component';

describe('PauseSubscriptionComponent', () => {
  let component: PauseSubscriptionComponent;
  let fixture: ComponentFixture<PauseSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PauseSubscriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PauseSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
