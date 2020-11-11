import { Component, OnInit } from '@angular/core';
import { XmlReaderService } from '../xml-reader/xml-reader.service';
import { ProductPlanningService } from './product-planning.service';

@Component({
  selector: 'app-product-planning',
  templateUrl: './product-planning.component.html',
  styleUrls: ['./product-planning.component.scss'],
})
export class ProductPlanningComponent implements OnInit {
  data: any;

  constructor(
    private productPlanningService: ProductPlanningService,
    private xmlReaderService: XmlReaderService
  ) {}

  ngOnInit(): void {
    this.xmlReaderService.subscribe((data) => {
      this.data = data;
      console.log(this.data);
    });
  }
}
