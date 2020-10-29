import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from '../core/components/dashboard/dashboard.component';
import {MedicoListaComponent} from './screens/medico-lista/medico-lista.component';
import {MedicoComponent} from './screens/medico/medico.component';
import {HorarioMedicoComponent} from './screens/horario-medico/horario-medico.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'medicos',
        component: MedicoListaComponent
      },
      {
        path: 'medico/novo',
        component: MedicoComponent
      },
      {
        path: 'medico/editar/:id',
        component: MedicoComponent
      },  {
        path: 'medico/horarios/:id',
        component: HorarioMedicoComponent
      },


    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestorRoutingModule { }
