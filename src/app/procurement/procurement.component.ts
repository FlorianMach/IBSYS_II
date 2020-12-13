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
  modus = 'modus';

  outputData = {
    item21: {article: '21' ,quantity: '0', modus: false },
    item22: {article: '22' ,quantity: '0', modus: false },
    item23: {article: '23' ,quantity: '0', modus: false },
    item24: {article: '24' ,quantity: '0', modus: false },
    item25: {article: '25' ,quantity: '0', modus: false },
    item27: {article: '27' ,quantity: '0', modus: false },
    item28: {article: '28' ,quantity: '0', modus: false },
    item32: {article: '32' ,quantity: '0', modus: false },
    item33: {article: '33' ,quantity: '0', modus: false },
    item34: {article: '34' ,quantity: '0', modus: false },
    item35: {article: '35' ,quantity: '0', modus: false },
    item36: {article: '36' ,quantity: '0', modus: false },
    item37: {article: '37' ,quantity: '0', modus: false },
    item38: {article: '38' ,quantity: '0', modus: false },
    item39: {article: '39' ,quantity: '0', modus: false },
    item40: {article: '40' ,quantity: '0', modus: false },
    item41: {article: '41' ,quantity: '0', modus: false },
    item42: {article: '41' ,quantity: '0', modus: false },
    item43: {article: '43' ,quantity: '0', modus: false },
    item44: {article: '44' ,quantity: '0', modus: false },
    item45: {article: '45' ,quantity: '0', modus: false },
    item46: {article: '46' ,quantity: '0', modus: false },
    item47: {article: '47' ,quantity: '0', modus: false },
    item48: {article: '48' ,quantity: '0', modus: false },
    item52: {article: '52' ,quantity: '0', modus: false },
    item53: {article: '53' ,quantity: '0', modus: false },
    item57: {article: '57' ,quantity: '0', modus: false },
    item58: {article: '58' ,quantity: '0', modus: false },
    item59: {article: '59' ,quantity: '0', modus: false },
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
