import { Component, Input, OnInit } from '@angular/core';
import { MRP2PSNS } from '../Models';
import { SharedService } from '../shared/shared.service';
import { XmlReaderService } from '../xml-reader/xml-reader.service';
import { ProcurementService } from './procurement.service';

@Component({
  selector: 'app-procurement',
  templateUrl: './procurement.component.html',
  styleUrls: ['./procurement.component.scss'],
})
export class ProcurementComponent implements OnInit {
  data: any[] = [];
  nValues: MRP2PSNS[] = [];
  initialStock: any[] = [];
  modus = 'modus';

  outputData = {
    item21: {
      article: '21',
      quantity: '0',
      modus: false,
      discountQuantity: 300,
      procureLeadTime: 1.8,
      deviation: 0.4,
      p1: 1,
      p2: 0,
      p3: 0,
    },
    item22: {
      article: '22',
      quantity: '0',
      modus: false,
      discountQuantity: 300,
      procureLeadTime: 1.7,
      deviation: 0.4,
      p1: 0,
      p2: 1,
      p3: 0,
    },
    item23: {
      article: '23',
      quantity: '0',
      modus: false,
      discountQuantity: 300,
      procureLeadTime: 1.2,
      deviation: 0.2,
      p1: 0,
      p2: 0,
      p3: 1,
    },
    item24: {
      article: '24',
      quantity: '0',
      modus: false,
      discountQuantity: 6100,
      procureLeadTime: 3.2,
      deviation: 0.3,
      p1: 7,
      p2: 7,
      p3: 7,
    },
    item25: {
      article: '25',
      quantity: '0',
      modus: false,
      discountQuantity: 3600,
      procureLeadTime: 0.9,
      deviation: 0.2,
      p1: 4,
      p2: 4,
      p3: 4,
    },
    item27: {
      article: '27',
      quantity: '0',
      modus: false,
      discountQuantity: 1800,
      procureLeadTime: 0.9,
      deviation: 0.2,
      p1: 2,
      p2: 2,
      p3: 2,
    },
    item28: {
      article: '28',
      quantity: '0',
      modus: false,
      discountQuantity: 4500,
      procureLeadTime: 1.7,
      deviation: 0.4,
      p1: 4,
      p2: 5,
      p3: 6,
    },
    item32: {
      article: '32',
      quantity: '0',
      modus: false,
      discountQuantity: 2700,
      procureLeadTime: 2.1,
      deviation: 0.5,
      p1: 3,
      p2: 3,
      p3: 3,
    },
    item33: {
      article: '33',
      quantity: '0',
      modus: false,
      discountQuantity: 900,
      procureLeadTime: 1.9,
      deviation: 0.5,
      p1: 0,
      p2: 0,
      p3: 2,
    },
    item34: {
      article: '34',
      quantity: '0',
      modus: false,
      discountQuantity: 22000,
      procureLeadTime: 1.6,
      deviation: 0.3,
      p1: 0,
      p2: 0,
      p3: 72,
    },
    item35: {
      article: '35',
      quantity: '0',
      modus: false,
      discountQuantity: 3600,
      procureLeadTime: 2.2,
      deviation: 0.4,
      p1: 4,
      p2: 4,
      p3: 4,
    },
    item36: {
      article: '36',
      quantity: '0',
      modus: false,
      discountQuantity: 900,
      procureLeadTime: 1.2,
      deviation: 0.1,
      p1: 1,
      p2: 1,
      p3: 1,
    },
    item37: {
      article: '37',
      quantity: '0',
      modus: false,
      discountQuantity: 900,
      procureLeadTime: 1.5,
      deviation: 0.3,
      p1: 1,
      p2: 1,
      p3: 1,
    },
    item38: {
      article: '38',
      quantity: '0',
      modus: false,
      discountQuantity: 300,
      procureLeadTime: 1.7,
      deviation: 0.4,
      p1: 1,
      p2: 1,
      p3: 1,
    },
    item39: {
      article: '39',
      quantity: '0',
      modus: false,
      discountQuantity: 1800,
      procureLeadTime: 1.5,
      deviation: 0.3,
      p1: 2,
      p2: 2,
      p3: 2,
    },
    item40: {
      article: '40',
      quantity: '0',
      modus: false,
      discountQuantity: 900,
      procureLeadTime: 1.7,
      deviation: 0.2,
      p1: 1,
      p2: 1,
      p3: 1,
    },
    item41: {
      article: '41',
      quantity: '0',
      modus: false,
      discountQuantity: 900,
      procureLeadTime: 0.9,
      deviation: 0.2,
      p1: 1,
      p2: 1,
      p3: 1,
    },
    item42: {
      article: '42',
      quantity: '0',
      modus: false,
      discountQuantity: 1800,
      procureLeadTime: 1.2,
      deviation: 0.3,
      p1: 2,
      p2: 2,
      p3: 2,
    },
    item43: {
      article: '43',
      quantity: '0',
      modus: false,
      discountQuantity: 2700,
      procureLeadTime: 2.0,
      deviation: 0.5,
      p1: 1,
      p2: 1,
      p3: 1,
    },
    item44: {
      article: '44',
      quantity: '0',
      modus: false,
      discountQuantity: 900,
      procureLeadTime: 1.0,
      deviation: 0.2,
      p1: 3,
      p2: 3,
      p3: 3,
    },
    item45: {
      article: '45',
      quantity: '0',
      modus: false,
      discountQuantity: 900,
      procureLeadTime: 1.7,
      deviation: 0.3,
      p1: 1,
      p2: 1,
      p3: 1,
    },
    item46: {
      article: '46',
      quantity: '0',
      modus: false,
      discountQuantity: 900,
      procureLeadTime: 0.9,
      deviation: 0.3,
      p1: 1,
      p2: 1,
      p3: 1,
    },
    item47: {
      article: '47',
      quantity: '0',
      modus: false,
      discountQuantity: 900,
      procureLeadTime: 1.1,
      deviation: 0.1,
      p1: 1,
      p2: 1,
      p3: 1,
    },
    item48: {
      article: '48',
      quantity: '0',
      modus: false,
      discountQuantity: 1800,
      procureLeadTime: 1.0,
      deviation: 0.2,
      p1: 2,
      p2: 2,
      p3: 2,
    },
    item52: {
      article: '52',
      quantity: '0',
      modus: false,
      discountQuantity: 600,
      procureLeadTime: 1.6,
      deviation: 0.4,
      p1: 2,
      p2: 0,
      p3: 0,
    },
    item53: {
      article: '53',
      quantity: '0',
      modus: false,
      discountQuantity: 22000,
      procureLeadTime: 1.6,
      deviation: 0.2,
      p1: 72,
      p2: 0,
      p3: 0,
    },
    item57: {
      article: '57',
      quantity: '0',
      modus: false,
      discountQuantity: 600,
      procureLeadTime: 1.7,
      deviation: 0.3,
      p1: 0,
      p2: 2,
      p3: 0,
    },
    item58: {
      article: '58',
      quantity: '0',
      modus: false,
      discountQuantity: 22000,
      procureLeadTime: 1.6,
      deviation: 0.5,
      p1: 0,
      p2: 72,
      p3: 0,
    },
    item59: {
      article: '59',
      quantity: '0',
      modus: false,
      discountQuantity: 1800,
      procureLeadTime: 0.7,
      deviation: 0.2,
      p1: 2,
      p2: 2,
      p3: 2,
    },
  };

  constructor(
    private procurementService: ProcurementService,
    private xmlReaderService: XmlReaderService,
    private SharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.xmlReaderService.subscribe((data) => {
      this.data = data;
      this.initialStock =
        this.data &&
        this.data['results'] &&
        this.data['results'].warehousestock &&
        this.data['results'].warehousestock.article[0] &&
        this.data['results'].warehousestock.article[0]._attributes.amount
          ? this.data['results'].warehousestock.article.map((x) => {
              return { amount: x._attributes.amount, id: x._attributes.id };
            })
          : 0;
    });
    this.SharedService.gtetDataOfMrp2data().subscribe((x) => {
      this.nValues = x;
      this.calcRecommendedAmount(this.outputData, this.nValues);
    });
  }
  mapInitialStockValue(id?) {
    if (this.initialStock && this.initialStock.length) {
      return this.initialStock
        .filter((m) => m.id == id)
        .map((x) => x.amount)[0];
    } else {
      return 0;
    }
  }
  calculateGrossValue(value1, value2, value3, p1, p2, p3) {
    return value1 * p1 + value2 * p2 + value3 * p3;
  }

  calcRecommendedAmount(outputData, nValues) {
    console.log('MEGA TEST');
    for (const [key, value] of Object.entries(outputData)) {
      const currentItem: any = value;
      // get brutto demand
      let demandN0 = nValues
        ? this.calculateGrossValue(
            nValues[0]?.n1,
            nValues[1]?.n1,
            nValues[2]?.n1,
            currentItem.p1,
            currentItem.p2,
            currentItem.p3
          )
        : 0;
      let demandN1 = nValues
        ? this.calculateGrossValue(
            nValues[0]?.n2,
            nValues[1]?.n2,
            nValues[2]?.n2,
            currentItem.p1,
            currentItem.p2,
            currentItem.p3
          )
        : 0;
      let demandN2 = 0;
      let demandN3 = 0;
      if (currentItem.deviation + currentItem.procureLeadTime > 2) {
        demandN2 = nValues
          ? this.calculateGrossValue(
              nValues[0]?.n3,
              nValues[1]?.n3,
              nValues[2]?.n3,
              currentItem.p1,
              currentItem.p2,
              currentItem.p3
            )
          : 0;
        console.log('triggered');
      }

      const bruttoDemand = demandN0 + demandN1 + demandN2 + demandN3;
      console.log(`${currentItem.article}: ${bruttoDemand}`);

      const curStock = this.mapInitialStockValue(currentItem.article);
      // check stock
      while (Number(currentItem.quantity) + curStock < bruttoDemand) {
        const newQuantity =
          Number(currentItem.quantity) + currentItem.discountQuantity;
        currentItem.quantity = newQuantity.toString();
      }
    }
  }

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
    this.SharedService.nextProcurementData(this.outputData);
    console.log(this.nValues);
  }

  turnValueE(e) {}
}
