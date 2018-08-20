import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ListaSubLicoresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { DbalcoholProvider } from '../../providers/dbalcohol/dbalcohol';
import { AgregarSubLicorPage } from '../agregar-sub-licor/agregar-sub-licor';
@IonicPage()
@Component({
  selector: 'page-lista-sub-licores',
  templateUrl: 'lista-sub-licores.html',
})
export class ListaSubLicoresPage {
  public id:any;
  public sublicores:any;
  public nombre:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dbLicor:DbalcoholProvider
  ) {
    this.sublicores=[];
    this.id= this.navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaSubLicoresPage');
    // this.cargarSubListaLicores(this.id);
  }
  ionViewWillEnter() {
    console.log("llamada en home");
    alert(this.id);
    this.cargarSubListaLicores(this.id);
}

  cargarSubListaLicores(id){
    this.dbLicor.getsubcategoriasLicor(id).then(data=>{
      if(data.length>0){
        this.sublicores=data;
      }
    });
  }// fin de cargarSubListaLicores

  agregarSubLicor(){
    this.navCtrl.push(AgregarSubLicorPage,{'id':this.id});
  }// fin de agregarSubLicor

}
