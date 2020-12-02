import { Component, OnInit } from '@angular/core';
import { MRP2PSNS } from '../Models';
import { SharedService } from '../shared/shared.service';
import { XmlReaderService } from '../xml-reader/xml-reader.service';
import { ProcurementService } from './procurement.service';
import * as XLSX from "xlsx"
@Component({
  selector: 'app-procurement',
  templateUrl: './procurement.component.html',
  styleUrls: ['./procurement.component.scss'],
})
export class ProcurementComponent implements OnInit {
  data: any[] = [];
  nValues: MRP2PSNS[] = []
  initialStock: any[] = []
  p1 = 1;
  p2 = 0;
  p3 = 0;

  constructor(
    private procurementService: ProcurementService,
    private xmlReaderService: XmlReaderService,
    private SharedService: SharedService,
  ) {

  }
  ngOnInit(): void {
    console.log('this.data...', this.initialStock)

    this.xmlReaderService.subscribe((data) => {
      this.data = data;
      this.initialStock = this.data && this.data['results'] && this.data['results'].warehousestock && this.data['results'].warehousestock.article[0] && this.data['results'].warehousestock.article[0]._attributes.amount ? this.data['results'].warehousestock.article.map(x => x._attributes.amount) : 0
      console.log('this.data...', this.initialStock)
      console.log('this.data', this.data)
    });
    this.SharedService.gtetDataOfMrp2data().subscribe(x => {
      this.nValues = x
      // this.data ? this.data.forEach(item => {
      //   console.log(item)
      //   item.grossRequirements.n1
      // }) : ''
    })

  }
  calculateGrossValue(value1, value2, value3) {
    return value1 * this.p1 + value2 * this.p2 + value3 * this.p3
  }
  fileName = "result.xlsx"
  downloadData() {
    let element = document.getElementById("excelTable")
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element)
    const wb: XLSX.WorkBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "sheet1")
    XLSX.writeFile(wb, this.fileName)
  }
}