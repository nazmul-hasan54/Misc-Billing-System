import { Component, OnInit } from '@angular/core';
import { VisitorDetailsService } from '../../../services/visitor-details.service';


@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
    {{currentYear}} &copy; Infonet assoicates Ltd.
    </span>
    <span class="visitor">Total Visitor: {{this.countData}}</span>
  `,
})
export class FooterComponent implements OnInit {
  currentYear = new Date().getFullYear();
  visitorCount: any;
  countData: any;

  constructor(
    private _visitorSvc: VisitorDetailsService
  ){}

  ngOnInit(): void {
    this.getVisitorCount();
  }

  getVisitorCount(){
    this._visitorSvc.getVisitorCount().subscribe((res:any) =>{
      this.visitorCount = res;
      this.countData = [...new Set(this.visitorCount.map(item => item.visitorCount
        ))];
    });
  }
}
