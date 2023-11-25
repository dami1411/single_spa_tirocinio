import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'
import {MatIconModule} from '@angular/material/icon';

const COMPONENTS = [
  CardComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    COMPONENTS
  ]
})
export class ComponentModule { }
