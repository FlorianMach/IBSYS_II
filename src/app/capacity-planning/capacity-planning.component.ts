import { Component, OnInit } from '@angular/core';
import { parse } from 'path';
import { MaterialRequirementsPlanningService } from '../material-requirements-planning/material-requirements-planning.service';
import { XmlReaderService } from '../xml-reader/xml-reader.service';
import { CapacityPlanningService } from './capacity-planning.service';

// Daten der Arbeitsplätze - Wie lange für welches Produkt
const PRODUCTIONPLANNING = [
  {
    product: 1,
    w1: 0,
    w2: 0,
    w3: 0,
    w4: 6,
    w5: 0,
    w6: 0,
    w7: 0,
    w8: 0,
    w9: 0,
    w10: 0,
    w11: 0,
    w12: 0,
    w13: 0,
    w14: 0,
    w15: 0,
  },
  {
    product: 2,
    w1: 0,
    w2: 0,
    w3: 0,
    w4: 7,
    w5: 0,
    w6: 0,
    w7: 0,
    w8: 0,
    w9: 0,
    w10: 0,
    w11: 0,
    w12: 0,
    w13: 0,
    w14: 0,
    w15: 0,
  },
  {
    product: 3,
    w1: 0,
    w2: 0,
    w3: 0,
    w4: 7,
    w5: 0,
    w6: 0,
    w7: 0,
    w8: 0,
    w9: 0,
    w10: 0,
    w11: 0,
    w12: 0,
    w13: 0,
    w14: 0,
    w15: 0,
  },
  {
    product: 4,
    w1: 0,
    w2: 0,
    w3: 0,
    w4: 0,
    w5: 0,
    w6: 0,
    w7: 0,
    w8: 0,
    w9: 0,
    w10: 4,
    w11: 3,
    w12: 0,
    w13: 0,
    w14: 0,
    w15: 0,
  },
  {
    product: 5,
    w1: 0,
    w2: 0,
    w3: 0,
    w4: 0,
    w5: 0,
    w6: 0,
    w7: 0,
    w8: 0,
    w9: 0,
    w10: 4,
    w11: 3,
    w12: 0,
    w13: 0,
    w14: 0,
    w15: 0,
  },
  {
    product: 6,
    w1: 0,
    w2: 0,
    w3: 0,
    w4: 0,
    w5: 0,
    w6: 0,
    w7: 0,
    w8: 0,
    w9: 0,
    w10: 4,
    w11: 3,
    w12: 0,
    w13: 0,
    w14: 0,
    w15: 0,
  },
  {
    product: 7,
    w1: 0,
    w2: 0,
    w3: 0,
    w4: 0,
    w5: 0,
    w6: 0,
    w7: 0,
    w8: 0,
    w9: 0,
    w10: 4,
    w11: 3,
    w12: 0,
    w13: 0,
    w14: 0,
    w15: 0,
  },
  {
    product: 8,
    w1: 0,
    w2: 0,
    w3: 0,
    w4: 0,
    w5: 0,
    w6: 0,
    w7: 0,
    w8: 0,
    w9: 0,
    w10: 4,
    w11: 3,
    w12: 0,
    w13: 0,
    w14: 0,
    w15: 0,
  },
  {
    product: 9,
    w1: 0,
    w2: 0,
    w3: 0,
    w4: 0,
    w5: 0,
    w6: 0,
    w7: 0,
    w8: 0,
    w9: 0,
    w10: 4,
    w11: 3,
    w12: 0,
    w13: 0,
    w14: 0,
    w15: 0,
  },
  {
    product: 10,
    w1: 0,
    w2: 0,
    w3: 0,
    w4: 0,
    w5: 0,
    w6: 0,
    w7: 2,
    w8: 1,
    w9: 3,
    w10: 0,
    w11: 0,
    w12: 3,
    w13: 2,
    w14: 0,
    w15: 0,
  },
  {
    product: 11,
    w1: 0,
    w2: 0,
    w3: 0,
    w4: 0,
    w5: 0,
    w6: 0,
    w7: 2,
    w8: 2,
    w9: 3,
    w10: 0,
    w11: 0,
    w12: 3,
    w13: 2,
    w14: 0,
    w15: 0,
  },
  {
    product: 12,
    w1: 0,
    w2: 0,
    w3: 0,
    w4: 0,
    w5: 0,
    w6: 0,
    w7: 2,
    w8: 2,
    w9: 3,
    w10: 0,
    w11: 0,
    w12: 3,
    w13: 2,
    w14: 0,
    w15: 0,
  },
  {
    product: 13,
    w1: 0,
    w2: 0,
    w3: 0,
    w4: 0,
    w5: 0,
    w6: 0,
    w7: 2,
    w8: 1,
    w9: 3,
    w10: 0,
    w11: 0,
    w12: 3,
    w13: 2,
    w14: 0,
    w15: 0,
  },
  {
    product: 14,
    w1: 0,
    w2: 0,
    w3: 0,
    w4: 0,
    w5: 0,
    w6: 0,
    w7: 2,
    w8: 2,
    w9: 3,
    w10: 0,
    w11: 0,
    w12: 3,
    w13: 2,
    w14: 0,
    w15: 0,
  },
  {
    product: 15,
    w1: 0,
    w2: 0,
    w3: 0,
    w4: 0,
    w5: 0,
    w6: 0,
    w7: 2,
    w8: 2,
    w9: 3,
    w10: 0,
    w11: 0,
    w12: 3,
    w13: 2,
    w14: 0,
    w15: 0,
  },
  {
    product: 16,
    w1: 0,
    w2: 0,
    w3: 0,
    w4: 0,
    w5: 0,
    w6: 2,
    w7: 0,
    w8: 0,
    w9: 0,
    w10: 0,
    w11: 0,
    w12: 0,
    w13: 0,
    w14: 3,
    w15: 0,
  },
  {
    product: 17,
    w1: 0,
    w2: 0,
    w3: 0,
    w4: 0,
    w5: 0,
    w6: 0,
    w7: 0,
    w8: 0,
    w9: 0,
    w10: 0,
    w11: 0,
    w12: 0,
    w13: 0,
    w14: 0,
    w15: 3,
  },
  {
    product: 18,
    w1: 0,
    w2: 0,
    w3: 0,
    w4: 0,
    w5: 0,
    w6: 3,
    w7: 2,
    w8: 3,
    w9: 2,
    w10: 0,
    w11: 0,
    w12: 0,
    w13: 0,
    w14: 0,
    w15: 0,
  },
  {
    product: 19,
    w1: 0,
    w2: 0,
    w3: 0,
    w4: 0,
    w5: 0,
    w6: 3,
    w7: 2,
    w8: 3,
    w9: 2,
    w10: 0,
    w11: 0,
    w12: 0,
    w13: 0,
    w14: 0,
    w15: 0,
  },
  {
    product: 20,
    w1: 0,
    w2: 0,
    w3: 0,
    w4: 0,
    w5: 0,
    w6: 3,
    w7: 2,
    w8: 3,
    w9: 2,
    w10: 0,
    w11: 0,
    w12: 0,
    w13: 0,
    w14: 0,
    w15: 0,
  },
  {
    product: 26,
    w1: 0,
    w2: 0,
    w3: 0,
    w4: 0,
    w5: 0,
    w6: 0,
    w7: 2,
    w8: 0,
    w9: 0,
    w10: 0,
    w11: 0,
    w12: 0,
    w13: 0,
    w14: 0,
    w15: 3,
  },
  {
    product: 29,
    w1: 6,
    w2: 0,
    w3: 0,
    w4: 0,
    w5: 0,
    w6: 0,
    w7: 0,
    w8: 0,
    w9: 0,
    w10: 0,
    w11: 0,
    w12: 0,
    w13: 0,
    w14: 0,
    w15: 0,
  },
  {
    product: 30,
    w1: 0,
    w2: 5,
    w3: 0,
    w4: 0,
    w5: 0,
    w6: 0,
    w7: 0,
    w8: 0,
    w9: 0,
    w10: 0,
    w11: 0,
    w12: 0,
    w13: 0,
    w14: 0,
    w15: 0,
  },
  {
    product: 31,
    w1: 0,
    w2: 0,
    w3: 6,
    w4: 0,
    w5: 0,
    w6: 0,
    w7: 0,
    w8: 0,
    w9: 0,
    w10: 0,
    w11: 0,
    w12: 0,
    w13: 0,
    w14: 0,
    w15: 0,
  },
  {
    product: 49,
    w1: 6,
    w2: 0,
    w3: 0,
    w4: 0,
    w5: 0,
    w6: 0,
    w7: 0,
    w8: 0,
    w9: 0,
    w10: 0,
    w11: 0,
    w12: 0,
    w13: 0,
    w14: 0,
    w15: 0,
  },
  {
    product: 50,
    w1: 0,
    w2: 5,
    w3: 0,
    w4: 0,
    w5: 0,
    w6: 0,
    w7: 0,
    w8: 0,
    w9: 0,
    w10: 0,
    w11: 0,
    w12: 0,
    w13: 0,
    w14: 0,
    w15: 0,
  },
  {
    product: 51,
    w1: 0,
    w2: 0,
    w3: 5,
    w4: 0,
    w5: 0,
    w6: 0,
    w7: 0,
    w8: 0,
    w9: 0,
    w10: 0,
    w11: 0,
    w12: 0,
    w13: 0,
    w14: 0,
    w15: 0,
  },
  {
    product: 54,
    w1: 6,
    w2: 0,
    w3: 0,
    w4: 0,
    w5: 0,
    w6: 0,
    w7: 0,
    w8: 0,
    w9: 0,
    w10: 0,
    w11: 0,
    w12: 0,
    w13: 0,
    w14: 0,
    w15: 0,
  },
  {
    product: 55,
    w1: 0,
    w2: 5,
    w3: 0,
    w4: 0,
    w5: 0,
    w6: 0,
    w7: 0,
    w8: 0,
    w9: 0,
    w10: 0,
    w11: 0,
    w12: 0,
    w13: 0,
    w14: 0,
    w15: 0,
  },
  {
    product: 56,
    w1: 0,
    w2: 0,
    w3: 6,
    w4: 0,
    w5: 0,
    w6: 0,
    w7: 0,
    w8: 0,
    w9: 0,
    w10: 0,
    w11: 0,
    w12: 0,
    w13: 0,
    w14: 0,
    w15: 0,
  },
];

// Durchschnittliche Rüstzeiten je Arbeitsplatz
const SETUPTIME = [
  { w: 1, time: 20 },
  { w: 2, time: 25 },
  { w: 3, time: 20 },
  { w: 4, time: 20 },
  { w: 5, time: 0 },
  { w: 6, time: 15 },
  { w: 7, time: 20 },
  { w: 8, time: 20 },
  { w: 9, time: 15 },
  { w: 10, time: 20 },
  { w: 11, time: 20 },
  { w: 12, time: 0 },
  { w: 13, time: 0 },
  { w: 14, time: 0 },
  { w: 15, time: 15 },
];

@Component({
  selector: 'app-capacity-planning',
  templateUrl: './capacity-planning.component.html',
  styleUrls: ['./capacity-planning.component.scss'],
})
export class CapacityPlanningComponent implements OnInit {
  displayedColumns: string[] = [
    'workplace',
    'capacityRequirements',
    'setupTime',
    'capacityRequirementsLastPeriod',
    'setupTimeLastPeriod',
    'totalRequirement',
    'overtime',
    'secondShift',
  ];

  displayWarning: boolean;
  workplaceCutted: Array<any>;
  viewData: Array<any>;
  oldViewData: Array<any>;
  setupEventLastPeriod: any[] = [];
  toggleButton: boolean = true;
  xmlData;
  mrp2Data: Array<any> = [];

  constructor(
    private CapacityPlanningService: CapacityPlanningService,
    private xmlReaderService: XmlReaderService,
    private materialRequirementsPlanningService: MaterialRequirementsPlanningService,
  ) {}

  ngOnInit(): void {
    this.xmlReaderService.subscribe((data) => {
      this.xmlData = data;
    });

    this.materialRequirementsPlanningService.subscribe((data) => {
      this.mrp2Data = this.createMrpData(data);
      if (data[0].length != 0 && data[1].length != 0 && data[2].length != 0) {
        this.viewData = this.capacityPlaning(
          this.mrp2Data,
          PRODUCTIONPLANNING,
          this.xmlData
        );
        this.oldViewData = this.createDeepCopyOf(this.viewData);
      }
    });
  }

  private createMrpData(data) {
    const result = [];
    // data from P1
    data[0].forEach((element) => {
      result.push(element);
    });
    data[1].forEach((element) => {
      result.push(element);
    });
    data[2].forEach((element) => {
      result.push(element);
    });

    // https://stackoverflow.com/questions/23357933/merge-duplicates-in-javascript-array

    let temp = {};
    const trueResult = [];

    result.map(function (current) {
      temp[current.product] = (temp[current.product] || 0) + current.quantity;
    });
    for (var key in temp) {
      // Form that into the desired output format.
      trueResult.push({ product: parseInt(key, 10), quantity: temp[key] });
    }

    return trueResult;
  }

  capacityPlaning(product, productionplanning, data) {
    var result = new Array();
    var workplaceOvertimeCut: Array<any> = new Array();

    if (product && product.length != 0) {
      var capacity;
      var setuptime;
      var capacityLastPeriod;
      var setUpLastPeriod;
      var overtime;
      var secondShift;
      var setupevents;

      // Berechnung der Kapazität
      capacity = this.capacityRequirements(product, productionplanning);

      // Berechnung Set-Up
      setupevents = this.getSetupEvents(data);
      setuptime = this.calculateSetupTime(setupevents, SETUPTIME);

      // Berechnung Capacity Last Period
      capacityLastPeriod = this.getcapacitylastPeriod(data);

      //Berechnung Set-Up Last Period
      setUpLastPeriod = this.getSetUpTimeLastPeriod(data, SETUPTIME);
      

      // Zusammenbauen des Arrays für die Tabelle
      for (var i = 0; i < capacity.length; ++i) {
        // Zusammenbauen des Arrays für die Tabelle
          if (i === 4) {
            overtime = 0;
            secondShift = 0;
          } else if (
            (capacity[i] +
              setuptime[i] +
              capacityLastPeriod[i] +
              setUpLastPeriod[i] -
              2400) /
              5 <
            0
          ) {
            overtime = 0;
            secondShift = 1;
          } else if (
            capacity[i] +
              setuptime[i] +
              capacityLastPeriod[i] +
              setUpLastPeriod[i] >
            6000  
          ) {
            if (
              capacity[i] +
                setuptime[i] +
                capacityLastPeriod[i] +
                setUpLastPeriod[i] -
                7200 >
              0
            ) {
              overtime = 0;   
              secondShift = 3;
              workplaceOvertimeCut.push(i+1)
            } else {
              overtime = 0;
              secondShift = 3;
            }
          } else if (
            capacity[i] +
              setuptime[i] +
              capacityLastPeriod[i] +
              setUpLastPeriod[i] >
            3600
          ) {
            if (
              capacity[i] +
                setuptime[i] +
                capacityLastPeriod[i] +
                setUpLastPeriod[i] -
                4800 >
              0
            ) {
              overtime =
                (capacity[i] +
                  setuptime[i] +
                  capacityLastPeriod[i] +
                  setUpLastPeriod[i] -
                  4800) /
                5;
              secondShift = 2;
            } else {
              overtime = 0;
              secondShift = 2;
            }
          } else if (
            capacity[i] +
              setuptime[i] +
              capacityLastPeriod[i] +
              setUpLastPeriod[i] >
            1200
          ) {
            if (
              capacity[i] +
                setuptime[i] +
                capacityLastPeriod[i] +
                setUpLastPeriod[i] -
                2400 >
              0
            ) {
              overtime =
                (capacity[i] +
                  setuptime[i] +
                  capacityLastPeriod[i] +
                  setUpLastPeriod[i] -
                  2400) /
                5;
              secondShift = 1;
            }
          }

          result.push({
            workplace: i + 1,
            capareq: capacity[i],
            setup: setuptime[i],
            capalast: capacityLastPeriod[i],
            setuplast: setUpLastPeriod[i],
            totalRequirement:
              capacity[i] +
              setuptime[i] +
              capacityLastPeriod[i] +
              setUpLastPeriod[i],
            overtime: overtime,
            secondShift: secondShift,
          });
      }
    }
    
    if(
      workplaceOvertimeCut.length > 0
    ) {
      this.workplaceCutted = workplaceOvertimeCut;
      this.displayWarning = true;

    } else {
      this.workplaceCutted = workplaceOvertimeCut;
      this.displayWarning = false;
    }
    
    
    this.CapacityPlanningService.nextCapacityData(result);
    return result;
  }

  // Funktion für die Berechnung der benötigten Kapazität pro Arbeitsplatz
  capacityRequirements(product1, productionplanning1) {
    var result = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var product = product1;
    var productionplanning = productionplanning1;

    for (let i = 0; i < productionplanning.length; ++i) {
      if ((product[i].product = productionplanning[i].product)) {
        result[0] += product[i].quantity * productionplanning[i].w1;
        result[1] += product[i].quantity * productionplanning[i].w2;
        result[2] += product[i].quantity * productionplanning[i].w3;
        result[3] += product[i].quantity * productionplanning[i].w4;
        result[4] += product[i].quantity * productionplanning[i].w5;
        result[5] += product[i].quantity * productionplanning[i].w6;
        result[6] += product[i].quantity * productionplanning[i].w7;
        result[7] += product[i].quantity * productionplanning[i].w8;
        result[8] += product[i].quantity * productionplanning[i].w9;
        result[9] += product[i].quantity * productionplanning[i].w10;
        result[10] += product[i].quantity * productionplanning[i].w11;
        result[11] += product[i].quantity * productionplanning[i].w12;
        result[12] += product[i].quantity * productionplanning[i].w13;
        result[13] += product[i].quantity * productionplanning[i].w14;
        result[14] += product[i].quantity * productionplanning[i].w15;
      }
    }
    return result;
  }

  // Funktion, um Rüst-Daten aus der XML-Datei zu lesen
  getSetupEvents(data) {
    var result = new Array();
    for (var i = 0; i < 15; ++i) {
      if (i < 4) {
        result.push({
          w: data.results.idletimecosts.workplace[i]._attributes.id,
          quantity:
            data.results.idletimecosts.workplace[i]._attributes.setupevents,
        });
      } else if (i === 4) {
        result.push({
          w: '5',
          quantity: '0',
        });
      } else if (i < 15 && i > 4) {
        result.push({
          w: data.results.idletimecosts.workplace[i - 1]._attributes.id,
          quantity:
            data.results.idletimecosts.workplace[i - 1]._attributes.setupevents,
        });
      }
    }
    return result;
  }

  // Berechnung der Rüstzeit pro Arbeitsplatz
  calculateSetupTime(lastPeriod, setUpTime) {
    var result = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var lastPeriod = lastPeriod;
    var setUpTime = setUpTime;

    for (var i = 0; i < setUpTime.length; ++i) {
      result[i] = lastPeriod[i].quantity * setUpTime[i].time;
    }
    return result;
  }

  // Berechnung der benötigten Zeit für die letzte Periode
  getcapacitylastPeriod(data) {
    var result = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    if (data.results.waitinglistworkstations.workplace != undefined) {
      for (
        var i = 0;
        i < data.results.waitinglistworkstations.workplace.length;
        ++i
      ) {
        var id = data.results.waitinglistworkstations.workplace[i]._attributes.id;
        result[id -1] += parseInt(data.results.waitinglistworkstations.workplace[i]._attributes.timeneed)
      }
    }

    if(data.results.waitingliststock.missingpart != undefined) {
      for(var i = 0; i < data.results.waitingliststock.missingpart.length; i++) {
        if(data.results.waitingliststock.missingpart[i].workplace != undefined) {
          var id = data.results.waitingliststock.missingpart[i].workplace._attributes.id;
          result[id - 1] += parseInt(
            data.results.waitingliststock.missingpart[i].workplace._attributes.timeneed
          );
        }
      }
    }

    if(data.results.ordersinwork.workplace != undefined && data.results.ordersinwork.workplace.length != undefined) {
      for (var i = 0; i < data.results.ordersinwork.workplace.length; ++i) {
        var id = data.results.ordersinwork.workplace[i]._attributes.id;
        var item = data.results.ordersinwork.workplace[i]._attributes.item;
        result[id - 1] += parseInt(
          data.results.ordersinwork.workplace[i]._attributes.timeneed
        );
        var nextIds = this.lastPeriodNextSteps(id, item);
        for(var j = 0; j < result.length; j++) {
          result[j] += (parseInt(nextIds[j]) * 10);
        }
      }
    }
    console.log(result);
    return result;
  }

  lastPeriodNextSteps(id, item) {
    var items = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var ids = [0, 0, 0, 0, 0, 0, items, items, items, 0, items, 0, items, items, 0, 0];
    ids[6] [16] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0];
    ids[6] [18] = [0, 0, 0, 0, 0, 0, 2, 3, 2, 0, 0, 0, 0, 0, 0];
    ids[6] [19] = [0, 0, 0, 0, 0, 0, 2, 3, 2, 0, 0, 0, 0, 0, 0];
    ids[6] [20] = [0, 0, 0, 0, 0, 0, 2, 3, 2, 0, 0, 0, 0, 0, 0];
    ids[7] [10] = [0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0];
    ids[7] [11] = [0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0];
    ids[7] [12] = [0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0];
    ids[7] [13] = [0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0];
    ids[7] [14] = [0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0];
    ids[7] [15] = [0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0];
    ids[7] [18] = [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0];
    ids[7] [19] = [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0];
    ids[7] [20] = [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0];
    ids[7] [26] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3];
    ids[8] [10] = [0, 0, 0, 0, 0, 0, 2, 0, 3, 0, 0, 0, 0, 0, 0];
    ids[8] [11] = [0, 0, 0, 0, 0, 0, 2, 0, 3, 0, 0, 0, 0, 0, 0];
    ids[8] [12] = [0, 0, 0, 0, 0, 0, 2, 0, 3, 0, 0, 0, 0, 0, 0];
    ids[8] [13] = [0, 0, 0, 0, 0, 0, 2, 0, 3, 0, 0, 0, 0, 0, 0];
    ids[8] [14] = [0, 0, 0, 0, 0, 0, 2, 0, 3, 0, 0, 0, 0, 0, 0];
    ids[8] [15] = [0, 0, 0, 0, 0, 0, 2, 0, 3, 0, 0, 0, 0, 0, 0];
    ids[8] [18] = [0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0];
    ids[8] [19] = [0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0];
    ids[8] [20] = [0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0];
    ids[10] [4] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0];
    ids[10] [5] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0];
    ids[10] [6] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0];
    ids[10] [7] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0];
    ids[10] [8] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0];
    ids[10] [9] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0];
    ids[12] [10] = [0, 0, 0, 0, 0, 0, 2, 1, 3, 0, 0, 0, 0, 0, 0];
    ids[12] [11] = [0, 0, 0, 0, 0, 0, 2, 2, 3, 0, 0, 0, 0, 0, 0];
    ids[12] [12] = [0, 0, 0, 0, 0, 0, 2, 2, 3, 0, 0, 0, 0, 0, 0];
    ids[12] [13] = [0, 0, 0, 0, 0, 0, 2, 1, 3, 0, 0, 0, 0, 0, 0];
    ids[12] [14] = [0, 0, 0, 0, 0, 0, 2, 2, 3, 0, 0, 0, 0, 0, 0];
    ids[12] [15] = [0, 0, 0, 0, 0, 0, 2, 2, 3, 0, 0, 0, 0, 0, 0];
    ids[13] [10] = [0, 0, 0, 0, 0, 0, 2, 1, 3, 0, 0, 3, 0, 0, 0];
    ids[13] [11] = [0, 0, 0, 0, 0, 0, 2, 2, 3, 0, 0, 3, 0, 0, 0];
    ids[13] [12] = [0, 0, 0, 0, 0, 0, 2, 2, 3, 0, 0, 3, 0, 0, 0];
    ids[13] [13] = [0, 0, 0, 0, 0, 0, 2, 1, 3, 0, 0, 3, 0, 0, 0];
    ids[13] [14] = [0, 0, 0, 0, 0, 0, 2, 2, 3, 0, 0, 3, 0, 0, 0];
    ids[13] [15] = [0, 0, 0, 0, 0, 0, 2, 2, 3, 0, 0, 3, 0, 0, 0];

    if(ids[id] [item] == undefined || ids[id] [item] == 0 || ids[id] [item] == null) {
      return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }  
    else {
      return ids[id] [item];
    }

  }

  getSetUpTimeLastPeriod(data, setUpTime) {
    var result = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var setUpTime = setUpTime;
    if (data.results.waitinglistworkstations.workplace != undefined && data.results.waitinglistworkstations.workplace.length != undefined) {
      for (var i = 0; i < data.results.waitinglistworkstations.workplace.length; ++i) {
        var id = data.results.waitinglistworkstations.workplace[i]._attributes.id;
        var items = [];
        if(data.results.waitinglistworkstations.workplace[i].waitinglist != undefined && data.results.waitinglistworkstations.workplace[i].waitinglist.length != undefined) {
          //console.log(id);
          //console.log(data.results.waitinglistworkstations.workplace[i].waitinglist.length);
          if(data.results.ordersinwork.workplace != undefined && data.results.ordersinwork.workplace.length != undefined) {
            for(var j = 0; j < data.results.ordersinwork.workplace.length; j++) {
              if(id == data.results.ordersinwork.workplace[j]._attributes.id) {
                items.push(data.results.ordersinwork.workplace[j]._attributes.item);
              }
            }
          }
          for(var j = 0; j < data.results.waitinglistworkstations.workplace[i].waitinglist.length; j++) {
            items.push(data.results.waitinglistworkstations.workplace[i].waitinglist[j]._attributes.item);
          }
          //console.log(items);
        }
        if(items[0] != undefined && items[0] != null) {
          var count = [...new Set(items)];
          //console.log(count);
          result[id - 1] += (count.length - 1) * setUpTime[id - 1].time;
        }
      }   
    }
    console.log(result);
    return result;
  }

  enable() {
    this.toggleButton = !this.toggleButton;
  }

  // Neue Berechnung der Tabelle, nachdem Änderungen vorgenommen werden
  updateTable() {
    this.toggleButton = !this.toggleButton;
    var workplaceOvertimeCut: Array<any> = new Array();
    var capacity: any[] = [];
    var setuptime: any[] = [];
    var capacityLastPeriod: any[] = [];
    var setUpLastPeriod: any[] = [];
    var overtime;
    var secondShift;

    for (var i = 0; i < this.viewData.length; ++i) {
      capacity[i] = this.viewData[i].capareq;
      setuptime[i] = this.viewData[i].setup;
      capacityLastPeriod[i] = this.viewData[i].capalast;
      setUpLastPeriod[i] = this.viewData[i].setuplast;
    }

    this.viewData = [];

    for (var i = 0; i < capacity.length; ++i) {
      // Zusammenbauen des Arrays für die Tabelle
        if (i === 4) {
          overtime = 0;
          secondShift = 0;
        } else if (
          (capacity[i] +
            setuptime[i] +
            capacityLastPeriod[i] +
            setUpLastPeriod[i] -
            2400) /
            5 <
          0
        ) {
          overtime = 0;
          secondShift = 1;
        } else if (
          capacity[i] +
            setuptime[i] +
            capacityLastPeriod[i] +
            setUpLastPeriod[i] >
          6000  
        ) {
          if (
            capacity[i] +
              setuptime[i] +
              capacityLastPeriod[i] +
              setUpLastPeriod[i] -
              7200 >
            0
          ) {
            overtime = 0;   
            secondShift = 3;
            workplaceOvertimeCut.push(i+1)
          } else {
            overtime = 0;
            secondShift = 3;
          }
        } else if (
          capacity[i] +
            setuptime[i] +
            capacityLastPeriod[i] +
            setUpLastPeriod[i] >
          3600
        ) {
          if (
            capacity[i] +
              setuptime[i] +
              capacityLastPeriod[i] +
              setUpLastPeriod[i] -
              4800 >
            0
          ) {
            overtime =
              (capacity[i] +
                setuptime[i] +
                capacityLastPeriod[i] +
                setUpLastPeriod[i] -
                4800) /
              5;
            secondShift = 2;
          } else {
            overtime = 0;
            secondShift = 2;
          }
        } else if (
          capacity[i] +
            setuptime[i] +
            capacityLastPeriod[i] +
            setUpLastPeriod[i] >
          1200
        ) {
          if (
            capacity[i] +
              setuptime[i] +
              capacityLastPeriod[i] +
              setUpLastPeriod[i] -
              2400 >
            0
          ) {
            overtime =
              (capacity[i] +
                setuptime[i] +
                capacityLastPeriod[i] +
                setUpLastPeriod[i] -
                2400) /
              5;
            secondShift = 1;
          }
        }

      this.viewData.push({
        workplace: i + 1,
        capareq: capacity[i],
        setup: setuptime[i],
        capalast: capacityLastPeriod[i],
        setuplast: setUpLastPeriod[i],
        totalRequirement:
          capacity[i] +
          setuptime[i] +
          capacityLastPeriod[i] +
          setUpLastPeriod[i],
        overtime: overtime,
        secondShift: secondShift,
      });
    }

    if(
      workplaceOvertimeCut.length > 0
    ) {
      this.workplaceCutted = workplaceOvertimeCut;
      this.displayWarning = true;

    } else {
      this.workplaceCutted = workplaceOvertimeCut;
      this.displayWarning = false;
    }

    this.CapacityPlanningService.nextCapacityData(this.viewData);
  }

  discardChanges() {
    this.toggleButton = !this.toggleButton;
    this.viewData = [];
    this.viewData = this.createDeepCopyOf(this.oldViewData);
  }

  private createDeepCopyOf(obj: any): any {
    return JSON.parse(JSON.stringify(obj));
  }

  
}
