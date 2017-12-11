import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

emails: string = null;
passwords: string = null;


constructor(public navCtrl: NavController, private toast: ToastController, private LoginProvider: LoginProvider) { }

  addLogin() {
    this.navCtrl.push('EditLoginPage');
  }

  getLogin() {
    var strCallback = (res: boolean) : void => {
          if(res) {
              this.toast.create({message: 'entrou', duration: 3000, position: 'botton'}).present();
              this.navCtrl.push('ListAllServicesPage');
          }
          else {
              alert("Login ou senha incorretos.");
          }
      }
      this.LoginProvider.getValidaLogin(this.emails, this.passwords, strCallback);
  }

  filterLogin(ev: any) {
    this.getLogin();
  }

}
