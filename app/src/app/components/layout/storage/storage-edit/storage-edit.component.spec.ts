import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageEditComponent } from './storage-edit.component';

describe('StorageEditComponent', () => {
  let component: StorageEditComponent;
  let fixture: ComponentFixture<StorageEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorageEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
