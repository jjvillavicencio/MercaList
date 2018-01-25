import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the WebServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WebServiceProvider {

  apiUrl = 'http://192.168.1.19:8000/api/v1';

  constructor(public http: HttpClient) {
    console.log('Hello WebServiceProvider Provider');
  }

  getCategorias() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/categoria').subscribe((data) => {
        resolve(data);
      }, (err) => {
        console.error('getCategorias', err);

      })
    })
  }
}
