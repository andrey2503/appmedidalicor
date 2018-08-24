import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';

/**
 * Generated class for the AgregarLicorCategoriaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { DbalcoholProvider } from '../../providers/dbalcohol/dbalcohol';

@IonicPage()
@Component({
  selector: 'page-agregar-licor-categoria',
  templateUrl: 'agregar-licor-categoria.html',
})
export class AgregarLicorCategoriaPage {
  public tipos_licor:any;
  public tipo_licor:any;
  public nombre:string;
  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      private dbLicor:DbalcoholProvider,
      public toastCtrl: ToastController
      
    ) {
    this.tipos_licor=[];
    this.tipos_licor= this.navParams.get('tipos_licor');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgregarLicorCategoriaPage');
  }

  agregarTipoLicor(){
    // alert(this.nombre);
    // alert(this.tipo_licor);
    this.dbLicor.agregarCategoriaLicor(this.tipo_licor,this.nombre).then(data=>{
      if(data){
        this.mensaje("Categoria agregada exitosamente");
      }
    });
  }// agregarTipoLicor

  mensaje(texto:any){
    let toast = this.toastCtrl.create({
      message: texto,
      duration: 3000
    });
    toast.present();
  }// fin de mensaje

}// fin de la clase
