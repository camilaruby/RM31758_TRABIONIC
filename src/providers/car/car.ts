import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class CarProvider {

    constructor(private dbProvider: DatabaseProvider) { }

    public getAll() {
      return this.dbProvider.getDB()
      .then((db: SQLiteObject) =>{

        return db.executeSql('select * from car', [])
        .then((data: any) => {
          if(data.rows.length > 0){
            let cars: any[] = [];

            for(var i = 0; i < data.rows.length; i++){
              var car =  data.rows.item(i);
              cars.push(car);
            }
            
            return cars;

          }else{
            return [];
          }

        })

        .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));


    }

}
