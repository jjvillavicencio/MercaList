import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SupermercadosPage } from './supermercados';

@NgModule({
  declarations: [
    SupermercadosPage,
  ],
  imports: [
    IonicPageModule.forChild(SupermercadosPage),
  ],
})
export class SupermercadosPageModule {}
