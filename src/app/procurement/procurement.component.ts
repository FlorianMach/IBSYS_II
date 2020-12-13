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
  orderE = 'orderE';

  outputData = {
    item21: { amount: '0', orderE: false },
    item22: { amount: '0', orderE: false },
    item23: { amount: '0', orderE: false },
    item24: { amount: '0', orderE: false },
    item25: { amount: '0', orderE: false },
    item27: { amount: '0', orderE: false },
    item28: { amount: '0', orderE: false },
    item32: { amount: '0', orderE: false },
    item33: { amount: '0', orderE: false },
    item34: { amount: '0', orderE: false },
    item35: { amount: '0', orderE: false },
    item36: { amount: '0', orderE: false },
    item37: { amount: '0', orderE: false },
    item38: { amount: '0', orderE: false },
    item39: { amount: '0', orderE: false },
    item40: { amount: '0', orderE: false },
    item41: { amount: '0', orderE: false },
    item42: { amount: '0', orderE: false },
    item43: { amount: '0', orderE: false },
    item44: { amount: '0', orderE: false },
    item45: { amount: '0', orderE: false },
    item46: { amount: '0', orderE: false },
    item47: { amount: '0', orderE: false },
    item48: { amount: '0', orderE: false },
    item52: { amount: '0', orderE: false },
    item53: { amount: '0', orderE: false },
    item57: { amount: '0', orderE: false },
    item58: { amount: '0', orderE: false },
    item59: { amount: '0', orderE: false },
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

  turnValueE(e){

  }
}
