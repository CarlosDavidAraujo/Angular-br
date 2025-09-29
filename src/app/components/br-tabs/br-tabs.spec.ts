import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrTabs } from './br-tabs';

describe('BrTabs', () => {
  let component: BrTabs;
  let fixture: ComponentFixture<BrTabs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrTabs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrTabs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
