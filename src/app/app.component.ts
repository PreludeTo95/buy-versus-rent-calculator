import { Component } from '@angular/core';
import { BarChartComponent } from './bar-chart/bar-chart.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'buy-versus-rent-calculator';
  
  constructor(
    public barChartComponent: BarChartComponent,
  ) {}

}
