import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ServicecarProvider, ServiceCar } from '../../providers/servicecar/servicecar';
import { CarProvider } from '../../providers/car/car';

@IonicPage()
@Component({
  selector: 'page-edit-servicecar',
  templateUrl: 'edit-servicecar.html',
})
export class EditServicecarPage {
 model: ServiceCar;
 cars: any[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController, private ServicecarProvider: ServicecarProvider, private CarProvider: CarProvider) {
    this.model = new ServiceCar();

    if(this.navParams.data.id){
      this.ServicecarProvider.get(this.navParams.data.id)
      .then((result: any) => {
        this.model = result;
      })

    }
}

  ionViewDidLoad() {
    this.CarProvider.getAll()
    .then((result: any[]) => {
      this.cars = result;
    })
    .catch(() => {
      this.toast.create({message: 'Erro ao carregar carros', duration: 3000, position: 'botton'}).present();
    })
  }

  save() {
    this.saveServiceCar()
    .then(() => {
      this.toast.create({message: 'Servico Salvo', duration: 3000, position: 'botton'}).present();
      this.navCtrl.pop;
    })
    .catch(() => {
      this.toast.create({message: 'Erro ao salvar Servico', duration: 3000, position: 'botton'}).present();

    })

  }

  private saveServiceCar() {
    if(this.model.id){
      return this.ServicecarProvider.update(this.model);

    }else{
     return this.ServicecarProvider.insert(this.model);

    }
  }

}
