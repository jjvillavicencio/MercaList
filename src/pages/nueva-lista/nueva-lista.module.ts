import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NuevaListaPage } from './nueva-lista';

@NgModule({
  declarations: [
    NuevaListaPage,
  ],
  imports: [
    IonicPageModule.forChild(NuevaListaPage),
  ],
})
export class NuevaListaPageModule {}
