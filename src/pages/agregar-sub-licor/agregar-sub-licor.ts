import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';

/**
 * Generated class for the AgregarSubLicorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { DbalcoholProvider } from '../../providers/dbalcohol/dbalcohol';

@IonicPage()
@Component({
  selector: 'page-agregar-sub-licor',
  templateUrl: 'agregar-sub-licor.html',
})
export class AgregarSubLicorPage {
  public id:any;
  public nombre:string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private dbLicor:DbalcoholProvider,
    public toastCtrl: ToastController
  ) {
    this.id= this.navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgregarSubLicorPage');
    // alert(this.id);
  }

  agregarSubLicor(){
    this.dbLicor.agregarsubLicor(this.id,this.nombre).then(data=>{
      if(data){
        this.mensaje("Licor agregado exitosamente");
      }
    });
  }//agregarsublicor

  mensaje(texto:any){
    let toast = this.toastCtrl.create({
      message: texto,
      duration: 3000
    });
    toast.present();
  }// fin de mensaje

}
