import { Component, Input, OnInit } from '@angular/core';
import { MRP2PSNS } from '../Models';
import { SharedService } from '../shared/shared.service';
import { XmlReaderService } from '../xml-reader/xml-reader.service';
import { ProcurementService } from './procurement.service';
import * as XLSX from 'xlsx';
import { Button } from 'protractor';
import { checkServerIdentity } from 'tls';
import { isNgTemplate } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-procurement',
  templateUrl: './procurement.component.html',
  styleUrls: ['./procurement.component.scss'],
})
export class ProcurementComponent implements OnInit {
  data: any[] = [];
  nValues: MRP2PSNS[] = [];
  initialStock: any[] = [];
  orderN = 'orderN';
  orderE = 'orderE';

  outputData = {
    item21: { amount: '0', orderE: false, orderN: false },
    item22: { amount: '0', orderE: false, orderN: false },
    item23: { amount: '0', orderE: false, orderN: false },
    item24: { amount: '0', orderE: false, orderN: false },
    item25: { amount: '0', orderE: false, orderN: false },
    item27: { amount: '0', orderE: false, orderN: false },
    item28: { amount: '0', orderE: false, orderN: false },
    item32: { amount: '0', orderE: false, orderN: false },
    item33: { amount: '0', orderE: false, orderN: false },
    item34: { amount: '0', orderE: false, orderN: false },
    item35: { amount: '0', orderE: false, orderN: false },
    item36: { amount: '0', orderE: false, orderN: false },
    item37: { amount: '0', orderE: false, orderN: false },
    item38: { amount: '0', orderE: false, orderN: false },
    item39: { amount: '0', orderE: false, orderN: false },
    item40: { amount: '0', orderE: false, orderN: false },
    item41: { amount: '0', orderE: false, orderN: false },
    item42: { amount: '0', orderE: false, orderN: false },
    item43: { amount: '0', orderE: false, orderN: false },
    item44: { amount: '0', orderE: false, orderN: false },
    item45: { amount: '0', orderE: false, orderN: false },
    item46: { amount: '0', orderE: false, orderN: false },
    item47: { amount: '0', orderE: false, orderN: false },
    item48: { amount: '0', orderE: false, orderN: false },
    item52: { amount: '0', orderE: false, orderN: false },
    item53: { amount: '0', orderE: false, orderN: false },
    item57: { amount: '0', orderE: false, orderN: false },
    item58: { amount: '0', orderE: false, orderN: false },
    item59: { amount: '0', orderE: false, orderN: false },
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

  onlyOneValue(e) {
    if(e.target.id == "orderN" && e.target.name == "order1"){this.outputData.item21.orderN = true;this.outputData.item21.orderE = false;}
    else if(e.target.id == "orderN" && e.target.name == "order2"){this.outputData.item22.orderN = true;this.outputData.item22.orderE = false;}
    else if(e.target.id == "orderN" && e.target.name == "order3"){this.outputData.item23.orderN = true;this.outputData.item23.orderE = false;}
    else if(e.target.id == "orderN" && e.target.name == "order4"){this.outputData.item24.orderN = true;this.outputData.item24.orderE = false;}
    else if(e.target.id == "orderN" && e.target.name == "order5"){this.outputData.item25.orderN = true;this.outputData.item25.orderE = false;}
    else if(e.target.id == "orderN" && e.target.name == "order6"){this.outputData.item27.orderN = true;this.outputData.item27.orderE = false;}
    else if(e.target.id == "orderN" && e.target.name == "order7"){this.outputData.item28.orderN = true;this.outputData.item28.orderE = false;}
    else if(e.target.id == "orderN" && e.target.name == "order8"){this.outputData.item32.orderN = true;this.outputData.item32.orderE = false;}
    else if(e.target.id == "orderN" && e.target.name == "order9"){this.outputData.item33.orderN = true;this.outputData.item33.orderE = false;}
    else if(e.target.id == "orderN" && e.target.name == "order10"){this.outputData.item34.orderN = true;this.outputData.item34.orderE = false;}
    else if(e.target.id == "orderN" && e.target.name == "order11"){this.outputData.item35.orderN = true;this.outputData.item35.orderE = false;}
    else if(e.target.id == "orderN" && e.target.name == "order12"){this.outputData.item36.orderN = true;this.outputData.item36.orderE = false;}
    else if(e.target.id == "orderN" && e.target.name == "order13"){this.outputData.item37.orderN = true;this.outputData.item37.orderE = false;}
    else if(e.target.id == "orderN" && e.target.name == "order14"){this.outputData.item38.orderN = true;this.outputData.item38.orderE = false;}
    else if(e.target.id == "orderN" && e.target.name == "order15"){this.outputData.item39.orderN = true;this.outputData.item39.orderE = false;}
    else if(e.target.id == "orderN" && e.target.name == "order16"){this.outputData.item40.orderN = true;this.outputData.item40.orderE = false;}
    else if(e.target.id == "orderN" && e.target.name == "order17"){this.outputData.item41.orderN = true;this.outputData.item41.orderE = false;}
    else if(e.target.id == "orderN" && e.target.name == "order18"){this.outputData.item42.orderN = true;this.outputData.item42.orderE = false;}
    else if(e.target.id == "orderN" && e.target.name == "order19"){this.outputData.item43.orderN = true;this.outputData.item43.orderE = false;}
    else if(e.target.id == "orderN" && e.target.name == "order20"){this.outputData.item44.orderN = true;this.outputData.item44.orderE = false;}
    else if(e.target.id == "orderN" && e.target.name == "order21"){this.outputData.item45.orderN = true;this.outputData.item45.orderE = false;}
    else if(e.target.id == "orderN" && e.target.name == "order23"){this.outputData.item46.orderN = true;this.outputData.item46.orderE = false;}
    else if(e.target.id == "orderN" && e.target.name == "order24"){this.outputData.item47.orderN = true;this.outputData.item47.orderE = false;}
    else if(e.target.id == "orderN" && e.target.name == "order25"){this.outputData.item48.orderN = true;this.outputData.item48.orderE = false;}
    else if(e.target.id == "orderN" && e.target.name == "order26"){this.outputData.item52.orderN = true;this.outputData.item52.orderE = false;}
    else if(e.target.id == "orderN" && e.target.name == "order27"){this.outputData.item53.orderN = true;this.outputData.item53.orderE = false;}
    else if(e.target.id == "orderN" && e.target.name == "order28"){this.outputData.item57.orderN = true;this.outputData.item57.orderE = false;}
    else if(e.target.id == "orderN" && e.target.name == "order29"){this.outputData.item58.orderN = true;this.outputData.item58.orderE = false;}
    else if(e.target.id == "orderN" && e.target.name == "order30"){this.outputData.item59.orderN = true;this.outputData.item59.orderE = false;}

    if(e.target.id == "orderE" && e.target.name == "order1"){this.outputData.item21.orderN = false;this.outputData.item21.orderE = true;}
    else if(e.target.id == "orderE" && e.target.name == "order2"){this.outputData.item22.orderN = false;this.outputData.item22.orderE = true;}
    else if(e.target.id == "orderE" && e.target.name == "order3"){this.outputData.item23.orderN = false;this.outputData.item23.orderE = true;}
    else if(e.target.id == "orderE" && e.target.name == "order4"){this.outputData.item24.orderN = false;this.outputData.item24.orderE = true;}
    else if(e.target.id == "orderE" && e.target.name == "order5"){this.outputData.item25.orderN = false;this.outputData.item25.orderE = true;}
    else if(e.target.id == "orderE" && e.target.name == "order6"){this.outputData.item27.orderN = false;this.outputData.item27.orderE = true;}
    else if(e.target.id == "orderE" && e.target.name == "order7"){this.outputData.item28.orderN = false;this.outputData.item28.orderE = true;}
    else if(e.target.id == "orderE" && e.target.name == "order8"){this.outputData.item32.orderN = false;this.outputData.item32.orderE = true;}
    else if(e.target.id == "orderE" && e.target.name == "order9"){this.outputData.item33.orderN = false;this.outputData.item33.orderE = true;}
    else if(e.target.id == "orderE" && e.target.name == "order10"){this.outputData.item34.orderN = false;this.outputData.item34.orderE = true;}
    else if(e.target.id == "orderE" && e.target.name == "order11"){this.outputData.item35.orderN = false;this.outputData.item35.orderE = true;}
    else if(e.target.id == "orderE" && e.target.name == "order12"){this.outputData.item36.orderN = false;this.outputData.item36.orderE = true;}
    else if(e.target.id == "orderE" && e.target.name == "order13"){this.outputData.item37.orderN = false;this.outputData.item37.orderE = true;}
    else if(e.target.id == "orderE" && e.target.name == "order14"){this.outputData.item38.orderN = false;this.outputData.item38.orderE = true;}
    else if(e.target.id == "orderE" && e.target.name == "order15"){this.outputData.item39.orderN = false;this.outputData.item39.orderE = true;}
    else if(e.target.id == "orderE" && e.target.name == "order16"){this.outputData.item40.orderN = false; this.outputData.item40.orderE = true;}
    else if(e.target.id == "orderE" && e.target.name == "order17"){this.outputData.item41.orderN = false;this.outputData.item41.orderE = true;}
    else if(e.target.id == "orderE" && e.target.name == "order18"){this.outputData.item42.orderN = false;this.outputData.item42.orderE = true;}
    else if(e.target.id == "orderE" && e.target.name == "order19"){this.outputData.item43.orderN = false;this.outputData.item43.orderE = true;}
    else if(e.target.id == "orderE" && e.target.name == "order20"){this.outputData.item44.orderN = false;this.outputData.item44.orderE = true;}
    else if(e.target.id == "orderE" && e.target.name == "order21"){this.outputData.item45.orderN = false;this.outputData.item45.orderE = true;}
    else if(e.target.id == "orderE" && e.target.name == "order23"){this.outputData.item46.orderN = false;this.outputData.item46.orderE = true;}
    else if(e.target.id == "orderE" && e.target.name == "order24"){this.outputData.item47.orderN = false;this.outputData.item47.orderE = true;}
    else if(e.target.id == "orderE" && e.target.name == "order25"){this.outputData.item48.orderN = false;this.outputData.item48.orderE = true;}
    else if(e.target.id == "orderE" && e.target.name == "order26"){this.outputData.item52.orderN = false;this.outputData.item52.orderE = true;}
    else if(e.target.id == "orderE" && e.target.name == "order27"){this.outputData.item53.orderN = false;this.outputData.item53.orderE = true;}
    else if(e.target.id == "orderE" && e.target.name == "order28"){this.outputData.item57.orderN = false;this.outputData.item57.orderE = true;}
    else if(e.target.id == "orderE" && e.target.name == "order29"){this.outputData.item58.orderN = false;this.outputData.item58.orderE = true;}
    else if(e.target.id == "orderE" && e.target.name == "order30"){this.outputData.item59.orderN = false;this.outputData.item59.orderE = true;}
  
  }
}
