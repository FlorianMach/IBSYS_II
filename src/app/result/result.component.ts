import { Component, OnInit, ViewChild } from '@angular/core';
import { XmlReaderService } from '../xml-reader/xml-reader.service';
import { ResultService } from './result.service';
import { saveAs } from 'file-saver';
import * as FileSaver from 'file-saver';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SplitDialogComponent } from '../split-dialog/split-dialog.component';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  @ViewChild('table') table: MatTable<Production>;
  data: any;

  displayedColumns;
  dataSource;
  displayedColumns2;
  dataSource2;
  displayedColumns3;
  dataSource3;
  dataSource32;
  displayedColumns4;
  dataSource4;

  constructor(
    private resultService: ResultService,
    private xmlReaderService: XmlReaderService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.xmlReaderService.subscribe((data) => {
      this.data = data;
    });
    this.displayedColumns = ['article', 'quantity', 'price', 'penalty'];
    this.dataSource = ELEMENT_DATA;
    this.displayedColumns2 = ['article', 'quantity', 'modus'];
    this.dataSource2 = ELEMENT_DATA_SECOND;
    this.displayedColumns3 = ['article', 'quantity', 'split'];
    this.dataSource3 = JSON.parse(JSON.stringify(ELEMENT_DATA_THIRD));
    this.dataSource32 = new MatTableDataSource(this.dataSource3);
    this.displayedColumns4 = ['station', 'shift', 'overtime'];
    this.dataSource4 = ELEMENT_DATA_FOURTH;
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
        rest2: 0
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addSplittedArticle(index, article, quantity, result);
      }
    });
  }

  addSplittedArticle(index: number, article: string, quantity: string, result: number) {
    this.dataSource3[index].quantity = String((Number(quantity) - result));
    this.dataSource3.push({article: article, quantity: result.toString()});
    this.dataSource32._updateChangeSubscription();
  }

  resetTable() {
    this.dataSource3 = [];
    this.dataSource3 = JSON.parse(JSON.stringify(ELEMENT_DATA_THIRD));
    this.dataSource32 = new MatTableDataSource(this.dataSource3);
  }
  
  exportXml() {
    var xmlString = "<input>" + this.selldirectXml(ELEMENT_DATA) + this.orderlistXml(ELEMENT_DATA_SECOND) + this.productionlistXml(this.dataSource3) + this.workingtimeXml(ELEMENT_DATA_FOURTH) + "</input>";
    let blob = new Blob([xmlString], {type: 'text/xml'});
    /*
    let url = URL.createObjectURL(blob);
    window.open(url);
    URL.revokeObjectURL(url);
    */
   FileSaver.saveAs(blob, "input_data.xml");
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
  {article: '1', quantity: '100'},
  {article: '2', quantity: '200'},
  {article: '3', quantity: '300'},
  {article: '4', quantity: '400'},
  {article: '5', quantity: '500'},
  {article: '6', quantity: '600'},
  {article: '7', quantity: '700'},
  {article: '8', quantity: '800'},
  {article: '9', quantity: '900'},
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
