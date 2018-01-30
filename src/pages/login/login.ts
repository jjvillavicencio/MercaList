import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Usuario } from "../../models/usuario";
import { AngularFireAuth } from "angularfire2/auth";


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  usuario = {} as Usuario;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private angularFireAuth: AngularFireAuth,
    private alertCtrl: AlertController,
  ) {
  }

  async ingreso(usuario: Usuario) {
    try {
      await this.angularFireAuth.auth.signInWithEmailAndPassword(
        usuario.correo,
        usuario.password
      ).then(
        (user) => {
          if (user.emailVerified) {
            this.navCtrl.setRoot('HomePage');

          } else {
            console.log('revise su bandeja de correo');

          }
        }
        );
    } catch (e) {
      console.error('Ingreso:', e);
      let alert = this.alertCtrl.create({
        title: 'Error de ingreso',
        subTitle: 'Usuario y/o contraseña inválidos.',
        buttons: ['Aceptar']
      });
      alert.present();
    }
  }

  async registro() {
    this.navCtrl.push('RegistroPage');
  }

  async recuperarPass(usuario) {
    if (!usuario.correo) {
      alert('Primero ingresa tu correo');
    }else{
    await this.angularFireAuth.auth.sendPasswordResetEmail(usuario.correo)
    .then(() => {
      console.log('Correo enviado');
      alert('Revisa tu correo y sigue las instrucciones.');
    })
  }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
