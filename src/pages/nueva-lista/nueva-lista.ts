import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NuevaListaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nueva-lista',
  templateUrl: 'nueva-lista.html',
})
export class NuevaListaPage {
  public supermercado:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.supermercado = this.navParams.get('supermercadoId');
    console.log('parametro', this.supermercado);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NuevaListaPage');
    
  }

  addProductos(){
    console.log('acuaaa');
    
    this.navCtrl.push('ProductosPage', {supermercadoId: this.supermercado})
  }
}
