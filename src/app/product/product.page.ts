import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from './../services/database.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  id: any;
  nameVal: string = "";
  emailVal: string = "";
  constructor(
    protected test: DatabaseService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toast: ToastController,
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    test.getUser(this.id)
      .then((result: any) => {
        this.nameVal = result['name'],
          this.emailVal = result['email']
      });
      alert('aqui:'+this.id)
  }

  ngOnInit() { }

  save() {
    if (this.id, this.nameVal, this.emailVal) {
      this.test.updateUser(this.id, this.nameVal, this.emailVal);
      alert('Produto Atualizado.');
      this.router.navigate(['']);
    } else {
      alert('Erro ao atualiza o produto.');
    }
  }
}
