import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistroPage } from './registro';

// import { ImagePicker } from '@ionic-native/image-picker';
import { Camera } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import { Base64 } from '@ionic-native/base64';

@NgModule({
  declarations: [
    RegistroPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistroPage),
  ],
  providers:[
    Camera,
    Crop,
    Base64,
    // ImagePicker
  ]
})
export class RegistroPageModule {}
