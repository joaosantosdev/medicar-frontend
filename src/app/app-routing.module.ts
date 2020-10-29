import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MedicoListaComponent} from './gestor/screens/medico-lista/medico-lista.component';


const routes: Routes = [
  {path: 'gestor', loadChildren: () => import('./gestor/gestor.module').then(m => m.GestorModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
