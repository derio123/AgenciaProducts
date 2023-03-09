import { DatabaseService } from './../services/database.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfiniteScrollCustomEvent, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  nameVal: string = "";
  emailVal: string = "";
  items = [];

  products: any[] = [];
  onlyInactives: boolean = false;
  searchText: string = null;

  constructor(
    protected test: DatabaseService,
    private router: Router,
    private toast: ToastController,
  ) {
    this.test.databaseConn();
  }

  ngOnInit(): void {
    this.generateItems();
  }

  ionViewDidEnter() {
    this.test.getAllUser();
  }

  getAllProducts() {
    this.test.getAllUser();
  }

  addProduct() {
    this.router.navigate(['create-product']);
  }

  remove(product) {
    this.test.deleteUser(product)
    this.toast.create(
      {
        message: 'Produto salvo.',
        duration: 3000,
        position: 'bottom'
      });
    alert(`Delete  + ${product}`);
  }

  private generateItems() {
    const count = this.items.length + 1;
    for (let i = 0; i < 10; i++) {
      this.items.push(`Item ${count + i}`);
    }
  }

  onIonInfinite(ev: any) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  filterProducts(_ev: any) {
    this.test.getAllUser();
  }

}
