import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';
import { MRP2PSNS } from '../Models';
import { SharedService } from '../shared/shared.service';
import { XmlReaderService } from '../xml-reader/xml-reader.service';

export interface DirectSales {
  article: string;
  quantity: string;
  price: string;
  penalty: string;
}

const ELEMENT_DATA2: DirectSales[] = [
  { article: '1', quantity: '0', price: '0', penalty: '0' },
  { article: '2', quantity: '0', price: '0', penalty: '0' },
  { article: '3', quantity: '0', price: '0', penalty: '0' },
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
  displayedColumns2 = ['article', 'quantity', 'price', 'penalty'];
  dataSource2 = ELEMENT_DATA2;
  displayWarning: boolean = false;
  toLessProduction: any[];

  constructor(
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
    this.displaywarning ()
  }

  displaywarning () {

    var toLessProduction: Array<any> = new Array();

    const p1 = Number(this.data.results.warehousestock.article[0]._attributes.amount) + Number(this.mrp2data[0].n1) - Number(this.data.results.forecast._attributes.p1)
    const p2 = Number(this.data.results.warehousestock.article[1]._attributes.amount) + Number(this.mrp2data[1].n1) - Number(this.data.results.forecast._attributes.p2)
    const p3 = Number(this.data.results.warehousestock.article[2]._attributes.amount) + Number(this.mrp2data[2].n1) - Number(this.data.results.forecast._attributes.p3)

    if(p1 < 0){
      toLessProduction.push("P1");
    }
    if(p2 < 0){
      toLessProduction.push("P2");
    }
    if(p3 < 0){
      toLessProduction.push("P3");
    }

    this.toLessProduction = toLessProduction;

    if(toLessProduction.length != 0){
      this.displayWarning = true; 
    } else {
      this.displayWarning = false;
    }
  }

}
