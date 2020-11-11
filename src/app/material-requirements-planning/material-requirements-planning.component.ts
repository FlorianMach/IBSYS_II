import { Component, OnInit } from '@angular/core';
import { XmlReaderService } from '../xml-reader/xml-reader.service';
import { MaterialRequirementsPlanningService } from './material-requirements-planning.service';

@Component({
  selector: 'app-material-requirements-planning',
  templateUrl: './material-requirements-planning.component.html',
  styleUrls: ['./material-requirements-planning.component.scss'],
})
export class MaterialRequirementsPlanningComponent implements OnInit {
  data: any;

  constructor(
    private materialRequirementsPlanningService: MaterialRequirementsPlanningService,
    private xmlReaderService: XmlReaderService
  ) {}

  ngOnInit(): void {
    this.xmlReaderService.subscribe((data) => {
      this.data = data;
    });
  }
}
