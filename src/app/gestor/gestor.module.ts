import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicoComponent } from './screens/medico/medico.component';
import { MedicoListaComponent } from './screens/medico-lista/medico-lista.component';
import {CoreModule} from '../core/core.module';
import {GestorRoutingModule} from './gestor-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {MedicoService} from './services/medico.service';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HorarioMedicoComponent } from './screens/horario-medico/horario-medico.component';
import { MedicoSearchComponent } from './screens/medico-search/medico-search.component';



@NgModule({
  declarations: [MedicoComponent, MedicoListaComponent, HorarioMedicoComponent, MedicoSearchComponent],
  imports: [
    CommonModule,
    CoreModule,
    GestorRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers:[
    MedicoService
  ]
})
export class GestorModule { }
