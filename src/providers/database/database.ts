import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite'

@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) { }

  public getDB() {
    //Cria o banco de dados mechanicservice
    return this.sqlite.create({
      name: 'mechanicservice.db',
      location: 'default'
    });
  }
  public createDatabase() {
    return this.getDB()
    .then((db: SQLiteObject) => {

      this.createTables(db);

      this.insertDefaultItens(db);

    })
    .catch(e => console.error(e));
  }

private createTables(db: SQLiteObject) {
  //incluirá tabelas em lote
  db.sqlBatch([

  ['CREATE TABLE IF NOT EXISTS car (id integer primary key AUTOINCREMENT NOT NULL, name TEXT);'],
  ['CREATE TABLE IF NOT EXISTS servicecars (id integer primary key AUTOINCREMENT NOT NULL, nameservice TEXT, duedate DATE, platecar TEXT, problemcar TEXT, ativo INTEGER, car_id INTEGER, FOREIGN KEY(car_id) REFERENCES car(id));'],
  ['CREATE TABLE IF NOT EXISTS login (id integer primary key AUTOINCREMENT NOT NULL, email TEXT not null unique, password TEXT);']


])

.then(() => console.log('tabelas criadas'))
.catch(e => console.error('erro ao criar tabelas', e));
}

private insertDefaultItens(db: SQLiteObject) {
  db.executeSql('select COUNT(id) as qtd from car', {})
  .then((data: any) => {
    if(data.rows.item(0).qtd == 0){
      db.sqlBatch([
        ['insert into car (name) values (?)', ['Pálio Weekend']],
        ['insert into car (name) values (?)', ['Gol']],
        ['insert into car (name) values (?)', ['Honda Civic']],
        ['insert into car (name) values (?)', ['Renault Scenic']],
        ['insert into car (name) values (?)', ['Ford Focus']],
        ['insert into car (name) values (?)', ['Wolkswagem Fox']],
        ['insert into car (name) values (?)', ['Toyota Corolla']],
        ['insert into car (name) values (?)', ['Chevrolet Celta']],
        ['insert into car (name) values (?)', ['Hyundai HB20']],
        ['insert into car (name) values (?)', ['Corsa']],
        ['insert into car (name) values (?)', ['Fusca']],
        ['insert into car (name) values (?)', ['Kombi']]
      ])

      .then(() => console.log('Dados padroes incluidos na lista'))
      .catch(e => console.error('Erro ao inserir dados padroes na lista', e));
    }
  })
  .catch(e => console.error('Erro ao consultar qtd de carros na lista', e));
}
}
