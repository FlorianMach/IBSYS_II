import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MRP2PSNS } from '../Models';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  MRP2Value: MRP2PSNS
  subject = new Subject<MRP2PSNS[]>();
  constructor() { }
  setDataOfMrp2data(value) {
    // this.MRP2Value = value
    this.subject.next(value)
  }
  gtetDataOfMrp2data() {
    return this.subject
  }
}
