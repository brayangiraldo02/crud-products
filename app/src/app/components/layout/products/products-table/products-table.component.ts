import {ChangeDetectionStrategy, Component, inject,  model, signal} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ProductDeleteComponent } from '../product-delete/product-delete.component';
import { ProductCreateComponent } from '../product-create/product-create.component';

export interface ProductsTable {
  name: string;
  id: number;
  price: number;
  description: string;
  stock: number;
}

export interface ProductCreate {
  name: string;
  price: number;
  description: string;
  stock: number;
}

const ELEMENT_DATA: ProductsTable[] = [
  {id: 1, name: 'Hidrogeno', price: 1.0079, description: 'El hidrógeno es el primer elemento de la tabla periódica. Es el elemento químico más ligero que existe, su átomo está formado por un protón y un electrón y es estable en forma de molécula diatómica (H2). En condiciones normales se encuentra en estado gaseoso, y es insípido, incoloro e inodoro.', stock: 10},
  {id: 2, name: 'Helio', price: 4.0026, description: 'Un gas noble con el símbolo atómico He, número atómico 2 y peso atómico 4,003. Es un gas incoloro, inodoro e insípido, no combustible y que no sostiene la combustión.', stock: 20},
  {id: 3, name: 'Litio', price: 6.941, description: 'Tiene el símbolo atómico Li, número atómico 3 y peso atómico [6,938; 6.997]. Las sales de litio se emplean en el tratamiento del TRASTORNO BIPOLAR. Elemento de la familia de metales alcalinos. Tiene el símbolo atómico Li, número atómico 3 y peso atómico.', stock: 30},
  {id: 4, name: 'Beryllium', price: 9.0122, description: 'El berilio es un metal que se encuentra en la naturaleza, especialmente en rocas de berilo y bertrandita. Es extremadamente liviano y duro, es un buen conductor de la electricidad y el calor, y no es magnético.', stock: 40},
  {id: 5, name: 'Boro', price: 10.811, description: 'El boro es un compuesto que ocurre en forma natural en el ambiente. A menudo se encuentra combinado con otras sustancias formando compuestos llamados boratos. Algunos boratos comunes incluyen al ácido bórico, sales de boratos y óxido de boro. Los boratos se usan principalmente para manufacturar vidrio.', stock: 50},
  {id: 6, name: 'Carbono', price: 12.0107, description: 'El carbono (del latín, carbo, carbón) es un elemento químico con símbolo C, número atómico 6 y masa atómica 12,01. Es un no metal y tetravalente, disponiendo de 4 electrones y 6 protones para formar enlaces químicos covalentes.', stock: 60},
  {id: 7, name: 'Nitrogeno', price: 14.0067, description: 'El nitrógeno es un elemento químico de número atómico 7, símbolo N, su masa molar es de 14,0067 g/mol, su masa atómica es 14.0067u y en condiciones normales forma un gas diatómico que constituye del orden del 78 % del aire atmosférico. Antiguamente era llamado ázoe', stock: 70},
  {id: 8, name: 'Oxygen', price: 15.9994, description: 'El oxígeno es un elemento químico de número atómico 8 y número de masa 15.9994 uma, representado por el símbolo O. ', stock: 80},
  {id: 9, name: 'Fluor', price: 18.9984, description: 'El flúor es un elemento químico de número atómico 9, situado en el grupo de los halógenos (grupo 17) de la tabla periódica de los elementos formado por moléculas diatómicas F2.', stock: 90},
  {id: 10, name: 'Neon', price: 20.1797, description: 'El neón es un elemento químico de número atómico 10 y símbolo Ne. Es un gas noble, incoloro, prácticamente inerte, presente en trazas en el aire, pero muy abundante en el universo, que proporciona un tono rojizo característico a la luz de las lámparas fluorescentes en las que se emplea.', stock: 100}
];

@Component({
  selector: 'app-products-table',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsTableComponent {
  displayedColumns: string[] = ['id', 'name', 'price', 'description', 'stock', 'actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  readonly dialog = inject(MatDialog);

  readonly animal = signal('');
  readonly name = model('');

  readonly product_create = signal<ProductCreate>({
    name: '',
    price: 0,
    description: '',
    stock: 0
  });

  apply_filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  open_dialog_delete(id: number, name: string) {
    const dialogRef = this.dialog.open(ProductDeleteComponent, {
      data: { id, name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Delete');
      }
    });
  }

  resetProductCreate(): void {
    this.product_create.set({
      name: '',
      price: 0,
      description: '',
      stock: 0
    });
  }

  open_dialog_create(): void {
    const dialogRef = this.dialog.open(ProductCreateComponent, {
      data: this.product_create(),
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        console.log(result);
      }
      this.resetProductCreate();
    });
  }

  open_dialog_edit(element: ProductsTable): void {
    const dialogRef = this.dialog.open(ProductCreateComponent, {
      data: element,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        console.log(result);
      }
    });
  }
}
