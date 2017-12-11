import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { ServicecarProvider, ServiceCar } from '../../providers/servicecar/servicecar';

@IonicPage()
@Component({
  selector: 'page-list-all-services',
  templateUrl: 'list-all-services.html',
})
export class ListAllServicesPage {

  servicecarsvec: any[] = [];
  onlyInactives: boolean = false;
  searchText: string = null;

  constructor(public navCtrl: NavController, private toast: ToastController, private ServicecarProvider: ServicecarProvider) { }

  ionViewDidEnter() {
    this.getAllServiceCars();
  }

  getAllServiceCars() {
    this.ServicecarProvider.getAll(!this.onlyInactives, this.searchText)
    .then((result: any[]) => {
      this.servicecarsvec = result;
    })
  }

  addServiceCar() {
    this.navCtrl.push('EditServicecarPage');
  }

  editServiceCar(id: number) {
    this.navCtrl.push('EditServicecarPage', {id: id});
  }

  removeServiceCar(servicecar: ServiceCar) {
    this.ServicecarProvider.remove(servicecar.id)
    .then(() => {
      var index = this.servicecarsvec.indexOf(servicecar);
      this.servicecarsvec.splice(index, 1);
      this.toast.create({message: 'servico removido.', duration: 3000, position: 'botton'}).present();

    })

  }

  filterServiceCar(ev: any) {
    this.getAllServiceCars();
  }

}
