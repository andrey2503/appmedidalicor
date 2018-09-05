import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ToastController } from 'ionic-angular';

/**
 * Generated class for the ListaSubLicoresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { DbalcoholProvider } from '../../providers/dbalcohol/dbalcohol';
// import { AgregarSubLicorPage } from '../agregar-sub-licor/agregar-sub-licor';
@IonicPage()
@Component({
  selector: 'page-lista-sub-licores',
  templateUrl: 'lista-sub-licores.html',
})
export class ListaSubLicoresPage {
  public id:any;
  public sublicores:any;
  public nombre:any;
  public nombrelicor:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dbLicor:DbalcoholProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
  ) {
    this.sublicores=[];
    this.id= this.navParams.get('id');
    this.nombrelicor= this.navParams.get('nombre');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaSubLicoresPage');
    // this.cargarSubListaLicores(this.id);
  }
  ionViewWillEnter() {
    console.log("llamada en home");
    // alert(this.id);
    this.cargarSubListaLicores(this.id);
}

  cargarSubListaLicores(id){
    this.dbLicor.getsubcategoriasLicor(id).then(data=>{
      if(data.length>0){
        this.sublicores=data;
      }
    });
  }// fin de cargarSubListaLicores

  agregarLicor(){
      // this.navCtrl.push(AgregarLicorCategoriaPage,{'tipos_licor':this.tipos_licor});
      const prompt = this.alertCtrl.create({
        title: 'Agregar '+this.nombrelicor,
        message: "Ingrese el nombre",
        inputs: [
          {
            name: 'nombre',
            placeholder: 'Nombre'
          },
        ],
        buttons: [
          {
            text: 'Cancelar',
            handler: data => {
              alert('Cancel clicked'+data);
            }
          },
          {
            text: 'Guardar',
            handler: data => {
              this.agregarSubLicor(this.id,data.nombre);
              alert('Saved clicked'+data.nombre);
            }
          }
        ]
      });
      prompt.present();
  }// alert

  agregarSubLicor(idlicor,licornombre){
    // this.navCtrl.push(AgregarSubLicorPage,{'id':this.id});
    this.dbLicor.agregarsubLicor(idlicor,licornombre).then(data=>{
      if(data){
        this.mensaje("Licor agregado exitosamente");
        this.cargarSubListaLicores(this.id);
        
      }
    });
  }// fin de agregarSubLicor

  mensaje(texto:any){
    let toast = this.toastCtrl.create({
      message: texto,
      duration: 3000
    });
    toast.present();
  }// fin de mensaje

}
