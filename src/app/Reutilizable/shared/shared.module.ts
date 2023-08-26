import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http'

//Angular Material

//Cartas
import { MatCardModule } from '@angular/material/card';
//Inputs
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
//Barra de progreso
import { MatProgressBarModule } from '@angular/material/progress-bar';
//Spinner de progreso
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
//Files y Columnas
import { MatGridListModule } from '@angular/material/grid-list';
//Contenedores
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
//Botones
import { MatButtonModule } from '@angular/material/button';
//iconos
import { MatIconModule} from '@angular/material/icon';
//Listas
import { MatListModule} from '@angular/material/list';
//Tablas
import { MatTableModule } from '@angular/material/table';
//Paginator
import { MatPaginatorModule} from '@angular/material/paginator';
//Modales
import { MatDialogModule} from '@angular/material/dialog';
//Pequeñas Alertas
import { MatSnackBarModule} from '@angular/material/snack-bar';
//Pequeña Alertas cuando pasamos el cursos por un boton
import { MatTooltipModule} from '@angular/material/tooltip';
//Autocomplete
import { MatAutocompleteModule} from '@angular/material/autocomplete';
//Shist
import {MatChipsModule} from '@angular/material/chips';
//Fechas
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';
import { MomentDateModule} from '@angular/material-moment-adapter';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    LayoutModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MomentDateModule,
    MatChipsModule
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class SharedModule { }
