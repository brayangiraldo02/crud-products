import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageDeleteComponent } from './storage-delete.component';

describe('StorageDeleteComponent', () => {
  let component: StorageDeleteComponent;
  let fixture: ComponentFixture<StorageDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorageDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorageDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
