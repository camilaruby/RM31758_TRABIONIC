import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListAllServicesPage } from './list-all-services';

@NgModule({
  declarations: [
    ListAllServicesPage,
  ],
  imports: [
    IonicPageModule.forChild(ListAllServicesPage),
  ],
})
export class ListAllServicesPageModule {}
