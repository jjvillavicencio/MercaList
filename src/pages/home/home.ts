import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Perfil } from "../../models/perfil";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  rootPage = "HomePage";
  public perfil = {} as Perfil;

  constructor(public navCtrl: NavController) {
    this.perfil = {
      nombre: 'John Villavicencio',
      coverImagen: 'assets/imgs/cover-min.jpg',
      imagenPerfil: 'assets/imgs/perfil.svg',
      compras: '25',
      listas: '2',
      ciudad: 'Loja'
    }

  }

  irPagina(pagina){
    this.navCtrl.push(pagina,{},{animation:'ios-transition', direction: 'forward'});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
}
