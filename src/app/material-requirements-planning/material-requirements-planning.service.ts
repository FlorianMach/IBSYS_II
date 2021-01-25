import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { MatReqItem } from './model/mat-req-item';
import { ViewData } from './model/view-data';

@Injectable({
  providedIn: 'root',
})
export class MaterialRequirementsPlanningService {
  constructor() {}

  private mrp2SubjectP1 = new BehaviorSubject<any>([]);
  private mrp2SubjectP2 = new BehaviorSubject<any>([]);
  private mrp2SubjectP3 = new BehaviorSubject<any>([]);

  public next(product: string, viewData: Array<ViewData>) {
    if (product === 'P1') {
      this.nextP1(viewData);
    }
    if (product === 'P2') {
      this.nextP2(viewData);
    }
    if (product === 'P3') {
      this.nextP3(viewData);
    }
  }

  private nextP1(viewData: Array<ViewData>): void {
    this.mrp2SubjectP1.next(this.transformOutputData(viewData));
  }
  private nextP2(viewData: Array<ViewData>): void {
    this.mrp2SubjectP2.next(this.transformOutputData(viewData));
  }
  private nextP3(viewData: Array<ViewData>): void {
    this.mrp2SubjectP3.next(this.transformOutputData(viewData));
  }

  public subscribe(cb: (data) => void) {
    combineLatest([
      this.mrp2SubjectP1,
      this.mrp2SubjectP2,
      this.mrp2SubjectP3,
    ]).subscribe((data) => {
      cb(JSON.parse(JSON.stringify(data)));
    });
  }

  public transformOutputData(viewData: Array<ViewData>): Array<any> {
    const result = [];

    viewData.forEach((element) => {
      const newData = {
        product: Number(element.id),
        quantity: Number(element.result),
      };

      result.push(newData);
    });
    return result;
  }

  /**
   *
   * @param oldViewData
   * @param workFlowMap
   * @param bom
   * @param salesOrderAmount
   */
  public updateViewData(
    product: string,
    oldViewData: Array<ViewData>,
    bom: any,
    salesOrderAmount: string
  ) {
    const mrpData: Array<MatReqItem> = [];
    oldViewData.forEach((data) => {
      mrpData.push({
        item: data.id,
        currentStock: Number(data.currentStock),
        ordersInWaitingQueue: Number(data.ordersInWaitingQueue),
        workInProgress: Number(data.workInProgress),
        safetyStock: Number(data.safetyStock),
      });
    });
    const viewData = this.createViewData(mrpData, bom, salesOrderAmount);
    return viewData;
  }

  /**
   *
   * @param xmlData
   * @param workFlowMap
   * @param bom
   * @param salesOrderAmount
   */
  public getViewData(
    product: string,
    xmlData: string,
    workFlowMap: any,
    bom: any,
    salesOrderAmount: string
  ): Array<ViewData> {
    const mrpData = this.getTransformedData(xmlData, workFlowMap);
    const viewData = this.createViewData(mrpData, bom, salesOrderAmount);
    return viewData;
  }

  private createViewData(
    mrpData: Array<MatReqItem>,
    bom: any,
    salesOrderAmount: string
  ): Array<ViewData> {
    const resultData = this.calcProductionAmount(
      mrpData,
      bom,
      salesOrderAmount
    );

    const viewArray: Array<ViewData> = [];

    for (let i = 0; i < resultData.length; ++i) {
      const curMrpInfo = mrpData.find((element) => {
        return Number(element.item) === resultData[i].id;
      });
      if (curMrpInfo) {
        viewArray.push({
          id: resultData[i].id,
          requiredAmount: resultData[i].data.requiredAmount,
          safetyStock: resultData[i].data.safetyStock,
          currentStock: curMrpInfo.currentStock.toString(),
          ordersInWaitingQueue: curMrpInfo.ordersInWaitingQueue.toString(),
          workInProgress: curMrpInfo.workInProgress.toString(),
          result: resultData[i].result,
        });
      }
    }

    return viewArray;
  }

  /**
   * Transformiert eine Kopie der Daten aus der XML, um leichter in MRP Kontext weiterzuarbeiten
   * @param xmlData Die xml-Daten als String
   * @param workFlowMap Das äquivalente zur Abbildung "Production Flow in BasicData.pdf" als json-Objekt
   */
  private getTransformedData(
    xmlData: any,
    workFlowMap: any
  ): Array<MatReqItem> {
    const resultArr = [];
    const uniqueOrderList: any = {};

    for (const [key, _] of Object.entries(workFlowMap)) {
      let adjustedItem: MatReqItem = {
        item: key,
        currentStock: 0,
        ordersInWaitingQueue: 0,
        workInProgress: 0,
      };

      // Aktueller Lagerbestand durchsuchen
      if (xmlData.results.warehousestock.article) {
        xmlData.results.warehousestock.article.forEach((item) => {
          if (item._attributes) {
            if (item._attributes.id === key) {
              adjustedItem.currentStock = this.calcAmount(item._attributes);
            }
          }
        });
      }

      // Warteschlange Arbeitsplatz durchsuchen
      if (xmlData.results.waitinglistworkstations.workplace) {
        xmlData.results.waitinglistworkstations.workplace.forEach(
          (workplaceInQ) => {
            if (workplaceInQ.waitinglist) {
              // Hinweis: Wenn die Warteschlange nur ein Objekt hat, dann ist es kein Array...
              if (workplaceInQ.waitinglist._attributes) {
                const workplace = workplaceInQ.waitinglist;
                const uniqueKey =
                  workplace._attributes.order +
                  '-' +
                  workplace._attributes.item +
                  '-' +
                  workplace._attributes.firstbatch +
                  '-' +
                  workplace._attributes.lastbatch;
                if (
                  uniqueOrderList[uniqueKey] != workplace._attributes.amount &&
                  workplace._attributes.item === key
                ) {
                  uniqueOrderList[uniqueKey] = workplace._attributes.amount;
                  adjustedItem.ordersInWaitingQueue += this.calcAmount(
                    workplace._attributes
                  );
                }
              } else {
                workplaceInQ.waitinglist.forEach((workplace) => {
                  const uniqueKey =
                    workplace._attributes.order +
                    '-' +
                    workplace._attributes.item +
                    '-' +
                    workplace._attributes.firstbatch +
                    '-' +
                    workplace._attributes.lastbatch;
                  if (
                    uniqueOrderList[uniqueKey] !=
                      workplace._attributes.amount &&
                    workplace._attributes.item === key
                  ) {
                    uniqueOrderList[uniqueKey] = workplace._attributes.amount;
                    adjustedItem.ordersInWaitingQueue += this.calcAmount(
                      workplace._attributes
                    );
                  }
                });
              }
            }
          }
        );
      }

      // Warteschlangen Material durchsuchen
      if (xmlData.results.waitingliststock.missingpart) {
        xmlData.results.waitingliststock.missingpart.forEach((workplaceInQ) => {
          if (workplaceInQ.workplace) {
            // Hinweis: Wenn die Warteschlange nur ein Objekt hat, dann ist es kein Array...
            if (workplaceInQ.workplace._attributes) {
              const workplace = workplaceInQ.workplace.waitinglist;
              const uniqueKey =
                workplace._attributes.order +
                '-' +
                workplace._attributes.item +
                '-' +
                workplace._attributes.firstbatch +
                '-' +
                workplace._attributes.lastbatch;
              if (
                uniqueOrderList[uniqueKey] != workplace._attributes.amount &&
                workplace._attributes.item === key
              ) {
                uniqueOrderList[uniqueKey] = workplace._attributes.amount;
                adjustedItem.ordersInWaitingQueue += this.calcAmount(
                  workplace._attributes
                );
              }
            } else {
              workplaceInQ.workplace.waitinglist.forEach((workplace) => {
                const uniqueKey =
                  workplace._attributes.order +
                  '-' +
                  workplace._attributes.item +
                  '-' +
                  workplace._attributes.firstbatch +
                  '-' +
                  workplace._attributes.lastbatch;
                if (
                  uniqueOrderList[uniqueKey] != workplace._attributes.amount &&
                  workplace._attributes.item === key
                ) {
                  uniqueOrderList[uniqueKey] = workplace._attributes.amount;
                  adjustedItem.ordersInWaitingQueue += this.calcAmount(
                    workplace._attributes
                  );
                }
              });
            }
          }
        });
      }

      // Teile in Bearbeitung durchsuchen
      if (xmlData.results.ordersinwork.workplace) {
        xmlData.results.ordersinwork.workplace.forEach((workplace) => {
          if (workplace._attributes.item === key) {
            adjustedItem.workInProgress += this.calcAmount(
              workplace._attributes
            );
          }
        });
      }

      resultArr.push(adjustedItem);
    }
    return resultArr;
  }

  /**
   *
   * @param transformedData
   * @param bom
   * @param salesOrderAmount
   */
  private calcProductionAmount(
    transformedData: Array<MatReqItem>,
    bom: any,
    salesOrderAmount: string
  ): Array<any> {
    const resultArr = [];

    let requiredAmount = Number(salesOrderAmount);
    this.traverseBom(
      bom,
      (node) => {
        const currentItem = transformedData.find((material) => {
          return Number(material.item) === node.id;
        });

        if (node.parent) {
          requiredAmount = node.parent.result + node.parent.currentItem;
        }
        const safetyStock = currentItem.safetyStock
          ? currentItem.safetyStock
          : 100;
        const result =
          requiredAmount +
          safetyStock -
          currentItem.currentStock -
          currentItem.ordersInWaitingQueue -
          currentItem.workInProgress;

        node.result = result;

        resultArr.push({
          id: node.id,
          result: result,
          data: {
            requiredAmount,
            safetyStock,
            currentStock: currentItem.currentStock,
            ordersInWaitingQueue: currentItem.ordersInWaitingQueue,
            workInProgress: currentItem.workInProgress,
          },
        });
      },
      (element, node) => {
        const currentItem = transformedData.find(
          (material) => Number(material.item) === node.id
        );
        element.parent = node;
        element.parent.currentItem = currentItem.ordersInWaitingQueue;
      }
    );

    this.cleanBom(bom);

    return resultArr;
  }

  private calcAmount(item: any): number {
    if (this.isUsedInAllProducts(item)) {
      return Number(item.amount) / 3;
    }

    return Number(item.amount);
  }

  private isUsedInAllProducts(item: any): boolean {
    if (
      item.id === '16' || // Bei Lagerbestand liegt die Information im key id ...
      item.id === '17' ||
      item.id === '26' ||
      item.item === '16' || // Bei Warteschlange unter item ...
      item.item === '17' ||
      item.item === '26'
    ) {
      return true;
    }

    return false;
  }

  private cleanBom(bom: any) {
    this.traverseBom(
      bom,
      (node) => {
        if (node.result) {
          node.result = null;
        }
      },
      () => {}
    );
  }

  private traverseBom(
    node: any,
    cb: (node) => void,
    cb2: (element, node) => void
  ): void {
    cb(node);
    node.requiredEItems.forEach((element) => {
      cb2(element, node);
      // element.parent = node;
      this.traverseBom(element, cb, cb2);
    });
  }
}
