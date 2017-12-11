import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';


@Injectable()
export class ServicecarProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public insert(servicecar: ServiceCar) {
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) =>{
      let sql = 'insert into servicecars (nameservice, duedate, platecar, problemcar, ativo, car_id) values (?,?,?,?,?,?)';
      let data = [servicecar.nameservice, servicecar.duedate, servicecar.platecar, servicecar.problemcar, servicecar.ativo ? 1 : 0, servicecar.car_id];

      return db.executeSql(sql, data)
      .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  }

  public update(servicecar: ServiceCar) {
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) =>{
      let sql = 'update servicecars set nameservice = ?, duedate = ?, platecar = ?, problemcar = ?, ativo = ?, car_id = ? where id = ?';
      let data = [servicecar.nameservice, servicecar.duedate, servicecar.platecar, servicecar.problemcar, servicecar.ativo ? 1 : 0, servicecar.car_id, servicecar.id];

      return db.executeSql(sql, data)
      .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  }

  public remove(id: number) {
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) =>{
      let sql = 'delete from servicecar where id = ?';
      let data = [id];

      return db.executeSql(sql, data)
      .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  }

  public get(id: number) {
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) =>{
      let sql = 'select * from servicecars where id = ?';
      let data = [id];

      return db.executeSql(sql, data)
      .then((data: any) => {
        if(data.rows.length > 0){
          let item = data.rows.item(0)
          let servicecar = new ServiceCar();
          servicecar.id = item.id;
          servicecar.nameservice = item.nameservice;
          servicecar.duedate = item.duedate;
          servicecar.platecar = item.platecar;
          servicecar.problemcar = item.problemcar;
          servicecar.ativo  = item.ativo;
          servicecar.car_id = item.car_id;

          return servicecar;
        }

       return null;

      })
      .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  }

  public getAll(ativo: boolean, name: string = null) {
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) =>{
//let sql = 'SELECT * FROM servicecars where ativo = ?';
 let sql = 'SELECT s.*, c.name as car_name FROM servicecars s inner join car c on s.car_id = c.id where s.ativo = ?';
  
      let data: any[] = [ativo ? 1 : 0];

      if (name) {
          sql += ' and p.nameservice like ? '
          data.push('%' + name + '%');
       }

      return db.executeSql(sql, data)
      .then((data: any) => {
        if(data.rows.length > 0){
          let servicecars: any[] = [];

          for(var i = 0; i < data.rows.length; i++){
            var servicecar =  data.rows.item(i);
            servicecars.push(servicecar);
          }

          return servicecars;

        }else{
          return [];
        }

      })

      .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));


  }
}

export class ServiceCar{
  id: number;
  nameservice: string;
  duedate: Date;
  platecar: string;
  problemcar: string;
  ativo: boolean;
  car_id: number;

}
