import { Product } from './../product.model';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product = {
    name: '',
    price: null
  }
  
  constructor(private router: Router, private productService: ProductService, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    //PEGANDO O ID PELO PARAMETRO
    const id = this.route.snapshot.paramMap.get('id')
    this.productService.readById(id).subscribe(product => {
      this.product = product
    })
  }
  cancel(): void {
    this.router.navigate(['/products'])
  }
  updateProduct(): void {
      this.productService.update(this.product).subscribe(() => {
      this.productService.showMessage("Produto Atualizado! ")
      this.router.navigate(['/products'])
    })
  }

}
