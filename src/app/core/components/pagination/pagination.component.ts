import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
@Input()
paginator
  @Output()
  change = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  getLabel(i){
    return i+this.paginator.page;
  }
  getPage(){
    return this.paginator.page+1;
  }
  disable(page){
    if(page<0 || (page*this.paginator.limit) > this.paginator.count){
      return true;
    }
  return false;
  }
  changePage(page) {
    if(this.disable(page)){
      return;
    }
    this.change.emit(page);
  }


}
