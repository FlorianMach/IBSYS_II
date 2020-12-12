import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CapacityPlanningService {

  constructor() { }

  public capacityPlanningSubject = new Subject<any>();

  nextCapacityData(value) {
    this.capacityPlanningSubject.next(value);
  }

  subscribeDataOfCapacity(cb: (data) => void) {
    
    this.capacityPlanningSubject.subscribe((data) => {
      cb(this.transformOutputData(data));
    });
  }

  public transformOutputData(viewData): Array<any> {
    let result = new Array<any>();

    // Daten in die Struktur bringen, wie Simon die will 
    for(var i = 0; i < viewData.length; ++i){
      result.push({
        station: String(viewData[i].workplace),
        shift: String(viewData[i].secondShift),
        overtime: String(viewData[i].overtime)
      })
    }
    return result
  }
}
