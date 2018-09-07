import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
/*
  Generated class for the DbalcoholProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DbalcoholProvider {
  public database:SQLiteObject=null;
  public dbestado:boolean=false;
  constructor(public http: HttpClient,private sqlite: SQLite) {
    console.log('Hello DbalcoholProvider Provider');
    this.cargarDB();
  }

  cargarDB(){
    return this.sqlite.create({
      name: 'db_adminlicor.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.database=db;
        this.crearTablas();
        this.dbestado=true;
        return true;
      })//fin del then
      .catch(e => console.log(e));
  }// fin de cargar DB

  crearTablas(){
        this.database.executeSql('create table if not exists Users(user TEXT,password TEXT,session INT)', [])
        .then(() => console.log("creadas tablas en then crea tablas"))
        .catch(e => alert("error uno"+e));

        this.database.executeSql('create table if not exists Tipo_licor(nombre TEXT)', [])
        .then(() => console.log("creadas tablas en then crea tablas"))
        .catch(e => alert("error dos "+e));

        this.database.executeSql('create table if not exists licor_categoria(fk_tipolicor INT,nombre TEXT,envase INT)', [])
        .then(() => console.log("creadas tablas en then crea tablas"))
        .catch(e => alert("error tres "+e));

        this.database.executeSql('create table if not exists sub_licor_categoria(fk_categorialicor INT,nombre TEXT)', [])
        .then(() => console.log("creadas tablas en then crea tablas"))
        .catch(e => alert("error cuatro "+e));
      
  }// fin de crear tabla

  estadoDB(){
      return this.dbestado;
  }// fin de estadoDB

  create(user: any,password:any){
    let sql = 'INSERT INTO Users(user, password,session) VALUES(?,?,?)';
    return this.database.executeSql(sql, [user, password,0]);
  }// fin de create
  deleteAll(){
    let sql = 'DELETE FROM Users';
    return this.database.executeSql(sql, []);
  }// fin de deleteAll

  login(user:any,password:any){
    // let sql = 'SELECT * FROM Users';
    let sql = 'SELECT * FROM Users WHERE user = ? AND password = ?';
    return this.database.executeSql(sql, [user, password])
    .then(response => {
      let tasks = [];
      for (let index = 0; index < response.rows.length; index++) {
        tasks.push( response.rows.item(index) );
      }
      return Promise.resolve( tasks );    
    })
    .catch(error => Promise.reject(error));
  }

  getAll(){
    let sql = 'SELECT * FROM Users ';
    return this.database.executeSql(sql, [])
    .then(response => {
      let tasks = [];
      for (let index = 0; index < response.rows.length; index++) {
        tasks.push( response.rows.item(index) );
      }
      return Promise.resolve( tasks );
    })
    .catch(error => Promise.reject(error));
  }// fin de getAll

  checkUserDefault(){
    if(this.cargarDB()){

    let sql = 'SELECT * FROM Users ';
    return this.database.executeSql(sql, [])
    .then(response => {
      let tasks = [];
      for (let index = 0; index < response.rows.length; index++) {
        tasks.push( response.rows.item(index) );
      }
      return Promise.resolve( tasks );
    })
    .catch(error => Promise.reject(error));
  }// fin del if
    
  }// fin de checkUserDefault

  cerrarSession(){
      let sql = 'UPDATE Users SET session=?';
      return this.database.executeSql(sql, [0 ]);
  }// cerrar session

  abrirSession(){
    let sql = 'UPDATE Users SET session=?';
    return this.database.executeSql(sql, [1]);
  }// abrir session

  tiposLicor(){
    let sql = 'SELECT rowid,nombre FROM Tipo_licor ';
    return this.database.executeSql(sql, [])
    .then(response => {
      let tasks = [];
      for (let index = 0; index < response.rows.length; index++) {
        tasks.push( response.rows.item(index) );
      }
      return Promise.resolve( tasks );
    })
    .catch(error => Promise.reject(error));
  }// fin de tiposLicor

  agregarTipoLicor(nombre:any){
    let sql = 'INSERT INTO Tipo_licor(nombre) VALUES(?)';
    return this.database.executeSql(sql, [nombre]).then(data=>{
      return Promise.resolve({agregar:true});
    });
  }// fin de agregarTipoLicor

  categoriasLicor(){
    let sql = 'SELECT rowid,nombre,fk_tipolicor,envase FROM licor_categoria ';
    return this.database.executeSql(sql, [])
    .then(response => {
      let tasks = [];
      for (let index = 0; index < response.rows.length; index++) {
        tasks.push( response.rows.item(index) );
      }
      return Promise.resolve( tasks );
    })
    .catch(error => Promise.reject(error));
  }// fin de categoriasLicor

  agregarCategoriaLicor(fk_tipolicor:any,nombre:any,envase:any){
    let sql = 'INSERT INTO licor_categoria(fk_tipolicor,nombre,envase) VALUES(?,?,?)';
    return this.database.executeSql(sql, [fk_tipolicor,nombre,envase]).then(data=>{
      return Promise.resolve({agregar:true});
    });
  }// fin de agregarTipoLicor

  agregarsubLicor(fk_categorialicor:any,nombre:any){
    let sql = 'INSERT INTO sub_licor_categoria(fk_categorialicor,nombre) VALUES(?,?)';
    return this.database.executeSql(sql, [fk_categorialicor,nombre]).then(data=>{
      return Promise.resolve({agregar:true});
    });
  }// fin de agregarTipoLicor

  getsubcategoriasLicor(id){
    let sql = 'SELECT rowid,nombre,fk_categorialicor FROM sub_licor_categoria WHERE fk_categorialicor=?';
    return this.database.executeSql(sql, [id])
    .then(response => {
      let tasks = [];
      for (let index = 0; index < response.rows.length; index++) {
        tasks.push( response.rows.item(index) );
      }
      return Promise.resolve( tasks );
    })
    .catch(error => Promise.reject(error));
  }// fin de categoriasLicor

}// fin de la clase
