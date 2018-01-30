import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';

import { DatosRegistro } from "../../models/datos-registro";
import { AngularFireAuth } from "angularfire2/auth";

// import { ImagePicker } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { WebServiceProvider } from "../../providers/web-service/web-service";
import { Crop } from '@ionic-native/crop';
import { Base64 } from '@ionic-native/base64';
import { toBase64String } from '@angular/compiler/src/output/source_map';

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  public datosRegistro = {} as DatosRegistro;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private angularFireAuth: AngularFireAuth,
    private camera: Camera,
    // private imagePicker: ImagePicker,
    private actionSheetCtrl: ActionSheetController,
    private webServicePrv: WebServiceProvider,
    private crop: Crop,
    private base64: Base64,
    private alertCtrl: AlertController,
  ) {
  }

  ionViewDidLoad() {
    this.datosRegistro.avatar = 'http://nohay.com/imagen.png'
    console.log('ionViewDidLoad RegistroPage');
  }

  async registro(datosRegistro: DatosRegistro) {

    console.log('datos:', this.datosRegistro);


    try {
      await this.angularFireAuth.auth.createUserWithEmailAndPassword(
        datosRegistro.correo,
        datosRegistro.password
      ).then(
        (res) => {
          this.sendEmailVerification();
        },
        (e) => {
          console.error('crear cuenta',e);
          if (e.code === "auth/email-already-in-use") {
            let alertCrear = this.alertCtrl.create({
              title: 'Registro',
              subTitle: 'Error al registrarte',
              message: `Ya existe un usuario registrado con este correo, ${datosRegistro.correo}`,
              buttons:[
                {
                  text: 'Aceptar'
                }
              ]
            }).present();
          }else{
            let alertCrear = this.alertCtrl.create({
              title: 'Registro',
              subTitle: 'Error al registrarte',
              message: `Tuvimos un inconveniente al registrate, intenta más tarde.`,
              buttons:[
                {
                  text: 'Aceptar'
                }
              ]
            }).present();
          }
        }
      );
    } catch (e) {
      console.error(e);

    }
  }

  async sendEmailVerification() {
    await this.angularFireAuth.authState.subscribe(user => {
      user.sendEmailVerification().then(
        () => {
          let alertVerif = this.alertCtrl.create({
            title: 'Verificar correo',
            message: `Confirma la cuenta haciendo click en el link enviado a tu correo, ${this.datosRegistro.correo}`,
            buttons: [
              {
                text: 'Aceptar',
                handler: () => {

                }
              }
            ]
          });
          alertVerif.present().then(
            ()=>{
              this.navCtrl.pop();
            }
          );
        },
        (err) => {
          console.error('Verificar email', err);

        }
      )
    });
  }

  seleccionarImg() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Seleccione su foto',
      buttons: [
        {
          text: 'Galería',
          handler: () => {
            console.log('galería');
            this.abrirGaleria();

          }
        },
        {
          text: 'Cámara',
          handler: () => {
            console.log('Cámara');
            this.abrirCamara();
          }
        },
        {
          text: 'Cancel',
          role: 'destructive',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  abrirGaleria() {
    //   this.imagePicker.getPictures({ maximumImagesCount: 1, width: 126, height: 126 }).then(
    //     (imagen) => {
    //       console.log('seleccionar imagen', imagen);

    //     },
    //     (err) => {
    //       console.error('seleccionar imagen', err);

    //     }
    //   );
  }

  abrirCamara() {
    const opciones: CameraOptions = {
      quality: 100,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight: 500,
      targetWidth: 500
    }

    this.camera.getPicture(opciones).then(
      (foto) => {

        this.crop.crop(foto)
          .then(
            (newImage) => {
              this.base64.encodeFile(newImage).then(
                (base64File) => {
                  var str = base64File.replace(/(?:\r\n|\r|\n)/g, '');
                  str = str.replace('data:image/*;charset=utf-8;base64,', '');
                  this.webServicePrv.uploadImagur(str).then(
                    (respuesta: any) => {
                      console.log('subirCamara', respuesta);
                      this.datosRegistro.avatar = respuesta.data.link;

                    },
                    (err) => {
                      console.error('subirCamara', err);

                    }
                  )
                },
                (err) => {
                  console.error('base64 convert', err);
                });
            },
            (error) => {
              console.error('crop imagen', error);

            }
          );
      },
      (err) => {
        console.error('foto', err);

      }
    );
  }
}
