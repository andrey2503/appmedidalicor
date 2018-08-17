import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
    private dbLicor:DbalcoholProvider
  ) {
    this.id= this.navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgregarSubLicorPage');
    alert(this.id);
  }

  agregarSubLicor(){
    this.dbLicor.agregarsubLicor(this.id,this.nombre).then(data=>{
      alert(data);
    });
  }//agregarsublicor

}
