import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
      console.error('Ingreso:', e.code);
    }
  }

  async registro(usuario: Usuario) {
    try {
      await this.angularFireAuth.auth.createUserWithEmailAndPassword(
        usuario.correo,
        usuario.password
      ).then(
        (res) => {
          this.sendEmailVerification();
        },
        (e) => {
          console.error(e);
        }
        );
    } catch (e) {
      console.error(e);

    }
  }

  async sendEmailVerification() {
    await this.angularFireAuth.authState.subscribe(user => {
      user.sendEmailVerification()
        .then(() => {
          console.log('email sent');
        })
    });
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
