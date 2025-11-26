import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsInventory } from './details-inventory';

describe('DetailsInventory', () => {
  let component: DetailsInventory;
  let fixture: ComponentFixture<DetailsInventory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsInventory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsInventory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
