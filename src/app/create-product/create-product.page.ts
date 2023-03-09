import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DatabaseService } from './../services/database.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.page.html',
  styleUrls: ['./create-product.page.scss'],
})
export class CreateProductPage implements OnInit {

  nameVal: string = "";
  emailVal: string = "";
  constructor(
    protected test: DatabaseService,
    private router: Router,
    private toast: ToastController) {
    this.test.databaseConn();
  }

  ngOnInit() { }

  save() {
    if (this.nameVal || this.emailVal) {
      this.test.additem(this.nameVal, this.emailVal);
      this.toast.create(
        {
          message: 'Produto salvo.',
          duration: 3000,
          position: 'bottom'
        });
      this.router.navigate(['']);
    } else {
      this.toast.create({
        message: 'Erro ao salvar o produto.',
        duration: 3000, position: 'bottom'
      });
    }
  }
}
