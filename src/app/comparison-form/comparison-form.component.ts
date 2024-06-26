import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-comparison-form',
  templateUrl: './comparison-form.component.html',
  styleUrls: ['./comparison-form.component.scss']
})

export class ComparisonFormComponent {
  
  pricingForm = new FormGroup({
    buyPrice: new FormControl<number>(0, {validators: [Validators.required]}),
    rentPrice: new FormControl<number>(0, {validators: [Validators.required]}),
  })

  propertyTaxRate: number = 0.01;
  propertyTaxValue: number = 0;

  maintenanceCostRate: number = 0.01;
  maintenanceCostValue: number = 0;

  totalCostValue: number = 0;
  
  constructor(

  ) {}

  comparePricing() {
    let buyPrice: number | null = 0;
    buyPrice = this.pricingForm.controls.buyPrice.value;

    if (buyPrice) {
      this.propertyTaxValue = this.propertyTaxRate * buyPrice;
      this.maintenanceCostValue = this.maintenanceCostRate * buyPrice;
      this.totalCostValue = <number>buyPrice + <number>this.propertyTaxValue + <number>this.maintenanceCostValue;
    } else {
      console.error("buyPrice is null");
    }

  }
}
