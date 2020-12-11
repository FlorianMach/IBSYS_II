import { Component, OnInit } from '@angular/core';
import { XmlReaderService } from '../xml-reader/xml-reader.service';
import { CapacityPlanningService } from './capacity-planning.service';

export interface Products {
  product: number;
  quantity: number;
}

// Diese Daten müssen aus der Stücklistenauflösung resultieren
const PRODUCTS = [
  {product: 1, quantity: 80},
  {product: 2, quantity: 200},
  {product: 3, quantity: 100},
  {product: 4, quantity: 80},
  {product: 5, quantity: 200},
  {product: 6, quantity: 110},
  {product: 7, quantity: 80},
  {product: 8, quantity: 200},
  {product: 9, quantity: 110},
  {product: 10, quantity: 80},
  {product: 11, quantity: 200},
  {product: 12, quantity: 110},
  {product: 13, quantity: 80},
  {product: 14, quantity: 200},
  {product: 15, quantity: 110},
  {product: 16, quantity: 380},
  {product: 17, quantity: 380},
  {product: 18, quantity: 80},
  {product: 19, quantity: 200},
  {product: 20, quantity: 110},
  {product: 26, quantity: 380},
  {product: 29, quantity: 110},
  {product: 30, quantity: 80},
  {product: 31, quantity: 100},
  {product: 49, quantity: 80},
  {product: 50, quantity: 80},
  {product: 51, quantity: 80},
  {product: 54, quantity: 200},
  {product: 55, quantity: 140},
  {product: 56, quantity: 200},
];

// Daten der Arbeitsplätze - Wie lange für welches Produkt
const PRODUCTIONPLANNING = [
  {product: 1, w1: 0, w2: 0, w3: 0, w4: 6, w5: 0, w6: 0, w7: 0, w8: 0, w9: 0, w10: 0, w11: 0, w12: 0, w13: 0, w14: 0, w15: 0},
  {product: 2, w1: 0, w2: 0, w3: 0, w4: 7, w5: 0, w6: 0, w7: 0, w8: 0, w9: 0, w10: 0, w11: 0, w12: 0, w13: 0, w14: 0, w15: 0},
  {product: 3, w1: 0, w2: 0, w3: 0, w4: 7, w5: 0, w6: 0, w7: 0, w8: 0, w9: 0, w10: 0, w11: 0, w12: 0, w13: 0, w14: 0, w15: 0},
  {product: 4, w1: 0, w2: 0, w3: 0, w4: 0, w5: 0, w6: 0, w7: 0, w8: 0, w9: 0, w10: 4, w11: 3, w12: 0, w13: 0, w14: 0, w15: 0},
  {product: 5, w1: 0, w2: 0, w3: 0, w4: 0, w5: 0, w6: 0, w7: 0, w8: 0, w9: 0, w10: 4, w11: 3, w12: 0, w13: 0, w14: 0, w15: 0},
  {product: 6, w1: 0, w2: 0, w3: 0, w4: 0, w5: 0, w6: 0, w7: 0, w8: 0, w9: 0, w10: 4, w11: 3, w12: 0, w13: 0, w14: 0, w15: 0},
  {product: 7, w1: 0, w2: 0, w3: 0, w4: 0, w5: 0, w6: 0, w7: 0, w8: 0, w9: 0, w10: 4, w11: 3, w12: 0, w13: 0, w14: 0, w15: 0},
  {product: 8, w1: 0, w2: 0, w3: 0, w4: 0, w5: 0, w6: 0, w7: 0, w8: 0, w9: 0, w10: 4, w11: 3, w12: 0, w13: 0, w14: 0, w15: 0},
  {product: 9, w1: 0, w2: 0, w3: 0, w4: 0, w5: 0, w6: 0, w7: 0, w8: 0, w9: 0, w10: 4, w11: 3, w12: 0, w13: 0, w14: 0, w15: 0},
  {product: 10, w1: 0, w2: 0, w3: 0, w4: 0, w5: 0, w6: 0, w7: 2, w8: 1, w9: 3, w10: 0, w11: 0, w12: 3, w13: 2, w14: 0, w15: 0},
  {product: 11, w1: 0, w2: 0, w3: 0, w4: 0, w5: 0, w6: 0, w7: 2, w8: 2, w9: 3, w10: 0, w11: 0, w12: 3, w13: 2, w14: 0, w15: 0},
  {product: 12, w1: 0, w2: 0, w3: 0, w4: 0, w5: 0, w6: 0, w7: 2, w8: 2, w9: 3, w10: 0, w11: 0, w12: 3, w13: 2, w14: 0, w15: 0},
  {product: 13, w1: 0, w2: 0, w3: 0, w4: 0, w5: 0, w6: 0, w7: 2, w8: 1, w9: 3, w10: 0, w11: 0, w12: 3, w13: 2, w14: 0, w15: 0},
  {product: 14, w1: 0, w2: 0, w3: 0, w4: 0, w5: 0, w6: 0, w7: 2, w8: 2, w9: 3, w10: 0, w11: 0, w12: 3, w13: 2, w14: 0, w15: 0},
  {product: 15, w1: 0, w2: 0, w3: 0, w4: 0, w5: 0, w6: 0, w7: 2, w8: 2, w9: 3, w10: 0, w11: 0, w12: 3, w13: 2, w14: 0, w15: 0},
  {product: 16, w1: 0, w2: 0, w3: 0, w4: 0, w5: 0, w6: 2, w7: 0, w8: 0, w9: 0, w10: 0, w11: 0, w12: 0, w13: 0, w14: 3, w15: 0},
  {product: 17, w1: 0, w2: 0, w3: 0, w4: 0, w5: 0, w6: 0, w7: 0, w8: 0, w9: 0, w10: 0, w11: 0, w12: 0, w13: 0, w14: 0, w15: 3},
  {product: 18, w1: 0, w2: 0, w3: 0, w4: 0, w5: 0, w6: 3, w7: 2, w8: 3, w9: 2, w10: 0, w11: 0, w12: 0, w13: 0, w14: 0, w15: 0},
  {product: 19, w1: 0, w2: 0, w3: 0, w4: 0, w5: 0, w6: 3, w7: 2, w8: 3, w9: 2, w10: 0, w11: 0, w12: 0, w13: 0, w14: 0, w15: 0},
  {product: 20, w1: 0, w2: 0, w3: 0, w4: 0, w5: 0, w6: 3, w7: 2, w8: 3, w9: 2, w10: 0, w11: 0, w12: 0, w13: 0, w14: 0, w15: 0},
  {product: 26, w1: 0, w2: 0, w3: 0, w4: 0, w5: 0, w6: 0, w7: 2, w8: 0, w9: 0, w10: 0, w11: 0, w12: 0, w13: 0, w14: 0, w15: 3},
  {product: 29, w1: 6, w2: 0, w3: 0, w4: 0, w5: 0, w6: 0, w7: 0, w8: 0, w9: 0, w10: 0, w11: 0, w12: 0, w13: 0, w14: 0, w15: 0},
  {product: 30, w1: 0, w2: 5, w3: 0, w4: 0, w5: 0, w6: 0, w7: 0, w8: 0, w9: 0, w10: 0, w11: 0, w12: 0, w13: 0, w14: 0, w15: 0},
  {product: 31, w1: 0, w2: 0, w3: 6, w4: 0, w5: 0, w6: 0, w7: 0, w8: 0, w9: 0, w10: 0, w11: 0, w12: 0, w13: 0, w14: 0, w15: 0},
  {product: 49, w1: 6, w2: 0, w3: 0, w4: 0, w5: 0, w6: 0, w7: 0, w8: 0, w9: 0, w10: 0, w11: 0, w12: 0, w13: 0, w14: 0, w15: 0},
  {product: 50, w1: 0, w2: 5, w3: 0, w4: 0, w5: 0, w6: 0, w7: 0, w8: 0, w9: 0, w10: 0, w11: 0, w12: 0, w13: 0, w14: 0, w15: 0},
  {product: 51, w1: 0, w2: 0, w3: 5, w4: 0, w5: 0, w6: 0, w7: 0, w8: 0, w9: 0, w10: 0, w11: 0, w12: 0, w13: 0, w14: 0, w15: 0},
  {product: 54, w1: 6, w2: 0, w3: 0, w4: 0, w5: 0, w6: 0, w7: 0, w8: 0, w9: 0, w10: 0, w11: 0, w12: 0, w13: 0, w14: 0, w15: 0},
  {product: 55, w1: 0, w2: 5, w3: 0, w4: 0, w5: 0, w6: 0, w7: 0, w8: 0, w9: 0, w10: 0, w11: 0, w12: 0, w13: 0, w14: 0, w15: 0},
  {product: 56, w1: 0, w2: 0, w3: 6, w4: 0, w5: 0, w6: 0, w7: 0, w8: 0, w9: 0, w10: 0, w11: 0, w12: 0, w13: 0, w14: 0, w15: 0},
];

// Durchschnittliche Rüstzeiten je Arbeitsplatz
const SETUPTIME = [
  {w: 1, time: 20},
  {w: 2, time: 20},
  {w: 3, time: 20},
  {w: 4, time: 20},
  {w: 5, time: 0},
  {w: 6, time: 15},
  {w: 7, time: 90},
  {w: 8, time: 50},
  {w: 9, time: 20},
  {w: 10, time: 40},
  {w: 11, time: 20},
  {w: 12, time: 0},
  {w: 13, time: 0},
  {w: 14, time: 0},
  {w: 15, time: 30}
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
    'secondShift'];

  viewData: Array<any>;
  oldViewData: Array<any>;
  setupEventLastPeriod: any[] = [];

  toggleButton: boolean = true;
  
  constructor(
    private CapacityPlanningService: CapacityPlanningService,
    private xmlReaderService: XmlReaderService
  ) {}

  ngOnInit(): void {
    this.xmlReaderService.subscribe((data) => {
      this.viewData = this.capacityPlaning(PRODUCTS, PRODUCTIONPLANNING, data); 
      this.oldViewData = this.createDeepCopyOf(this.viewData);
    });
  }
  
  capacityPlaning(product, productionplanning, data) {
    var result = new Array();
    var capacity;
    var setuptime;
    var capacityLastPeriod;
    var setUpLastPeriod;
    var overtime;
    var secondShift;
    var setupevents;
      
    // Berechnung der Kapazität
    capacity = this.capacityRequirements(product, productionplanning)

    // Berechnung Set-Up
    setupevents = this.getSetupEvents(data)
    setuptime = this.calculateSetupTime(setupevents, SETUPTIME)

    // Berechnung Capacity Last Period
    capacityLastPeriod = this.getcapacitylastPeriod(data)

    //Berechnung Set-Up Last Period
    setUpLastPeriod = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

    // Zusammenbauen des Arrays für die Tabelle
    for(var i = 0; i < capacity.length; ++i ){
      if(i===4){
        overtime = 0;
        secondShift = 0;
      } else if((capacity[i]+setuptime[i]+capacityLastPeriod[i]+setUpLastPeriod[i]-2400)/5<0){
        overtime = 0;
        secondShift = 1;
      } else if(capacity[i]+setuptime[i]+capacityLastPeriod[i]+setUpLastPeriod[i]>8400){
        if(capacity[i]+setuptime[i]+capacityLastPeriod[i]+setUpLastPeriod[i]-9600/5>0){
          overtime = (capacity[i]+setuptime[i]+capacityLastPeriod[i]+setUpLastPeriod[i]-8400)/5;
          secondShift = 4;
        } else {
          overtime = 0;
          secondShift = 4;
        }
      }
      else if(capacity[i]+setuptime[i]+capacityLastPeriod[i]+setUpLastPeriod[i]>6000){
        if(capacity[i]+setuptime[i]+capacityLastPeriod[i]+setUpLastPeriod[i]-7200>0){
          overtime = (capacity[i]+setuptime[i]+capacityLastPeriod[i]+setUpLastPeriod[i]-6000)/5;
          secondShift = 3;
        } else {
          overtime = 0;
          secondShift = 3;
        }
      } else if(capacity[i]+setuptime[i]+capacityLastPeriod[i]+setUpLastPeriod[i]>3600) {
        if(capacity[i]+setuptime[i]+capacityLastPeriod[i]+setUpLastPeriod[i]-4800>0){
          overtime = (capacity[i]+setuptime[i]+capacityLastPeriod[i]+setUpLastPeriod[i]-3600)/5;
          secondShift = 2;
        } else {
          overtime = 0;
          secondShift = 2;
        }
      } else if(capacity[i]+setuptime[i]+capacityLastPeriod[i]+setUpLastPeriod[i]>1200){
        if(capacity[i]+setuptime[i]+capacityLastPeriod[i]+setUpLastPeriod[i]-2400>0) {
          overtime = (capacity[i]+setuptime[i]+capacityLastPeriod[i]+setUpLastPeriod[i]-2400)/5;
          secondShift = 1;
        }
      }
      
      result.push({
        workplace: i+1,
        capareq: capacity[i],
        setup: setuptime[i],
        capalast: capacityLastPeriod[i],
        setuplast: setUpLastPeriod[i],
        totalRequirement: capacity[i]+setuptime[i]+capacityLastPeriod[i]+setUpLastPeriod[i],
        overtime: overtime,
        secondShift: secondShift     
      })
    }
    return result;
  }

  // Funktion für die Berechnung der benötigten Kapazität pro Arbeitsplatz
  capacityRequirements(product1, productionplanning1) {

    var result = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var product = product1;
    var productionplanning = productionplanning1;

      for(var i = 0; i < productionplanning.length;++i){
        if(product[i].product = productionplanning[i].product){
          result[0] += product[i].quantity * productionplanning[i].w1
          result[1] += product[i].quantity * productionplanning[i].w2
          result[2] += product[i].quantity * productionplanning[i].w3
          result[3] += product[i].quantity * productionplanning[i].w4
          result[4] += product[i].quantity * productionplanning[i].w5
          result[5] += product[i].quantity * productionplanning[i].w6
          result[6] += product[i].quantity * productionplanning[i].w7
          result[7] += product[i].quantity * productionplanning[i].w8
          result[8] += product[i].quantity * productionplanning[i].w9
          result[9] += product[i].quantity * productionplanning[i].w10
          result[10] += product[i].quantity * productionplanning[i].w11
          result[11] += product[i].quantity * productionplanning[i].w12
          result[12] += product[i].quantity * productionplanning[i].w13
          result[13] += product[i].quantity * productionplanning[i].w14
          result[14] += product[i].quantity * productionplanning[i].w15
        };
      };
    return result;
  }

  // Funktion, um Rüst-Daten aus der XML-Datei zu lesen
  getSetupEvents(data){
    
    var result = new Array();
    for(var i = 0; i < 15; ++i){
      if(i < 4){
        result.push({
          w: data.results.idletimecosts.workplace[i]._attributes.id ,
          quantity: data.results.idletimecosts.workplace[i]._attributes.setupevents
      })}
      else if(i === 4) {
        result.push({
          w: "5",
          quantity: "0"
        })
      } else if(i < 15 && i > 4 ) {
        result.push({
          w: data.results.idletimecosts.workplace[i-1]._attributes.id ,
          quantity: data.results.idletimecosts.workplace[i-1]._attributes.setupevents
        })
      }
    }
    return result;
  }

  // Berechnung der Rüstzeit pro Arbeitsplatz
  calculateSetupTime(lastPeriod, setUpTime){
    var result = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var lastPeriod = lastPeriod;
    var setUpTime = setUpTime;

    for(var i = 0; i< setUpTime.length; ++i){
          result[i] = lastPeriod[i].quantity * setUpTime[i].time;
    }
    return result;
  }

  // Berechnung der benötigten Zeit für die letzte Periode
  getcapacitylastPeriod(data){
    var result = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

    for(var i = 0; i < data.results.waitinglistworkstations.workplace.length; ++i){
      if(i < 4){
        result[i] += parseInt(data.results.waitinglistworkstations.workplace[i]._attributes.timeneed)
      }
      else if(i === 4) {
        result[i] = 0
      }
      else if(i < 15 && i > 4 ) {
        result[i-1] += parseInt(data.results.waitinglistworkstations.workplace[i]._attributes.timeneed)
      }
    }

    for(var i = 0; i < data.results.ordersinwork.workplace.length; ++i){
      var id = data.results.ordersinwork.workplace[i]._attributes.id
      result[id-1] += parseInt(data.results.ordersinwork.workplace[i]._attributes.timeneed)
    }
    return result;
  }

  enable(){
    this.toggleButton = !this.toggleButton
  }

  // Neue Berechnung der Tabelle, nachdem Änderungen vorgenommen werden
  updateTable(){

    this.toggleButton = !this.toggleButton
    console.log(this.viewData)
    var capacity:any[] = [];
    var setuptime:any[] = [];
    var capacityLastPeriod:any[] = [];
    var setUpLastPeriod:any[] = [];
    var overtime;
    var secondShift;

    for(var i=0; i < this.viewData.length; ++i){
      capacity[i] = this.viewData[i].capareq
      setuptime[i] = this.viewData[i].setup
      capacityLastPeriod[i] = this.viewData[i].capalast
      setUpLastPeriod[i] = this.viewData[i].setuplast
    }

    this.viewData = [];

    for(var i = 0; i < capacity.length; ++i ){

      if(i===4){
        overtime = 0;
        secondShift = 0;
      } else if((capacity[i]+setuptime[i]+capacityLastPeriod[i]+setUpLastPeriod[i]-2400)/5<0){
        overtime = 0;
        secondShift = 1;
      } else if(capacity[i]+setuptime[i]+capacityLastPeriod[i]+setUpLastPeriod[i]>8400){
        if(capacity[i]+setuptime[i]+capacityLastPeriod[i]+setUpLastPeriod[i]-9600/5>0){
          overtime = (capacity[i]+setuptime[i]+capacityLastPeriod[i]+setUpLastPeriod[i]-8400)/5;
          secondShift = 4;
        } else {
          overtime = 0;
          secondShift = 4;
        }
      }
      else if(capacity[i]+setuptime[i]+capacityLastPeriod[i]+setUpLastPeriod[i]>6000){
        if(capacity[i]+setuptime[i]+capacityLastPeriod[i]+setUpLastPeriod[i]-7200>0){
          overtime = (capacity[i]+setuptime[i]+capacityLastPeriod[i]+setUpLastPeriod[i]-6000)/5;
          secondShift = 3;
        } else {
          overtime = 0;
          secondShift = 3;
        }
      } else if(capacity[i]+setuptime[i]+capacityLastPeriod[i]+setUpLastPeriod[i]>3600) {
        if(capacity[i]+setuptime[i]+capacityLastPeriod[i]+setUpLastPeriod[i]-4800>0){
          overtime = (capacity[i]+setuptime[i]+capacityLastPeriod[i]+setUpLastPeriod[i]-3600)/5;
          secondShift = 2;
        } else {
          overtime = 0;
          secondShift = 2;
        }
      } else if(capacity[i]+setuptime[i]+capacityLastPeriod[i]+setUpLastPeriod[i]>1200){
        if(capacity[i]+setuptime[i]+capacityLastPeriod[i]+setUpLastPeriod[i]-2400>0) {
          overtime = (capacity[i]+setuptime[i]+capacityLastPeriod[i]+setUpLastPeriod[i]-2400)/5;
          secondShift = 1;
        }
      }

      this.viewData.push({
        workplace: i+1,
        capareq: capacity[i],
        setup: setuptime[i],
        capalast: capacityLastPeriod[i],
        setuplast: setUpLastPeriod[i],
        totalRequirement: capacity[i]+setuptime[i]+capacityLastPeriod[i]+setUpLastPeriod[i],
        overtime: overtime,
        secondShift: secondShift     
      })
      this.CapacityPlanningService.next(this.viewData)
    }
  }

  discardChanges(){
    this.toggleButton = !this.toggleButton
    this.viewData = [];
    this.viewData = this.oldViewData;
    this.CapacityPlanningService.next(this.viewData)
  }

  private createDeepCopyOf(obj: any): any {
    return JSON.parse(JSON.stringify(obj));
  }
}
