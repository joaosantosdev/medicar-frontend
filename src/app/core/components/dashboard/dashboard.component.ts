import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  itemsSidebar = [
    {
      title: 'Médicos',
      navigation: '/gestor/medicos',
      icon: 'perfil',
      first: true
    },
    {
      title: 'Novo médico',
      navigation: '/gestor/medico/novo',
      icon: 'cliente',

    },
    {
      title: 'Horário médico',
      navigation: '/gestor/medico/horarios',
      icon: 'cliente',

    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
