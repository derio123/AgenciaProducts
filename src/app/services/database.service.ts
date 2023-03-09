import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Injectable } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private dbInstance!: SQLiteObject;
  readonly db_name: string = "remotestack.db";
  readonly db_table: string = "products";
  readonly db_table2: string = "categories";
  Product: Array<any> = [];

  constructor(
    private sq: SQLite,
    private platform: Platform,
    private toast: ToastController,
  ) {
    this.databaseConn();
  }

  databaseConn() {
    this.platform.ready().then(() => {
      this.sq.create({
        name: this.db_name,
        location: 'default'
      }).then((sqLite: SQLiteObject) => {
        this.dbInstance = sqLite;
        sqLite.executeSql(`
              CREATE TABLE IF NOT EXISTS ${this.db_table} (
                user_id INTEGER PRIMARY KEY, 
                name varchar(255),
                email varchar(255)
              )`, [])
          .then(async (res) => {
            (await this.toast.create({
              message: 'Tabelas criadas.',
              duration: 3000,
              position: 'bottom'
            })).present();
          })
          .catch(async (error) => {
            (await this.toast.create({
              message: 'Erro criar as tabelas.',
              duration: 3000,
              position: 'bottom'
            })).present();
          })
          .catch((error) => alert(JSON.stringify(error)));
      });
    })
  }

  additem(n, e,) {
      if(!n.length || !e.length) {
      alert('Provide both email e name');
      return;
    }
    this.dbInstance.executeSql(`INSERT INTO ${this.db_table} (name, email) VALUES ('${n}', '${e}')`, [])
      .then(() => {
        alert("Success");
        this.getAllUser();
      }, (e) => {
        alert(JSON.stringify(e.err));
      });
  }

  updateUser(id, name, email ) {
    let data = [name, email];
    return this.dbInstance
      .executeSql(`UPDATE ${this.db_table} SET name = ?, email = ? WHERE user_id = ${id}`, data);
  }

  getAllUser() {
    return this.dbInstance
      .executeSql(`SELECT * FROM ${this.db_table}`, []).then((res) => {
        this.Product = [];
        if (res.rows.length > 0) {
          for (let i = 0; i < res.rows.length; i++) {
            this.Product.push(res.rows.item(i));
          }
          return this.Product;
        }
      }, (e) => {
        alert(JSON.stringify(e));
      });
  }

  getUser(id: any): Promise<any> {
    return this.dbInstance
      .executeSql(`SELECT * FROM ${this.db_table} WHERE user_id = ?`, [id])
      .then((res) => {
        return {
          user_id: res.row.item(0).user_id,
          name: res.row.item(0).name,
          email: res.row.item(0).email,
        }
      });
  }

  deleteUser(user: any) {
    this.dbInstance.executeSql(
      `DELETE FROM ${this.db_table} WHERE user_id = ${user}`, [])
      .then(() => {
        alert("User deleted!");
        this.getAllUser();
      })
      .catch(e => {
        alert(JSON.stringify(e))
      });
  }
}

