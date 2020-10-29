import { Component, OnInit } from '@angular/core';
import {listaStatus,PERFIL} from '../../../core/constants';
import {DialogControl} from '../../../core/components/dialog/dialogControl';
import {FormBuilder, Validators} from '@angular/forms';
import {MedicoService} from '../../services/medico.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Medico} from '../../models/Medico';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {
  public title = 'Novo médico'
  public form;
  public status = listaStatus[0];
  public message = '';
  public dlAlerCtrl = new DialogControl();
  public id = null;
  constructor(public router: Router,public builder: FormBuilder,public medicoService: MedicoService,public route: ActivatedRoute) {


  }

   ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    const senhaRequired = [Validators.required];
    if(this.id){
      this.title = 'Editar médico';
     this.medicoService.getById( this.id).subscribe((data: Medico) =>{
       delete data.senha;
       this.form.patchValue(data)
       this.status = listaStatus[(data.status - 1)]
      });
    }

    this.form = this.builder.group({
      nome:[null,[Validators.required]],
      email:[null,[Validators.required,Validators.email]],
      cpf:[null,[Validators.required]],
      telefone:[null],
      status:[this.status.id,[Validators.required]],
      senha:[null,senhaRequired,this.validarSenha],
      r_senha:[null,senhaRequired,this.validarSenha],
    })
     if(this.id){
       this.form.get('senha').clearValidators();
       this.form.get('r_senha').clearValidators();

     }

   }
  validarSenha = () =>{
    const senha = this.form.get('senha').value;
    const r_senha = this.form.get('r_senha').value;
    const errors = this.form.controls.r_senha.errors;
    const equals = senha === r_senha;
    if(equals){
      this.form.controls.senha.setErrors(null);
      this.form.controls.r_senha.setErrors(null);
    }else{
      this.form.controls.r_senha.errors={...errors,passwordDistinct:true};
    }

    return new Promise((resolve,reject)=>equals?resolve(true):null);
  }
  onStatus(item){
    this.status = item;
    this.form.get('status').setValue(item.id);
  }
  isError(name){
      if(this.form.touched){
        return this.form.get(name).errors;
      }
      return null;
  }
  alert(message){
    this.message = message;
    this.dlAlerCtrl.open();
  }
  reset(){
    this.form.reset();
    this.status = listaStatus[0];
    this.form.get('status').setValue(this.status.id)
  }
  onSubmit(){
    const body = this.form.value;
    delete body.r_senha;
    body.perfil = PERFIL.Medico
    if(this.form.valid){
      if(this.id){
        if(body.senha == null || body.senha === ''){
          delete body.senha;
        }
        this.medicoService.put(this.id,body).subscribe(data=>{
          this.alert('Atualizado com sucesso.')
        },()=>{
          this.alert('Error desconhecido.')
        });
        }else{
        this.medicoService.post(body).subscribe(data=>{
          this.alert('Cadastrado com sucesso.');
          this.reset();
        },()=>{
          this.alert('Error desconhecido.')
        });
      }
      return;
    }
    this.form.touched =true
  }
}
