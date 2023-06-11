import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCardComponent } from './new-card.component';

describe('NewCardComponent', () => {
  const component: NewCardComponent;
  const fixture: ComponentFixture<NewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
