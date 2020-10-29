import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import {Medico} from '../models/Medico';
import {PaginationResult} from '../../core/models/paginationResult';
import {UrlHelper} from '../../core/helpers/UrlHelper';
import {MedicoHorario} from '../models/MedicoHorario';
import {ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  private url = 'http://127.0.0.1:8000/medicos/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    })
  }
  constructor(private http: HttpClient,public UrlHelper: UrlHelper) {

  }



  handleError(error:HttpErrorResponse){

  }
  get(params){

    let url = (this.url+UrlHelper.formatParams(params,true));
    return this.http.get<PaginationResult>(url,this.httpOptions).pipe(
      retry(1)
    );
  }
  getById(id){
    return this.http.get<Medico>(`${this.url}${id}/`,this.httpOptions).pipe(
      retry(1)
    );
  }
  post(medico : Medico){
    return this.http.post<Medico[]>(this.url,medico,this.httpOptions).pipe(
      retry(1)
    );
  }
  postHorario(id,horarios : MedicoHorario[]){
    return this.http.post<any[]>(`${this.url}${id}/horarios/`,horarios,this.httpOptions).pipe(
      retry(1)
    );
  }
   getHorarios(id){
    return  this.http.get<any[]>(`${this.url}${id}/horarios/`,this.httpOptions).pipe(
      retry(1)
    );
  }
  put(id,medico : Medico){
    return this.http.put<Medico[]>(`${this.url}${id}/`,medico,this.httpOptions).pipe(
      retry(1)
    );
  }
}
