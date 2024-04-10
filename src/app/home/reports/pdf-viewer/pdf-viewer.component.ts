import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements OnInit {
  @Input() documentTitle: any

  @Input() report: any=''
  constructor() {
  }

  ngOnInit(): void {
    console.log("report",this.report)
    console.log("documentTitle",this.documentTitle)
  }
}
