import { Component, OnInit } from '@angular/core';
import { XmlReaderService } from '../xml-reader/xml-reader.service';
import { ProductPlanningService } from './product-planning.service';

@Component({
  selector: 'app-product-planning',
  templateUrl: './product-planning.component.html',
  styleUrls: ['./product-planning.component.scss'],
})
export class ProductPlanningComponent implements OnInit {
  data: any;
  displayedColumns = ['product', 'quantity'];
  dataSource = ELEMENT_DATA;
  displayedColumns2 = ['product', 'quantity', 'price', 'penalty'];
  dataSource2 = ELEMENT_DATA2;

  constructor(
    private productPlanningService: ProductPlanningService,
    private xmlReaderService: XmlReaderService
  ) {}

  ngOnInit(): void {
    this.xmlReaderService.subscribe((data) => {
      this.data = data;
      console.log(this.data);
    });
  }
}

export interface SalesWish {
  quantity: string;
  product: string;
}

const ELEMENT_DATA: SalesWish[] = [
  {product: 'P1', quantity: 'Hydrogen'},
  {product: 'P2', quantity: 'Helium'},
  {product: 'P3', quantity: 'Lithium'},
];

export interface DirectSales {
  product: string;
  quantity: string;
  price: string;
  penalty: string;
}

const ELEMENT_DATA2: DirectSales[] = [
  {product: 'P1', quantity: 'Hydrogen2', price: '0.0', penalty: '100.10'},
  {product: 'P2', quantity: 'Helium2', price: '0.0', penalty: '100.10'},
  {product: 'P3', quantity: 'Lithium2', price: '0.0', penalty: '100.10'}
]
