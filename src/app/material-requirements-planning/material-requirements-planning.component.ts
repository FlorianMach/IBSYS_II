import { Component, Input, OnInit } from '@angular/core';
import { workFlowMap } from '../shared/const/workflow';
import { MaterialRequirementsPlanningService } from './material-requirements-planning.service';

@Component({
  selector: 'app-material-requirements-planning',
  templateUrl: './material-requirements-planning.component.html',
  styleUrls: ['./material-requirements-planning.component.scss'],
})
export class MaterialRequirementsPlanningComponent implements OnInit {
  @Input() data: any;
  @Input() bom: any;
  @Input() salesOrderAmount: string;

  viewData: Array<any>;

  constructor(
    private materialRequirementsPlanningService: MaterialRequirementsPlanningService
  ) {}

  ngOnInit(): void {
    this.viewData = this.materialRequirementsPlanningService.getViewData(
      this.data,
      workFlowMap,
      this.bom,
      this.salesOrderAmount
    );
    console.log(this.viewData);
  }

  round(input: number): number {
    return Math.round(input);
  }
}
