import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as convert from 'xml-js';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  convertJsToXml(data: any): any {
    var result = convert.js2xml(data);
  }
}
