import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { workFlowMap } from '../shared/const/workflow';
import { SharedService } from '../shared/shared.service';
import { WarningDialogComponent } from '../warning-dialog/warning-dialog.component';
import { MaterialRequirementsPlanningService } from './material-requirements-planning.service';
import { ViewData } from './model/view-data';

@Component({
  selector: 'app-material-requirements-planning',
  templateUrl: './material-requirements-planning.component.html',
  styleUrls: ['./material-requirements-planning.component.scss'],
})
export class MaterialRequirementsPlanningComponent implements OnInit {
  @Input() product: any;
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
  primaryProductionOrder = 0;

  constructor(
    public dialog: MatDialog,
    private materialRequirementsPlanningService: MaterialRequirementsPlanningService,
    private mrp2Data: SharedService
  ) {}

  ngOnInit(): void {
    this.createViewData();
    console.log(this.viewData);
    this.mrp2Data.subject.subscribe((data) => {
      if (this.product === 'P1') {
        this.primaryProductionOrder = data[0].n1;
      }
      if (this.product === 'P2') {
        this.primaryProductionOrder = data[1].n1;
      }
      if (this.product === 'P3') {
        this.primaryProductionOrder = data[2].n1;
      }
      console.log('Produktionsplanung');
      console.log(`${this.product}: ${this.primaryProductionOrder}`);
      this.adjustPrimaryOrder(this.primaryProductionOrder.toString());
    });
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
      this.updateViewData();
    }
    this.oldViewData = this.createDeepCopyOf(this.viewData);
    this.toggleChangeMode();
  }

  private adjustPrimaryOrder(primaryOrder: string) {
    this.viewData[0].result = primaryOrder;
    this.viewData[0].safetyStock = (
      Number(this.viewData[0].result) +
      Number(this.viewData[0].workInProgress) +
      Number(this.viewData[0].ordersInWaitingQueue) +
      Number(this.viewData[0].currentStock) -
      Number(this.viewData[0].requiredAmount)
    ).toString();
    this.updateViewData();
    this.oldViewData = this.createDeepCopyOf(this.viewData);
  }

  private onDiscard() {
    this.viewData = this.createDeepCopyOf(this.oldViewData);
    this.toggleChangeMode();
  }

  private createViewData(): void {
    this.viewData = this.materialRequirementsPlanningService.getViewData(
      this.product,
      this.data,
      workFlowMap,
      this.bom,
      this.salesOrderAmount
    );
    this.materialRequirementsPlanningService.next(this.product, this.viewData);
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

  private updateViewData() {
    this.viewData = this.materialRequirementsPlanningService.updateViewData(
      this.product,
      this.viewData,
      this.bom,
      this.salesOrderAmount
    );
    console.log('DEBUG');
    console.log(this.createDeepCopyOf(this.viewData));
    this.materialRequirementsPlanningService.next(this.product, this.viewData);
  }
}
