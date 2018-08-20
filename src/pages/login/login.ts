import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController, Loading,AlertController,ToastController} from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

import { DbalcoholProvider } from '../../providers/dbalcohol/dbalcohol';
import { HomePage } from '../../pages/home/home'; 
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public user:string;
  public password:string;
  loading: Loading;
  public crendeciales:any;
  public registerCredentials = { user: '', password: '' ,session:false};
  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      private dbLicor:DbalcoholProvider,
      private alertCtrl: AlertController, 
      private loadingCtrl: LoadingController,
      public toastCtrl: ToastController) {
        this.crendeciales=[];
        
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    // this.checkRootPage();
  }

  login(){
    // this.showLoading();
        this.dbLicor.checkUserDefault().then(data=>{
          if(data.length > 0 ){
            this.dbLicor.login(this.user,this.password).then(data=>{
              this.crendeciales=data;
              alert(this.crendeciales[0].session);
              if(data.length > 0){
                alert("acceso");
                this.dbLicor.abrirSession();
                this.navCtrl.setRoot(HomePage); 
              }else{
                alert("error");
                this.showError("Access Denied");
              }
            });
          }// fin de if
          else{
            alert("Sin usuario, creando usuario default admin");
            this.dbLicor.create('admin','admin');
            let toast = this.toastCtrl.create({
              message: 'Usuario creado exitosamente',
              duration: 3000
            });
            toast.present();
          }
        });
        
     
  
  }// login

//   checkRootPage(){
//     this.dbLicor.checkUserDefault().then(data=>{
//       alert("chch root page");
//       alert(data.length);
//       if(data.length > 0 ){
//         if(data[0].session == '1'){
//           this.navCtrl.setRoot(HomePage); 
//         }
//       }// fin de if
//       else{
//         this.dbLicor.create('admin','admin');
//       }
//     });
//   }//

//   ionViewWillEnter() {
//     console.log("llamada en home");
//     this.checkRootPage();
// }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }// showLoading

  showError(text) {
    this.loading.dismiss();
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }


}
