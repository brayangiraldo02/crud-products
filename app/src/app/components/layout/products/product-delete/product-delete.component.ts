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
  selector: 'app-product-delete',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  templateUrl: './product-delete.component.html',
  styleUrl: './product-delete.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {id: number, name: string}) {}
}
