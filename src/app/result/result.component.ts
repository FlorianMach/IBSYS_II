import { Component, OnInit } from '@angular/core';
import { XmlReaderService } from '../xml-reader/xml-reader.service';
import { ResultService } from './result.service';

export interface ProdCapacities {
  workplace: string;
  shifts: number;
  overtime: number;
}

const CAPACITIES: ProdCapacities[] = [
  {workplace: '1', shifts: 1, overtime: 10},
  {workplace: '2', shifts: 1, overtime: 20},
  {workplace: '3', shifts: 1, overtime: 30},
  {workplace: '4', shifts: 1, overtime: 40},
  {workplace: '5', shifts: 0, overtime: 0},
  {workplace: '6', shifts: 1, overtime: 60},
  {workplace: '7', shifts: 2, overtime: 70},
  {workplace: '8', shifts: 2, overtime: 80},
  {workplace: '9', shifts: 2, overtime: 90},
  {workplace: '10', shifts: 1, overtime: 100},
  {workplace: '11', shifts: 1, overtime: 110},
  {workplace: '12', shifts: 1, overtime: 120},
  {workplace: '13', shifts: 1, overtime: 130},
  {workplace: '14', shifts: 1, overtime: 140},
  {workplace: '15', shifts: 1, overtime: 150},
]

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  data: any;
  displayedColumnsCapacities: string[] = [
    'workplace',
    'shifts',
    'overtime'
  ];

  dataSourceCapacities = CAPACITIES;

  constructor(
    private resultService: ResultService,
    private xmlReaderService: XmlReaderService
  ) {}

  ngOnInit(): void {
    this.xmlReaderService.subscribe((data) => {
      this.data = data;
    });
  }
}
