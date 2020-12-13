import { Component, OnInit, ViewChild } from '@angular/core';
import { XmlReaderService } from '../xml-reader/xml-reader.service';
import { ResultService } from './result.service';
import { saveAs } from 'file-saver';
import * as FileSaver from 'file-saver';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SplitDialogComponent } from '../split-dialog/split-dialog.component';
import { SharedService } from '../shared/shared.service';
import { MaterialRequirementsPlanningService } from '../material-requirements-planning/material-requirements-planning.service';
import { CapacityPlanningService } from '../capacity-planning/capacity-planning.service';
import { ProcurementService } from '../procurement/procurement.service';
import { connect } from 'http2';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  @ViewChild('table') table: MatTable<Production>;
  data: any;

  mrp2Data;
  mrp1Data;
  capacity;
  procurement;

  displayedColumns;
  dataSource;
  displayedColumns2;
  dataSource2;
  displayedColumns3;
  dataSource3;
  dataSource32;
  dataSource3deep;
  displayedColumns4;
  dataSource4;
  xmlData;

  constructor(
    private resultService: ResultService,
    private xmlReaderService: XmlReaderService,

    private mrp2Service: SharedService,
    private mrp1Service: MaterialRequirementsPlanningService,
    private capacityService: CapacityPlanningService,
    private procurementService: ProcurementService,

    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    console.log('its result data');
    this.xmlReaderService.subscribe((data) => {
      this.xmlData = data;
    });
    this.mrp2Service.subscribeDirectSalesData((data) => {
      this.dataSource = data;
    });
    this.mrp1Service.subscribe((data) => {
      this.dataSource3 = this.createMrpData(data);
      this.dataSource32 = new MatTableDataSource(this.dataSource3);
      this.dataSource3deep = createDeepCopyOf(this.dataSource3);
    });
    this.capacityService.subscribeDataOfCapacity((data) => {
      this.dataSource4 = data;
    });
    this.mrp2Service.subscribeProcurementData((data) =>{
      this.dataSource2 = this.transformProcurementData(createDeepCopyOf(data));
    })
    this.displayedColumns = ['article', 'quantity', 'price', 'penalty'];
    //this.dataSource = ELEMENT_DATA;
    this.displayedColumns2 = ['article', 'quantity', 'modus'];
    //this.dataSource2 = ELEMENT_DATA_SECOND;
    this.displayedColumns3 = ['product', 'quantity', 'split'];
    //this.dataSource3 = JSON.parse(JSON.stringify(this.dataSource3deep));
    //this.dataSource32 = new MatTableDataSource(this.dataSource3);
    this.displayedColumns4 = ['station', 'shift', 'overtime'];
    //this.dataSource4 = this.capacity;
  }

  private transformProcurementData(data) {
    const result: Order[] = [];
    for(var k in data) {
      if(data[k].quantity == 0) {}
      else {
        if(isEqual(data[k].modus, true)) {
          data[k].modus = 'E';
          result.push(data[k]); 
        }
        else {
          data[k].modus = 'N';
          result.push(data[k]);
        }
      }
    }
    return result;
  }

  private createMrpData(data) {
    const result = [];
    // data from P1
    data[0].forEach((element) => {
      result.push(element);
    });

    // data from P2
    data[1].forEach((element, index) => {
      if (result.find((x) => x.product === element.product)) {
        result[index].quantity += element.quantity;
      } else {
        result.push(element);
      }
    });

    // data from P3
    data[2].forEach((element, index) => {
      if (result.find((x) => x.product === element.product)) {
        result[index].quantity += element.quantity;
      } else {
        result.push(element);
      }
    });

    return result;
  }

  private getXmlData(data) {

  }

  dropTable(event: CdkDragDrop<Production[]>) {
    const prevIndex = this.dataSource3.findIndex((d) => d === event.item.data);
    moveItemInArray(this.dataSource3, prevIndex, event.currentIndex);
    this.table.renderRows();
  }

  openDialog(index: any, article: string, quantity: string): void {
    const dialogRef = this.dialog.open(SplitDialogComponent, {
      data: {
        article: article,
        quantity: quantity,
        rest1: 0,
        rest2: 0,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addSplittedArticle(index, article, quantity, result);
      }
    });
  }

  addSplittedArticle(
    index: number,
    product: string,
    quantity: string,
    result: number
  ) {
    this.dataSource3[index].quantity = String(Number(quantity) - result);
    this.dataSource3.push({ product: product, quantity: result.toString() });
    this.dataSource32._updateChangeSubscription();
  }

  resetTable() {
    this.dataSource3 = [];
    this.dataSource3 = createDeepCopyOf(this.dataSource3deep);
    this.dataSource32 = new MatTableDataSource(this.dataSource3);
  }

  exportXml() {
    var xmlString =
      '<input>' +
      '<qualitycontrol type="no" losequantity="0" delay="0" />'+
      this.sellWishXml(this.xmlData) +
      this.selldirectXml(this.dataSource) +
      this.orderlistXml(this.dataSource2) +
      this.productionlistXml(this.dataSource3) +
      this.workingtimeXml(this.dataSource4) +
      '</input>';
    let blob = new Blob([xmlString], { type: 'text/xml' });
    /*
    let url = URL.createObjectURL(blob);
    window.open(url);
    URL.revokeObjectURL(url);
    */
    FileSaver.saveAs(blob, 'input_data.xml');
  }

  sellWishXml(data): string {
    if(isEmpty(data)) return '<sellwish></sellwish>';
    else {
      var xmlString = '<sellwish>';
      xmlString += '<item article="1" quantity="' + this.xmlData.results.forecast._attributes.p1 + '" />';
      xmlString += '<item article="2" quantity="' + this.xmlData.results.forecast._attributes.p2 + '" />';
      xmlString += '<item article="3" quantity="' + this.xmlData.results.forecast._attributes.p3 + '" />';
      xmlString += '</sellwish>';
      return xmlString;
    }

  }

  selldirectXml(data: SellDirect[]): string {
    if(isEmpty(data)) {
      return '<selldirect><item article="1" quantity="0" price="0.0" penalty="0.0" /><item article="2" quantity="0" price="0.0" penalty="0.0" /><item article="3" quantity="0" price="0.0" penalty="0.0" /></selldirect>';
    }
  else {
      var xmlString = '<selldirect>';
      for (var i = 0; i < data.length; i++) {
      xmlString =
        xmlString +
        '<item article="' +
        data[i].article +
        '" quantity="' +
        data[i].quantity +
        '" price="' +
        data[i].price +
        '" penalty="' +
        data[i].penalty +
        '" />';
      }
    }
    xmlString = xmlString + '</selldirect>';
    return xmlString;
  }

  orderlistXml(data: Order[]): string {
    if(isEmpty(data)) return '<orderlist></orderlist>';
    else {
      var xmlString = '<orderlist>';
      var modus;
      for (var i = 0; i < data.length; i++) {
        if(data[i].modus == 'Normal') modus = '5';
        else modus = '4'; 
        xmlString =
          xmlString +
          '<order article="' +
          data[i].article +
          '" quantity="' +
          data[i].quantity +
          '" modus="' +
          modus +
          '" />';
      }
      xmlString = xmlString + '</orderlist>';
      return xmlString;
    }  
  }

  productionlistXml(data: Production[]): string {
    if(isEmpty(data)) return '<productionlist></productionlist>';
    else {
    var xmlString = '<productionlist>';
    for (var i = 0; i < data.length; i++) {
      xmlString =
        xmlString +
        '<production article="' +
        data[i].product +
        '" quantity="' +
        data[i].quantity +
        '" />';
    }
    xmlString = xmlString + '</productionlist>';
    return xmlString;
  }
  }

  workingtimeXml(data: WorkingTime[]): string {
    if(isEmpty(data)) return '<workingtimelist></workingtimelist>';
    else {
      var xmlString = '<workingtimelist>';
      for (var i = 0; i < data.length; i++) {
        xmlString =
          xmlString +
          '<workingtime station="' +
          data[i].station +
          '" shift="' +
          data[i].shift +
          '" overtime="' +
          data[i].overtime +
          '" />';
      }
      xmlString = xmlString + '</workingtimelist>';
      return xmlString;
    }
  }
}

function isEqual(obj1, obj2) {
  return obj1 === obj2;
}

function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}

function createDeepCopyOf(obj: any): any {
  return JSON.parse(JSON.stringify(obj));
}

export interface SellDirect {
  article: string;
  quantity: string;
  price: string;
  penalty: string;
}

const ELEMENT_DATA: SellDirect[] = [
  { article: '1', quantity: '1', price: '1.0079', penalty: '1' },
  { article: '2', quantity: '2', price: '4.0026', penalty: '2' },
  { article: '3', quantity: '3', price: '6.941', penalty: '3' },
];

export interface Order {
  article: string;
  quantity: string;
  modus: string;
}

const ELEMENT_DATA_SECOND: Order[] = [
  { article: '1', quantity: 'Hydrogen2', modus: 'Normal' },
  { article: '2', quantity: 'Helium', modus: 'Normal' },
  { article: '3', quantity: 'Lithium', modus: 'Normal' },
  { article: '4', quantity: 'Beryllium', modus: 'Normal' },
  { article: '5', quantity: 'Boron', modus: 'Normal' },
  { article: '6', quantity: 'Carbon', modus: 'Normal' },
  { article: '7', quantity: 'Nitrogen', modus: 'Normal' },
  { article: '8', quantity: 'Oxygen', modus: 'Normal' },
  { article: '9', quantity: 'Fluorine', modus: 'Normal' },
  { article: '10', quantity: 'Neon', modus: 'Normal' },
];

export interface Production {
  product: string;
  quantity: string;
}

const ELEMENT_DATA_THIRD: Production[] = [
  { product: '1', quantity: '100' },
  { product: '2', quantity: '200' },
  { product: '3', quantity: '300' },
  { product: '4', quantity: '400' },
  { product: '5', quantity: '500' },
  { product: '6', quantity: '600' },
  { product: '7', quantity: '700' },
  { product: '8', quantity: '800' },
  { product: '9', quantity: '900' },
];

export interface WorkingTime {
  station: string;
  shift: string;
  overtime: string;
}

const ELEMENT_DATA_FOURTH: WorkingTime[] = [
  { station: '1', shift: 'Hydrogen4', overtime: '1.0079' },
  { station: '2', shift: 'Helium', overtime: '4.0026' },
  { station: '3', shift: 'Lithium', overtime: '6.941' },
  { station: '4', shift: 'Beryllium', overtime: '9.0122' },
  { station: '5', shift: 'Boron', overtime: '10.811' },
  { station: '6', shift: 'Carbon', overtime: '12.0107' },
  { station: '7', shift: 'Nitrogen', overtime: '14.0067' },
  { station: '8', shift: 'Oxygen', overtime: '15.9994' },
  { station: '9', shift: 'Fluorine', overtime: '18.9984' },
];
