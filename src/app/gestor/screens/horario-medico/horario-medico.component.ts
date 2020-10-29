import {Component, OnChanges, OnInit} from '@angular/core';
import {listaDiaSemana} from '../../../core/constants';
import {DialogControl} from '../../../core/components/dialog/dialogControl';
import {MedicoHorario} from '../../models/MedicoHorario';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import set = Reflect.set;
import {MedicoService} from '../../services/medico.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-horario-medico',
  templateUrl: './horario-medico.component.html',
  styleUrls: ['./horario-medico.component.css']
})
export class HorarioMedicoComponent implements OnInit {
  public horarios: FormArray;
  public errors = [];
  public listaDiaSemana = listaDiaSemana;
  public indexSelected = null;
  public controlSelected = null;
  public dlDiaCtrl = new DialogControl();
  public id ;
  public message;
  public dlAlerCtrl = new DialogControl();
  constructor(public builder: FormBuilder,public medicoService: MedicoService,public route:ActivatedRoute,public router: Router) { }



  async ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.horarios = this.builder.array([])
    await this.medicoService.getHorarios(this.id).subscribe(data=>{
      data.map(item=>{
        this.createHorario(item);
      });
      if(data.length == 0){
        this.createHorario();
      }
    },()=>{
        this.router.navigate(['/gestor/medicos'])
    })

  }
  createHorario(obj:any = {}){
    this.horarios.push( this.builder.group( {
      horarioInicial:[obj.horarioInicial,[Validators.required,]],
      horarioFinal:[obj.horarioFinal,[Validators.required]],
      diaSemana:[obj.diaSemana,[Validators.required]],
      medico:[this.id]
    }));
  }
  validarHorario = (control,i) =>{
    const horarioInicial = control.get('horarioInicial');
    const horarioFinal= control.get('horarioFinal');
    const diaSemana= control.get('diaSemana');
    const setErrors = (value)=>{
      this.horarios.controls[i].get('horarioInicial').setErrors(value);
      this.horarios.controls[i].get('horarioFinal').setErrors(value);
    };
    if(horarioInicial.value && horarioFinal.value){
      const newDate = (strTime) => new Date(`2020-01-01 ${strTime}`);
      const timeHorarioInicialInfo = newDate(horarioInicial.value).getTime();
      const timeHorarioFinalInfo = newDate(horarioFinal.value).getTime();

      const isMaior = timeHorarioInicialInfo >= timeHorarioFinalInfo;

      if(isMaior){
        setErrors({periodoInvalido:true});
        return new Promise(((resolve, reject) => null))
      }
      if(diaSemana.value){
        this.horarios.controls.map((control,key)=>{
          if(key == i){return control}
          let iHorarioInicial = control.get('horarioInicial').value;
          let iHorarioFinal = control.get('horarioFinal').value;
          let idiaSemana = control.get('diaSemana').value;
          if(idiaSemana && iHorarioInicial && iHorarioFinal){
            const iTimeInicial = newDate(iHorarioInicial);
            const iTimeFinal = newDate(iHorarioFinal);

            const isIntervalInvalid = (v) =>  v >= iTimeInicial && v <= iTimeFinal;

            if(idiaSemana === diaSemana.value && (
              isIntervalInvalid(timeHorarioInicialInfo)
              || isIntervalInvalid(timeHorarioFinalInfo))){
              setErrors({periodoInvalido:true})
              return new Promise(((resolve, reject) => null))

            }
          }

        })

      }
    }
    setErrors(null);
    return new Promise(((resolve, reject) => resolve(true)))
  };
  selectedDia(item){
    this.horarios.controls[this.indexSelected].get('diaSemana').setValue(item.id);
    this.dlDiaCtrl.close();
    this.validarHorario(this.controlSelected,this.indexSelected);
  }
  removerHorario(i){
    this.horarios.removeAt(i);
  }
  salvar(){

    if(this.horarios.valid){
      this.medicoService.postHorario(this.id,this.horarios.value).subscribe(data=>{
        this.message = 'Salvo com sucesso'
        this.dlAlerCtrl.open();
      },()=>{
        this.message = 'Erro desconhecido'
        this.dlAlerCtrl.open();
      })
      return;
    }
    this.message = 'Informe os campos'
    this.dlAlerCtrl.open();
  }
  isError(control,name){
    let errors = control.get(name).errors;
    if( (errors && !control.untouched) ){
      return errors;
    }
    return null
  }
  getValuediaSemana(control){
    const value = control.get('diaSemana').value;
    return value?listaDiaSemana.filter(i=>i.id == value)[0].descricao:''
  }
}
