import { Component, OnInit } from '@angular/core';
import { XmlReaderService } from '../xml-reader/xml-reader.service';
import { CapacityPlanningService } from './capacity-planning.service';

export interface Workplace {
  capacityRequirements: number;
  workplace: number;
}

const WORKPLACES: Workplace[] = [
  {workplace: 1, capacityRequirements: 2458},
  {workplace: 2, capacityRequirements: 2444},
  {workplace: 3, capacityRequirements: 2426},
  {workplace: 4, capacityRequirements: 1900},
  {workplace: 5, capacityRequirements: 1400},
  {workplace: 6, capacityRequirements: 3600},
  {workplace: 7, capacityRequirements: 2400},
  {workplace: 8, capacityRequirements: 2300},
  {workplace: 9, capacityRequirements: 1520},
  {workplace: 10, capacityRequirements: 1687},
  {workplace: 11, capacityRequirements: 2654},
  {workplace: 12, capacityRequirements: 1254},
  {workplace: 13, capacityRequirements: 124},
  {workplace: 14, capacityRequirements: 1687},
];

@Component({
  selector: 'app-capacity-planning',
  templateUrl: './capacity-planning.component.html',
  styleUrls: ['./capacity-planning.component.scss'],
})

export class CapacityPlanningComponent implements OnInit {
  data: any;
  displayedColumns: string[] = [
    'workplace', 
    'capacityRequirements', 
    'setupTime', 
    'capacityRequirementsLastPeriod', 
    'setupTimeLastPeriod',
    'totalRequirement',
    'overtime',
    'secondShift'];

  dataSource = WORKPLACES;
  
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
