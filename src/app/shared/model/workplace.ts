export class WorkPlace {
  id: number;
  productionTimePerMinute: number;
  setUpTime: number;

  constructor(id: number, productionTimePerMinute: number, setUpTime: number) {
    this.id = id;
    this.productionTimePerMinute = productionTimePerMinute;
    this.setUpTime = setUpTime;
  }
}
