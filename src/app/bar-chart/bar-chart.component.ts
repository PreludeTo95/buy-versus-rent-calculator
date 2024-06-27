import { ChangeDetectorRef, Component } from '@angular/core';
import { UtilityServiceService } from '../services/utility-service.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})

export class BarChartComponent {
  buyPrice: number;
  rentPrice: number;
  
  buyBarHeight: string = '200px';
  rentBarHeight: string = '200px';

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private utilityService: UtilityServiceService,
  ) {}

  calculateChartBars() {
    this.buyPrice = this.utilityService.getBuyPrice();
    this.rentPrice = this.utilityService.getRentPrice();
    let relativeSize: number;

    if (this.buyPrice > this.rentPrice) {
      this.rentBarHeight = '200px';
      relativeSize = (this.buyPrice / this.rentPrice) * 200;
      this.buyBarHeight = relativeSize.toFixed(0) + 'px';
    } 
    else if (this.buyPrice < this.rentPrice) {
      this.buyBarHeight = '200px';
      relativeSize = (this.rentPrice / this.buyPrice) * 200;
      this.rentBarHeight = relativeSize.toFixed(0) + 'px';
    } 
    else {
      this.rentBarHeight = '200px';
      this.buyBarHeight = '200px';
    }

  // document.getElementById('mortgage-bar').style.height = this.buyBarHeight;
  // document.getElementById('rent-bar').style.height = this.rentBarHeight;

  // this.changeDetectorRef.detectChanges();
  
  }
}
