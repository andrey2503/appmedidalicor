import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';

/**
 * Generated class for the TipoLicorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { DbalcoholProvider } from '../../providers/dbalcohol/dbalcohol';
@IonicPage()
@Component({
  selector: 'page-tipo-licor',
  templateUrl: 'tipo-licor.html',
})
export class TipoLicorPage {
  public nombre:string;  
  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      private dbLicor:DbalcoholProvider,
      public toastCtrl: ToastController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TipoLicorPage');
  }
  

  agregarTipoLicor(){
    this.dbLicor.agregarTipoLicor(this.nombre).then(data=>{
      if(data){
        this.mensaje("agregado existosamente");
      }
    });
  }// fin de agregarTipoLicor

  mensaje(texto:any){
    let toast = this.toastCtrl.create({
      message: texto,
      duration: 3000
    });
    toast.present();
  }


}// fin de la clase
