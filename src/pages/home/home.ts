import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DbalcoholProvider } from '../../providers/dbalcohol/dbalcohol';
import { LoginPage } from '../login/login';
import { TipoLicorPage } from '../tipo-licor/tipo-licor';
import { AgregarLicorCategoriaPage } from '../agregar-licor-categoria/agregar-licor-categoria';
import { ListaSubLicoresPage } from '../lista-sub-licores/lista-sub-licores';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public tipos_licor:any;
  public licores_categorias:any;
  constructor(
    public navCtrl: NavController,
    private dbLicor:DbalcoholProvider
  ) {
    this.tipos_licor=[];
    this.licores_categorias=[];
  }

  ionViewWillEnter() {
   this.cargarCategoriasLicores();
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

  cargarCategoriasLicores(){
    this.dbLicor.categoriasLicor().then(data=>{
      this.licores_categorias=data;
      this.cargarTiposLicores();
    });
  }// fin de cargarCategoriasLicores()

  cargar

  logOut(){
    this.dbLicor.cerrarSession();
    this.navCtrl.setRoot(LoginPage); 
  }// fin de logOut

  nuevoTipo(){
    this.navCtrl.push(TipoLicorPage);
  }// fin de nuevoTipo

  nuevoLicor(){
    this.navCtrl.push(AgregarLicorCategoriaPage,{'tipos_licor':this.tipos_licor});
  }// fin de nuevoLicor

  verLicor(id,nombre){
    this.navCtrl.push(ListaSubLicoresPage,{'id':id,'nombre':nombre});
  }//
 

}
