import { NgModuleCompileResult } from '@angular/compiler/src/ng_module_compiler';
import { Component, OnInit } from '@angular/core';
import { XmlReaderService } from '../xml-reader/xml-reader.service';
import { CapacityPlanningService } from './capacity-planning.service';
import { Matrix } from 'ml-matrix';

export interface Products {
  product: number;
  quantity: number;
}

// Diese Daten müssen aus der Stücklistenauflösung resultieren
const PRODUCTS: Products[] = [
  {product: 1, quantity: 170},
  {product: 2, quantity: 120},
  {product: 3, quantity: 200},
  {product: 4, quantity: 170},
  {product: 5, quantity: 120},
  {product: 6, quantity: 200},
  {product: 7, quantity: 170},
  {product: 8, quantity: 120},
  {product: 9, quantity: 200},
  {product: 10, quantity: 170},
  {product: 11, quantity: 120},
  {product: 12, quantity: 200},
  {product: 13, quantity: 170},
  {product: 14, quantity: 120},
  {product: 15, quantity: 200},
  {product: 16, quantity: 170},
  {product: 17, quantity: 120},
  {product: 18, quantity: 200},
  {product: 19, quantity: 170},
  {product: 20, quantity: 120},
  {product: 26, quantity: 200},
  {product: 29, quantity: 170},
  {product: 30, quantity: 120},
  {product: 31, quantity: 200},
  {product: 49, quantity: 170},
  {product: 50, quantity: 120},
  {product: 51, quantity: 200},
  {product: 54, quantity: 170},
  {product: 55, quantity: 120},
  {product: 56, quantity: 200},
];

// Daten der Arbeitsplätze - Wie lange für welches Produkt
const PRODUCTIONPLANNING: {} = [
  {product: 1, w1: 0, w2: 0, w3: 0, w4: 6, w5: 0, w6: 0, w7: 0, w8: 0, w9: 0, w10: 0, w11: 0, w12: 0, w13: 0, w14: 0, w15: 0},
  {product: 2, w1: 0, w2: 0, w3: 0, w4: 0, w5: 7, w6: 0, w7: 0, w8: 0, w9: 0, w10: 0, w11: 0, w12: 0, w13: 0, w14: 0, w15: 0},
  {product: 3, w1: 0, w2: 0, w3: 0, w4: 0, w5: 7, w6: 0, w7: 0, w8: 0, w9: 0, w10: 0, w11: 0, w12: 0, w13: 0, w14: 0, w15: 0},
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

  dataSource = [
    {workplace: 1, capareq: 170, setup: 20, capalast: 22, setuplast: 25, totalRequirement: 15, overtime: 5},
    {workplace: 2, capareq: 250, setup: 10, capalast: 35, setuplast: 36, totalRequirement: 36, overtime: 35},
    {workplace: 3, capareq: 350, setup: 2, capalast: 15, setuplast: 25, totalRequirement: 15, overtime: 5},
    {workplace: 4, capareq: 140, setup: 17, capalast: 35, setuplast: 27, totalRequirement: 27, overtime: 18},
    {workplace: 5, capareq: 358, setup: 20, capalast: 37, setuplast: 25, totalRequirement: 2, overtime: 5},
  ];
  
  constructor(
    //private capacityService: CapacityPlanningService,
  ) {}

  ngOnInit(): void {
     capacityPlanning(PRODUCTS,PRODUCTIONPLANNING);
  }
}

function capacityPlanning(Product, Productplanning): number[] {

  var result: number[];
  var quantityMatrix;
  var workplaceMatrix;

  // Matrix für die Produktionsmengen je Produkt
  for(var i :number = 0; i < Product.length; ++i ) {
    quantityMatrix.push(Product[i].quantity)   
  }

  // Matrix für die Zeiten der Arbeitsplätze
  for(var i2: number = 0; i2 < Productplanning.length; ++i2){
    workplaceMatrix.push([Productplanning[i2].w1, Productplanning[i2].w2,  Productplanning[i2].w3,  
      Productplanning[i2].w4, Productplanning[i2].w5,  Productplanning[i2].w6, 
      Productplanning[i2].w7, Productplanning[i2].w8, Productplanning[i2].w9,
      Productplanning[i2].w10,  Productplanning[i2].w11,  Productplanning[i2].w12,  
      Productplanning[i2].w13,  Productplanning[i2].w14, Productplanning[i2].w15])
  }
  
  // Matrixmultiplikation
  result = quantityMatrix.mmul(workplaceMatrix);

  return result
};