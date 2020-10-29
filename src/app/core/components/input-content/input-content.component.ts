import { Component, OnInit, Input } from '@angular/core';
import {Messages} from '../../Messages';

@Component({
  selector: 'input-content',
  templateUrl: './input-content.component.html',
  styleUrls: ['./input-content.component.css']
})
export class InputContentComponent implements OnInit {
  @Input()
    public error;
  @Input()
  public opcional = false;
  @Input()
  public class;
  @Input()
  public label;

  public errorLabel = null

  constructor() { }

  ngOnInit(): void {
  }


  getErrorLabel(){
    if(this.error){
      for(let v of  ['required','email','passwordDistinct','periodoInvalido']){
        if(this.error[v]){
          return Messages[v];
        }
      }
    }
    return null;
  }
}
