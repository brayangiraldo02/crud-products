import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';

@Component({
  selector: 'app-storage-delete',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  templateUrl: './storage-delete.component.html',
  styleUrl: './storage-delete.component.css'
})
export class StorageDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {id: number, name: string}) {}
}
