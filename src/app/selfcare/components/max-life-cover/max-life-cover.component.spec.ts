import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxLifeCoverComponent } from './max-life-cover.component';

describe('MaxLifeCoverComponent', () => {
  const component: MaxLifeCoverComponent;
  const fixture: ComponentFixture<MaxLifeCoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaxLifeCoverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaxLifeCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
