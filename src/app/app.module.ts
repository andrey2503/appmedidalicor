import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DbalcoholProvider } from '../providers/dbalcohol/dbalcohol';
import { SQLite } from '@ionic-native/sqlite';
import { HttpClientModule } from '@angular/common/http';
import { TipoLicorPage } from '../pages/tipo-licor/tipo-licor';
import { AgregarLicorCategoriaPage } from '../pages/agregar-licor-categoria/agregar-licor-categoria';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TipoLicorPage,
    AgregarLicorCategoriaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TipoLicorPage,
    AgregarLicorCategoriaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DbalcoholProvider,
    SQLite
  ]
})
export class AppModule {}
