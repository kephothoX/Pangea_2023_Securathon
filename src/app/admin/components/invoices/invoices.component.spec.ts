import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicesComponent } from './invoices.component';

describe('InvoicesComponent', () => {
  const component: InvoicesComponent;
  const fixture: ComponentFixture<InvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
