import { Component, OnInit } from '@angular/core';
import { XmlReaderService } from '../xml-reader/xml-reader.service';
import { ProcurementService } from './procurement.service';

@Component({
  selector: 'app-procurement',
  templateUrl: './procurement.component.html',
  styleUrls: ['./procurement.component.scss'],
})
export class ProcurementComponent implements OnInit {
  data: any;

  constructor(
    private procurementService: ProcurementService,
    private xmlReaderService: XmlReaderService
  ) {}

  ngOnInit(): void {
    this.xmlReaderService.subscribe((data) => {
      this.data = data;
    });
  }
}
