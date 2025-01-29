import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  name: string;
  price: number;
  description: string;
  stock: number;
}

@Component({
  selector: 'app-storage-edit',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './storage-edit.component.html',
  styleUrl: './storage-edit.component.css'
})
export class StorageEditComponent {
  readonly dialogRef = inject(MatDialogRef<StorageEditComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  
  close(): void {
    this.dialogRef.close();
  }
}
