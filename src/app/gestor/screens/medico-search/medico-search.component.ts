import { Component, OnInit } from '@angular/core';
import {STATUS} from '../../../core/constants';
import {Medico} from '../../models/Medico';
import {DialogControl} from '../../../core/components/dialog/dialogControl';
import {MedicoService} from '../../services/medico.service';

@Component({
  selector: 'medico-search',
  templateUrl: './medico-search.component.html',
  styleUrls: ['./medico-search.component.css']
})
export class MedicoSearchComponent implements OnInit {
  public medicos: Medico[] = [];
  public dlExcluir = new DialogControl();
  public dlExluido =new DialogControl();

  paginator: any = {
    limit:10,
    page:0,
    search:''
  };
  medicoExcluir = null;
  mensagemExluir = '';

  constructor(private medicoService: MedicoService) { }

  ngOnInit(): void {
    this.pesquisar();
  }
  pesquisar(){
    console.log('a')
    this.medicoService.get(this.paginator).subscribe((data)=>{
      this.medicos = data.results;
      delete data.results;
      this.paginator.count = data.count;
    })
  }
  changePage(page){
    this.paginator.page = page;
    this.pesquisar();
  }
  openDelete(medico){
    this.medicoExcluir = medico;
    this.dlExcluir.open();
  }
  deleteMedico(){
    this.dlExcluir.close();
    this.medicoExcluir.status = STATUS.Deletado;
    this.medicoService.put(this.medicoExcluir.id,this.medicoExcluir).subscribe(()=>{
      this.mensagemExluir = 'Médico exluido com sucesso.';
      this.dlExluido.open();
      this.pesquisar();
    },()=>{
      this.mensagemExluir = 'Error desconhecido.';
      this.dlExluido.open();
    });
  }
  closeDelete(){
    this.dlExcluir.close();
  }
}
