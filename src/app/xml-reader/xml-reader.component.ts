import { Component, OnInit } from '@angular/core';
import { XmlReaderService } from './xml-reader.service';

@Component({
  selector: 'app-xml-reader',
  templateUrl: './xml-reader.component.html',
  styleUrls: ['./xml-reader.component.scss'],
})
export class XmlReaderComponent implements OnInit {
  xmlFile: string | ArrayBuffer = '';
  data: any;
  fileName = '';

  constructor(private xmlReaderService: XmlReaderService) {}

  ngOnInit(): void {}

  uploadFile($event): void {
    this.readFile($event.target);
  }

  private readFile(inputValue: any): void {
    const file: File = inputValue.files[0];
    this.fileName = file.name;
    const myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.xmlFile = myReader.result;
      this.data = this.xmlReaderService.convertXmlToJs(this.xmlFile.toString());
      this.xmlReaderService.next(this.data);
    };
    myReader.readAsText(file);
  }
}
