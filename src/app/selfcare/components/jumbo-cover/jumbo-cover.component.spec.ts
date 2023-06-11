import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JumboCoverComponent } from './jumbo-cover.component';

describe('JumboCoverComponent', () => {
  const component: JumboCoverComponent;
  const fixture: ComponentFixture<JumboCoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JumboCoverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JumboCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
