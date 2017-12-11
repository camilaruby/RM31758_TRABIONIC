import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class LoginProvider {
    constructor(private dbProvider: DatabaseProvider) { }

    public insertLogin(login: Login) {
      return this.dbProvider.getDB()
      .then((db: SQLiteObject) =>{
        let sql  = 'insert into login (email, password) values (?, ?)';
        let data = [login.email.toUpperCase().trim(), login.password];
        return db.executeSql(sql, data)
        .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
    }

    public getValidaLogin(email: string, password: string, callback: (res: boolean) => any) {
        this.dbProvider.getDB().then((db: SQLiteObject) =>{
        let sql = "SELECT * FROM login where upper(email) = ? and password = ?";
        return db.executeSql(sql, [email.toUpperCase().trim(), password])
        .then((data: any) => {
            return data.rows.length > 0;
        }).then((ok) => {callback(ok);});});
     }
}

export class Login {
  id: number;
  email: string;
  password: string;
}
