import { NgModule } from '@angular/core';
import { CapacityPlanningModule } from 'src/app/capacity-planning/capacity-planning.module';
import { MaterialRequirementsPlanningModule } from 'src/app/material-requirements-planning/material-requirements-planning.module';
import { ProcurementModule } from 'src/app/procurement/procurement.module';
import { ProductPlanningModule } from 'src/app/product-planning/product-planning.module';
import { ResultModule } from 'src/app/result/result.module';

import { XmlReaderModule } from 'src/app/xml-reader/xml-reader.module';

@NgModule({
  declarations: [],
  imports: [
    XmlReaderModule,
    ProductPlanningModule,
    MaterialRequirementsPlanningModule,
    CapacityPlanningModule,
    ProcurementModule,
    ResultModule,
  ],
  exports: [
    XmlReaderModule,
    ProductPlanningModule,
    MaterialRequirementsPlanningModule,
    CapacityPlanningModule,
    ProcurementModule,
    ResultModule,
  ],
})
export class FeatureModule {}
