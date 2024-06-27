import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BarChartComponent } from "../bar-chart/bar-chart.component";

@Component({
  selector: 'app-comparison-form',
  templateUrl: './comparison-form.component.html',
  styleUrls: ['./comparison-form.component.scss']
})

export class ComparisonFormComponent {
  
  pricingForm = new FormGroup({
    buyPrice: new FormControl(null, {validators: [Validators.required]}),
    downPayment: new FormControl(null, {validators: [Validators.required]}),
    loanInterestRate: new FormControl(null, {validators: [Validators.required]}),
    loanTerm: new FormControl(null, {validators: [Validators.required]}),
    mortgagePayment: new FormControl({value:0, disabled: true}),
    propertyTaxValue: new FormControl({value:0, disabled: true}),
    maintenanceCostValue: new FormControl({value:0, disabled: true}),
    privateMortgageInsurance: new FormControl({value: 0, disabled: true}),
    homeInsurance: new FormControl({value: 0, disabled: true}),
    totalCostValue: new FormControl({value:0, disabled: true}),

    rentPrice: new FormControl(null, {validators: [Validators.required]}),
  })

  completedPricingForm: any = {};
  propertyTaxRate: number = 0.01;
  maintenanceCostRate: number = 0.01;
  loanTerms: number[] = [10,15,20,25,30];
  showPrefix: boolean = false;

  
  constructor(
    private barChartComponent: BarChartComponent,
  ) {}

  comparePricing() {
    this.completedPricingForm = this.pricingForm.value;

    let principalAmount: number = this.completedPricingForm.buyPrice - this.completedPricingForm.downPayment;
    let loanInterestRate: number = (this.completedPricingForm.loanInterestRate / 100) / 12;
    let numberOfPayments: number = this.completedPricingForm.loanTerm * 12;
    let monthlyPayment: number = principalAmount * (loanInterestRate * ((1 + loanInterestRate) ** numberOfPayments)) / (((1 + loanInterestRate) ** numberOfPayments) - 1);


    let propertyTax = (this.completedPricingForm.buyPrice * this.propertyTaxRate) / 12;
    let maintenanceCost = (this.completedPricingForm.buyPrice * this.maintenanceCostRate) / 12;
    let pmi = 200;

    this.pricingForm.controls.mortgagePayment.setValue(Math.round(monthlyPayment));
    this.pricingForm.controls.propertyTaxValue.setValue(Math.round(propertyTax));
    this.pricingForm.controls.maintenanceCostValue.setValue(Math.round(maintenanceCost));
    this.pricingForm.controls.privateMortgageInsurance.setValue(Math.round(pmi));
    let totalMonthlyPayment = Math.round(monthlyPayment + propertyTax + maintenanceCost + pmi);
    this.pricingForm.controls.totalCostValue.setValue(totalMonthlyPayment);

    let rentPrice = this.completedPricingForm.rentPrice;
    this.barChartComponent.calculateChartBars(totalMonthlyPayment, rentPrice);
  }
}
