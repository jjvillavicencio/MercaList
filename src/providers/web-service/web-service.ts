import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  uploadImagur(imagen) {
    let datosImagen = {
      image: ''+imagen,
      title: 'mercalist',
    }
    return new Promise(resolve => {
      this.http.post('https://api.imgur.com/3/image', datosImagen, {
        headers: new HttpHeaders().set('Authorization', 'Client-ID 35aca59ed37ab01'),
      }).subscribe(
        (data) => {
          resolve(data);
          console.log('imagur', data);

        },
        (err) => {
          console.error('imagur', err);

        }
      )
    })
  }
}
