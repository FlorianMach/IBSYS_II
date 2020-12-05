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
  changeModeIsOff = true;

  constructor(
    private materialRequirementsPlanningService: MaterialRequirementsPlanningService
  ) {}

  ngOnInit(): void {
    this.createViewData();
    console.log(this.viewData);
  }

  round(input: number): number {
    return Math.round(input);
  }

  discardChanges(): void {
    this.toggleChangeMode();
  }

  commitChanges(): void {
    if (!this.changeModeIsOff) {
      // log the array
      // useful for checking if binding works correctly
      console.log('viewdata updated:');
      this.viewData.forEach((data) => {
        console.log(`${data.id} = ${data.safetyStock}`);
      });
      this.viewData = this.materialRequirementsPlanningService.updateViewData(
        this.viewData,
        this.bom,
        this.salesOrderAmount
      );
    }

    this.toggleChangeMode();
  }

  private createViewData(): void {
    this.viewData = this.materialRequirementsPlanningService.getViewData(
      this.data,
      workFlowMap,
      this.bom,
      this.salesOrderAmount
    );
  }

  private toggleChangeMode(): void {
    this.changeModeIsOff = !this.changeModeIsOff;
  }
}
