import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DialogControl} from '../dialog/dialogControl';
import {listaStatus} from '../../constants';

@Component({
  selector: 'status-dialog',
  templateUrl: './status-dialog.component.html',
  styleUrls: []
})
export class StatusDialogComponent implements OnInit {
  @Output()
  public onSelected = new EventEmitter();
  public dlStatusCtrl = new DialogControl();

  public listaStatus = [...listaStatus];
  constructor() { }

  ngOnInit(): void {
  }
  selected(item){
    this.onSelected.emit(item);
    this.dlStatusCtrl.close();
  }
}
