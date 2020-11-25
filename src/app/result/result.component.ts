import { Component, OnInit } from '@angular/core';
import { XmlReaderService } from '../xml-reader/xml-reader.service';
import { ResultService } from './result.service';
import { saveAs } from 'file-saver';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  data: any;
  displayedColumns = ['article', 'quantity', 'price', 'penalty'];
  dataSource = ELEMENT_DATA;
  displayedColumns2 = ['article', 'quantity', 'modus'];
  dataSource2 = ELEMENT_DATA_SECOND;
  displayedColumns3 = ['article', 'quantity'];
  dataSource3 = ELEMENT_DATA_THIRD;
  displayedColumns4 = ['station', 'shift', 'overtime'];
  dataSource4 = ELEMENT_DATA_FOURTH;

  constructor(
    private resultService: ResultService,
    private xmlReaderService: XmlReaderService
  ) {}

  ngOnInit(): void {
    this.xmlReaderService.subscribe((data) => {
      this.data = data;
    });
  }

  exportXml() {
    var xmlString = "<input>" + this.selldirectXml(ELEMENT_DATA) + this.orderlistXml(ELEMENT_DATA_SECOND) + this.productionlistXml(ELEMENT_DATA_THIRD) + this.workingtimeXml(ELEMENT_DATA_FOURTH) + "</input>";
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xmlString, "text/xml");
    let blob = new Blob([xmlString], {type: 'text/xml'});
    let url = URL.createObjectURL(blob);
    window.open(url);
    URL.revokeObjectURL(url);
  }

  selldirectXml(data: SellDirect[]): string {
    var xmlString = "<selldirect>";
    for(var i = 0; i < data.length; i++) {
      xmlString = xmlString + "<item article=\"" + data[i].article + "\" quantity=\"" + data[i].quantity + "\" price=\"" + data[i].price + "\" penalty=\"" + data[i].penalty + "\" />"
    }
    xmlString = xmlString + "</selldirect>";
    return xmlString;
  }

  orderlistXml(data: Order[]): string {
    var xmlString = "<orderlist>";
    for(var i = 0; i < data.length; i++) {
      xmlString = xmlString + "<order article=\"" + data[i].article + "\" quantity=\"" + data[i].quantity + "\" modus=\"" + data[i].modus + "\" />";
    }
    xmlString = xmlString + "</orderlist>";
    return xmlString;
  }

  productionlistXml(data: Production[]): string {
    var xmlString = "<productionlist>";
    for(var i = 0; i < data.length; i++) {
      xmlString = xmlString + "<production article=\"" + data[i].article + "\" quantity=\"" + data[i].quantity + "\" />";
    }
    xmlString = xmlString + "</productionlist>";
    return xmlString;
  }

  workingtimeXml(data: WorkingTime[]): string {
    var xmlString = "<workingtimelist>";
    for(var i = 0; i < data.length; i++) {
      xmlString = xmlString + "<workingtime station=\"" + data[i].station + "\" shift=\"" + data[i].shift + "\" overtime=\"" + data[i].overtime + "\" />"
    }
    xmlString = xmlString + "</workingtimelist>";
    return xmlString;
  }
}

export interface SellDirect {
  article: string;
  quantity: string;
  price: string;
  penalty: string;
}

const ELEMENT_DATA: SellDirect[] = [
  {article: '1', quantity: '1', price: '1.0079', penalty: '1'},
  {article: '2', quantity: '2', price: '4.0026', penalty: '2'},
  {article: '3', quantity: '3', price: '6.941', penalty: '3'}
];

export interface Order {
  article: string;
  quantity: string;
  modus: string
}

const ELEMENT_DATA_SECOND: Order[] = [
  {article: '1', quantity: 'Hydrogen2', modus: 'Normal'},
  {article: '2', quantity: 'Helium', modus: 'Normal'},
  {article: '3', quantity: 'Lithium', modus: 'Normal'},
  {article: '4', quantity: 'Beryllium', modus: 'Normal'},
  {article: '5', quantity: 'Boron', modus: 'Normal'},
  {article: '6', quantity: 'Carbon', modus: 'Normal'},
  {article: '7', quantity: 'Nitrogen', modus: 'Normal'},
  {article: '8', quantity: 'Oxygen', modus: 'Normal'},
  {article: '9', quantity: 'Fluorine', modus: 'Normal'},
  {article: '10', quantity: 'Neon', modus: 'Normal'},
];

export interface Production {
  article: string;
  quantity: string;
}

const ELEMENT_DATA_THIRD: Production[] = [
  {article: '1', quantity: 'Hydrogen3'},
  {article: '2', quantity: 'Helium'},
  {article: '3', quantity: 'Lithium'},
  {article: '4', quantity: 'Beryllium'},
  {article: '5', quantity: 'Boron'},
  {article: '6', quantity: 'Carbon'},
  {article: '7', quantity: 'Nitrogen'},
  {article: '8', quantity: 'Oxygen'},
  {article: '9', quantity: 'Fluorine'},
];

export interface WorkingTime {
  station: string;
  shift: string;
  overtime: string;
}

const ELEMENT_DATA_FOURTH: WorkingTime[] = [
  {station: '1', shift: 'Hydrogen4', overtime: '1.0079'},
  {station: '2', shift: 'Helium', overtime: '4.0026'},
  {station: '3', shift: 'Lithium', overtime: '6.941'},
  {station: '4', shift: 'Beryllium', overtime: '9.0122'},
  {station: '5', shift: 'Boron', overtime: '10.811'},
  {station: '6', shift: 'Carbon', overtime: '12.0107'},
  {station: '7', shift: 'Nitrogen', overtime: '14.0067'},
  {station: '8', shift: 'Oxygen', overtime: '15.9994'},
  {station: '9', shift: 'Fluorine', overtime: '18.9984'},
];
