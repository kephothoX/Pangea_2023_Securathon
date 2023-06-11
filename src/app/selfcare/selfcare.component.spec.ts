import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfcareComponent } from './selfcare.component';

describe('SelfcareComponent', () => {
  const component: SelfcareComponent;
  const fixture: ComponentFixture<SelfcareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfcareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfcareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
