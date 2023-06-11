import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorsComponent } from './vendors.component';

describe('VendorsComponent', () => {
  const component: VendorsComponent;
  const fixture: ComponentFixture<VendorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
