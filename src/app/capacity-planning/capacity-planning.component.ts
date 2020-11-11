import { Component, OnInit } from '@angular/core';
import { XmlReaderService } from '../xml-reader/xml-reader.service';
import { CapacityPlanningService } from './capacity-planning.service';

@Component({
  selector: 'app-capacity-planning',
  templateUrl: './capacity-planning.component.html',
  styleUrls: ['./capacity-planning.component.scss'],
})
export class CapacityPlanningComponent implements OnInit {
  data: any;

  constructor(
    private capacityService: CapacityPlanningService,
    private xmlReaderService: XmlReaderService
  ) {}

  ngOnInit(): void {
    this.xmlReaderService.subscribe((data) => {
      this.data = data;
    });
  }
}
