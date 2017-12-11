import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { LoginProvider, Login } from '../../providers/login/login';

@IonicPage()
@Component({
  selector: 'page-edit-login',
  templateUrl: 'edit-login.html',
})
export class EditLoginPage {

  model: Login;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController, private LoginProvider: LoginProvider) {
    this.model = new Login();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditLoginPage');
  }

  save() {
    this.saveLogin()
    .then(() => {
      this.toast.create({message: 'Login Salvo', duration: 3000, position: 'botton'}).present();
      this.navCtrl.pop;
    })
    .catch(() => {
      this.toast.create({message: 'Erro ao salvar Login', duration: 3000, position: 'botton'}).present();

    })

  }
  private saveLogin() {
      return this.LoginProvider.insertLogin(this.model);
  }

}
