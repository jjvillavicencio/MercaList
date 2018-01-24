import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { supermercados } from "../../environments/supermercados";

/**
 * Generated class for the SupermercadosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-supermercados',
  templateUrl: 'supermercados.html',
})
export class SupermercadosPage {

  private listado = supermercados;
  public locales:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupermercadosPage');
    console.log(this.listado);
    
  }

  seleccionCiudad(ciudad){
    this.locales = this.listado[ciudad];
    console.log(this.locales);
    
  }
  nuevaLista(supermercado){
    this.navCtrl.push('NuevaListaPage',{supermercadoId:supermercado})
  }
}
