import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DbalcoholProvider } from '../../providers/dbalcohol/dbalcohol';
import { LoginPage } from '../login/login';
import { TipoLicorPage } from '../tipo-licor/tipo-licor';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public tipos_licor:any;
  constructor(
    public navCtrl: NavController,
    private dbLicor:DbalcoholProvider
  ) {
    this.tipos_licor=[];
  }

  ionViewWillEnter() {
   this.cargarTiposLicores();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    // this.cargarTiposLicores();
  }

  cargarTiposLicores(){
    this.dbLicor.tiposLicor().then(data=>{
      this.tipos_licor=data;
    });
  }// fin de cargarTiposLicores

  logOut(){
    this.dbLicor.cerrarSession();
    this.navCtrl.setRoot(LoginPage); 
  }// fin de logOut

  nuevoTipo(){
    this.navCtrl.push(TipoLicorPage);
  }// fin de nuevoTipo

  nuevoLicor(){

  }// fin de nuevoLicor
 

}
