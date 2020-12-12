import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MRP2PSNS } from '../Models';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  MRP2Value: MRP2PSNS;
  subject = new Subject<MRP2PSNS[]>();
  directSales = new Subject<any>();
  outputData = new Subject<any>();
  
  constructor() {}
  setDataOfMrp2data(value) {
    // this.MRP2Value = value
    this.subject.next(value);
  }
  gtetDataOfMrp2data() {
    return this.subject;
  }

  nextDirectSales(directSales) {
    this.directSales.next(directSales);
  }

  subscribeDirectSalesData(cb: (data) => void) {
    this.directSales.subscribe((data) => {
      cb(data);
    });
  }

  nextProcurementData(outputData){
    this.outputData.next(outputData);
  }

  subscribeProcurementData(cb: (data) => void){
    this.outputData.subscribe((data) =>{
      cb(data);
    });
  }
}
