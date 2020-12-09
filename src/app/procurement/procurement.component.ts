import { Component, Input, OnInit } from '@angular/core';
import { MRP2PSNS } from '../Models';
import { SharedService } from '../shared/shared.service';
import { XmlReaderService } from '../xml-reader/xml-reader.service';
import { ProcurementService } from './procurement.service';
import * as XLSX from "xlsx";
import { Button } from 'protractor';
@Component({
  selector: 'app-procurement',
  templateUrl: './procurement.component.html',
  styleUrls: ['./procurement.component.scss'],
})
export class ProcurementComponent implements OnInit {
  data: any[] = [];
  nValues: MRP2PSNS[] = [];
  initialStock: any[] = [];
  orderN = "orderN";
  orderE = "orderE";

  constructor(
    private procurementService: ProcurementService,
    private xmlReaderService: XmlReaderService,
    private SharedService: SharedService,
  ) {

  }
  ngOnInit(): void {
    this.xmlReaderService.subscribe((data) => {
      this.data = data;
      this.initialStock = this.data && this.data['results'] && this.data['results'].warehousestock && this.data['results'].warehousestock.article[0] && this.data['results'].warehousestock.article[0]._attributes.amount ? this.data['results'].warehousestock.article.map(x => { return { amount: x._attributes.amount, id: x._attributes.id } }) : 0
    });
    this.SharedService.gtetDataOfMrp2data().subscribe(x => {
      this.nValues = x
    })

  }
  mapInitialStockValue(id?) {
    if (this.initialStock && this.initialStock.length) {
      return this.initialStock.filter(m => m.id == id).map(x => x.amount)[0]
    }
    else {
      return 0
    }
  }
  calculateGrossValue(value1, value2, value3, p1, p2, p3) {
    return value1 * p1 + value2 * p2 + value3 * p3
  }
  fileName = "result.xlsx"
  downloadData() {
    let element = document.getElementById("excelTable")
    console.log('iii', element)
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element)
    const wb: XLSX.WorkBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "sheet1")
    XLSX.writeFile(wb, this.fileName)
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
  }
  
  radio: boolean = true;

  disable(radio) {
      radio.checked = false;
  }
}