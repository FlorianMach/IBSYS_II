import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';
import { MRP2PSNS } from '../Models';
import { SharedService } from '../shared/shared.service';
import { XmlReaderService } from '../xml-reader/xml-reader.service';
import { ProductPlanningService } from './product-planning.service';

export interface DirectSales {
  product: string;
  quantity: string;
  price: string;
  penalty: string;
}

const ELEMENT_DATA2: DirectSales[] = [
  { product: 'P1', quantity: '0', price: '0', penalty: '0' },
  { product: 'P2', quantity: '0', price: '0', penalty: '0' },
  { product: 'P3', quantity: '0', price: '0', penalty: '0' },
];

@Component({
  selector: 'app-product-planning',
  templateUrl: './product-planning.component.html',
  styleUrls: ['./product-planning.component.scss'],
})
export class ProductPlanningComponent implements OnInit {
  @Output() dataChanged: EventEmitter<MRP2PSNS[]> = new EventEmitter();
  data: any;
  mrp2data: MRP2PSNS[];
  displayedColumns2 = ['product', 'quantity', 'price', 'penalty'];
  dataSource2 = ELEMENT_DATA2;

  constructor(
    private productPlanningService: ProductPlanningService,
    private xmlReaderService: XmlReaderService,
    private SharedService: SharedService
  ) {
    this.mrp2data = [
      {
        n1: 0,
        n2: 0,
        n3: 0,
        n4: 0,
      },
      {
        n1: 0,
        n2: 0,
        n3: 0,
        n4: 0,
      },
      {
        n1: 0,
        n2: 0,
        n3: 0,
        n4: 0,
      },
      // , {
      //   n1: 0,
      //   n2: 0,
      //   n3: 0,
      //   n4: 0
      // }
    ];
  }

  ngOnInit(): void {
    this.xmlReaderService.subscribe((data) => {
      this.data = data;
      console.log(this.data);
      console.log(this.dataSource2);
    });
  }
  // onValueChanged(event) {
  //   // this.dataChanged.emit(this.mrp2data);
  //   this.SharedService.setDataOfMrp2data(this.mrp2data)
  // }

  @Input() editable: boolean = false;

  change: boolean = true;
  commit: boolean = false;

  edit() {
    this.editable = true;
    this.commit = true;
    this.change = false;
  }

  save() {
    this.editable = false;
    this.commit = false;
    this.change = true;
    this.SharedService.setDataOfMrp2data(this.mrp2data);
    this.SharedService.nextDirectSales(this.dataSource2);
    console.log(this.dataSource2);
  }
}
