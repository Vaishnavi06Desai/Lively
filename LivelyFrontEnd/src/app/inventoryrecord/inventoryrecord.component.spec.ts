import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryrecordComponent } from './inventoryrecord.component';

describe('InventoryrecordComponent', () => {
  let component: InventoryrecordComponent;
  let fixture: ComponentFixture<InventoryrecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryrecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryrecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
