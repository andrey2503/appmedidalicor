import { Component } from '@angular/core';
import { NavController,AlertController,ToastController } from 'ionic-angular';

import { DbalcoholProvider } from '../../providers/dbalcohol/dbalcohol';
import { LoginPage } from '../login/login';
// import { TipoLicorPage } from '../tipo-licor/tipo-licor';
// import { AgregarLicorCategoriaPage } from '../agregar-licor-categoria/agregar-licor-categoria';
import { ListaSubLicoresPage } from '../lista-sub-licores/lista-sub-licores';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public tipos_licor:any;
  public licores_categorias:any;
  public nombreNuevoLicor:any;
  public envase:any;
  claseModal: string = 'quitar-modal';
  constructor(
    public navCtrl: NavController,
    private dbLicor:DbalcoholProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
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
    const prompt = this.alertCtrl.create({
      title: 'Nuevo tipo de Licor',
      message: "Ingrese el nombre del nuevo tipo de licor",
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
            // alert('Saved clicked'+data.nombre);
            
            this.agregarTipoLicor(data.nombre);
          }
        }
      ]
    });
  
    prompt.present();
  }// fin de nuevoTipo


  quitarModal(){
    // alert("quitar modal"+ this.nombreNuevoLicor+" dsd "+this.envase);
    this.claseModal = 'quitar-modal';
  }

  public nombreDeTipo:any;
  public rowIdagregar:any;
  nuevoLicor(nombre,rowid ){
    this.rowIdagregar=rowid;
    this.nombreDeTipo=nombre;
    this.claseModal = 'modal-backgroud';
  }

  agregarNuevoLicor(){
    //alert("1: "+this.rowIdagregar+" 2: " +this.nombreNuevoLicor+" 3:"+this.envase);
    this.agregarCategoriaLicor(this.rowIdagregar,this.nombreNuevoLicor,this.envase);
    this.quitarModal();
    this.rowIdagregar=1;
    this.nombreNuevoLicor="";
  }// fin de agregarNuevoLicor


  agregarCategoriaLicor(idtipo,nombre,envase){
    this.dbLicor.agregarCategoriaLicor(idtipo,nombre,envase).then(data=>{
      if(data){
        this.cargarCategoriasLicores();
        this.mensaje("Categoria agregada exitosamente");
      }
    });
  }// agregarTipoLicor


  verLicor(id,nombre){
    this.navCtrl.push(ListaSubLicoresPage,{'id':id,'nombre':nombre});
  }//

  agregarTipoLicor(nombre){
    this.dbLicor.agregarTipoLicor(nombre).then(data=>{
      if(data){
        this.cargarCategoriasLicores();
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
 

}
