import { Component, OnInit } from '@angular/core';
import {MedicoService} from '../../services/medico.service';
import {Medico} from '../../models/Medico';
import {DialogControl} from '../../../core/components/dialog/dialogControl';
import {STATUS} from '../../../core/constants';

@Component({
  selector: 'app-medico-lista',
  templateUrl: './medico-lista.component.html',
  styleUrls: ['./medico-lista.component.css']
})
export class MedicoListaComponent implements OnInit {

  constructor(private medicoService: MedicoService) { }

  ngOnInit(): void {

  }


}
