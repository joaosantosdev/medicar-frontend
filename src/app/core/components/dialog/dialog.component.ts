import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'modal-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  @Input()
  public name;
  @Input()
  public title;
  @Input()
  public control;
  @Input()
  public alert;

  @Input()
  public classStyle;

  constructor() {

  }


  getClass(){
    return this.classStyle?this.classStyle:'';
  }

  close = () => {
    document.getElementById(this.name).classList.remove('open-dialog')
  }
  open = () => {
    document.getElementById(this.name).classList.add('open-dialog')
  }
  getAlert(){
    return this.alert?'alert': '';
  }
  ngOnInit(): void {
    console.log(this.name)
    if(this.control){
      this.control['close'] = this.close
      this.control['open'] = this.open
    }
  }

}
