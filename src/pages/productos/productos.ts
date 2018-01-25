import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WebServiceProvider } from "../../providers/web-service/web-service";

/**
 * Generated class for the ProductosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-productos',
  templateUrl: 'productos.html',
})
export class ProductosPage {

  public supermercadoId: any;
  public tipo_listado = 'categorias';
  public categorias: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public webServiceProvider: WebServiceProvider,
  ) {
    this.supermercadoId = this.navParams.get('supermercadoId')
    console.log(this.supermercadoId);
  }

  ionViewDidLoad() {
    this.getCategorias();
    console.log('ionViewDidLoad ProductosPage');
  }

  getCategorias() {
    this.webServiceProvider.getCategorias().then(
      (categorias) => {
        this.categorias = categorias;
      }, (err) => {
        console.error('getCategorias', err);

      }
    )
  }

}
