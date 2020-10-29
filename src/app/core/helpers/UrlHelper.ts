import {Injectable} from '@angular/core';

@Injectable()
export class UrlHelper {
    public static formatParams(params,pagination = false){
      if(pagination){
        params.offset = params.limit * params.page;
      }
      if(!params)
        return ''
      let retorno = '?'
      let i =0;
      Object.keys(params).map(key=>{
          if(i!= 0){
              retorno += '&'
          }
            retorno+=key+'='+params[key]
        i++;
          return key
        })
      return retorno
    }
}
