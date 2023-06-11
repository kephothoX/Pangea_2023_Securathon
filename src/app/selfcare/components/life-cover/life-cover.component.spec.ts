import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeCoverComponent } from './life-cover.component';

describe('LifeCoverComponent', () => {
  const component: LifeCoverComponent;
  const fixture: ComponentFixture<LifeCoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LifeCoverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LifeCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
