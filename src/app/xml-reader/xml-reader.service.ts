import * as convert from 'xml-js';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class XmlReaderService {
  private dataSubject = new Subject<any>();

  subscribe(cb: (data: any) => void): void {
    this.dataSubject.subscribe((data: any) => {
      cb(data);
    });
  }

  next(updatedData: any): void {
    this.dataSubject.next(updatedData);
  }

  convertXmlToJs(xmlString: string): any {
    let data = {};
    if (xmlString) {
      data = convert.xml2js(xmlString, { compact: true });
    }
    return data;
  }
}
