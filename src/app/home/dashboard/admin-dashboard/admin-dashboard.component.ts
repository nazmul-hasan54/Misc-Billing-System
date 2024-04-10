import { Component, OnInit, VERSION } from '@angular/core';
//import Chart from 'chart.js/auto';

@Component({
  selector: 'ngx-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  name = 'Angular ' + VERSION.major;
  chart: any;
   
   
  constructor() {

  }

  ngOnInit(): void {
    // this.createChart();
  }

  // createChart(){

  //   this.chart = new Chart("MyChart", {
  //     type: 'pie', //this denotes tha type of chart

  //     data: {// values on X-Axis
  //       labels: ['Total Penalty Unit', 'Total Bill Amount','Total Recived Amount' ],
	//        datasets: [{
  //   label: 'Amount',
  //   data: [5000, 30000, 20000],
  //   backgroundColor: [
  //     'FireBrick',
  //     'MediumTurquoise',
	// 		'Gold',			
  //   ],
  //   hoverOffset: 4
  // }],
  //     },
  //     options: {
  //       aspectRatio:2.5
  //     }

  //   });
  // }


}
