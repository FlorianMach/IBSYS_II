import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { workFlowMap } from '../shared/const/workflow';
import { WarningDialogComponent } from '../warning-dialog/warning-dialog.component';
import { MaterialRequirementsPlanningService } from './material-requirements-planning.service';
import { ViewData } from './model/view-data';

@Component({
  selector: 'app-material-requirements-planning',
  templateUrl: './material-requirements-planning.component.html',
  styleUrls: ['./material-requirements-planning.component.scss'],
})
export class MaterialRequirementsPlanningComponent implements OnInit {
  @Input() data: any;
  @Input() bom: any;
  @Input() salesOrderAmount: string;

  displayedColumns = [
    'id',
    'requiredAmount',
    'safetyStock',
    'currentStock',
    'ordersInWaitingQueue',
    'workInProgress',
    'result',
  ];
  oldViewData: Array<ViewData>;
  viewData: Array<ViewData>;
  changeModeIsOff = true;

  constructor(
    public dialog: MatDialog,
    private materialRequirementsPlanningService: MaterialRequirementsPlanningService
  ) {}

  ngOnInit(): void {
    this.createViewData();
    console.log(this.viewData);
  }

  round(input: number): number {
    return Math.round(input);
  }

  convertToNumber(str: string): number {
    return Number(str);
  }

  discardChanges(): void {
    const dialogRef = this.dialog.open(WarningDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onDiscard();
      }
    });
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
    this.oldViewData = this.createDeepCopyOf(this.viewData);
    this.toggleChangeMode();
  }

  private onDiscard() {
    this.viewData = this.createDeepCopyOf(this.oldViewData);
    this.toggleChangeMode();
  }

  private createViewData(): void {
    this.viewData = this.materialRequirementsPlanningService.getViewData(
      this.data,
      workFlowMap,
      this.bom,
      this.salesOrderAmount
    );

    this.oldViewData = this.createDeepCopyOf(this.viewData);
    console.log('TEST');
    console.log(this.viewData);
  }

  private toggleChangeMode(): void {
    this.changeModeIsOff = !this.changeModeIsOff;
  }

  private createDeepCopyOf(obj: any): any {
    return JSON.parse(JSON.stringify(obj));
  }
}
