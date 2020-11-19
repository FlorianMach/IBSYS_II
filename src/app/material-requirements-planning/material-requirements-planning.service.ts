import { Injectable } from '@angular/core';
import { MatReqItem } from './model/mat-req-item';

@Injectable({
  providedIn: 'root',
})
export class MaterialRequirementsPlanningService {
  constructor() {}

  public getViewData(
    xmlData: string,
    workFlowMap: any,
    bom: any,
    salesOrderAmount: string
  ): Array<any> {
    const viewArray = [];

    const mrpData = this.getTransformedData(xmlData, workFlowMap);
    const resultData = this.calcProductionAmount(
      mrpData,
      bom,
      salesOrderAmount
    );

    console.log(mrpData);
    console.log(resultData);

    for (let i = 0; i < resultData.length; ++i) {
      const curMrpInfo = mrpData.find((element) => {
        return element.item === resultData[i].id.toString();
      });
      if (curMrpInfo) {
        viewArray.push({
          id: resultData[i].id,
          requiredAmount: resultData[i].data.requiredAmount,
          safetyStock: resultData[i].data.safetyStock,
          currentStock: curMrpInfo.currentStock,
          ordersInWaitingQueue: curMrpInfo.ordersInWaitingQueue,
          workInProgress: curMrpInfo.workInProgress,
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
    // console.log(uniqueOrderList);
    return resultArr;
  }

  private calcProductionAmount(
    transformedData: Array<MatReqItem>,
    bom: any,
    salesOrderAmount: string
  ): Array<any> {
    const resultArr = [];

    let requiredAmount = Number(salesOrderAmount);

    // TODO: safetyStock als Eingabe einlesen oder ausrechnen ...
    let safetyStock = 100;
    this.traverseBom(
      bom,
      (node) => {
        const currentItem = transformedData.find(
          (material) => material.item === node.id.toString()
        );

        if (node.parent) {
          requiredAmount = node.parent.result + node.parent.currentItem;
        }

        const result =
          requiredAmount +
          safetyStock -
          currentItem.currentStock -
          currentItem.ordersInWaitingQueue -
          currentItem.workInProgress;

        // console.log(
        //   `${requiredAmount} + ${safetyStock} - ${currentItem.currentStock} - ${currentItem.ordersInWaitingQueue} - ${currentItem.workInProgress} = ${result}`
        // );

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
          (material) => material.item === node.id.toString()
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
