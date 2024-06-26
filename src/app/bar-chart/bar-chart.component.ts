import { Component } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})

export class BarChartComponent {

  buyPrice: number = 50;
  rentPrice: number = 70;

  buyBarHeight: string = '50%';
  rentBarHeight: string = '70%';

  calculateChartBars() {
    
  }
}
