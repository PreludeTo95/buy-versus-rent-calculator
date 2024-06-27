import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilityServiceService } from '../services/utility-service.service';

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
    propertyTax: new FormControl({value:0, disabled: true}),
    maintenanceCost: new FormControl({value:0, disabled: true}),
    privateMortgageInsurance: new FormControl({value: 0, disabled: true}),
    homeInsurance: new FormControl({value: 0, disabled: true}),
    opportunityCost: new FormControl({value: 0, disabled: true}),
    equity: new FormControl({value: 0, disabled: true}),
    appreciation: new FormControl({value: 0, disabled: true}),
    totalMonthlyCost: new FormControl({value:0, disabled: true}),

    rentPrice: new FormControl(null, {validators: [Validators.required]}),
  })

  completedPricingForm: any = {};
  loanTerms: number[] = [10,15,20,25,30];
  showBreakdown: boolean = false;

  @Output() 
  eventEmitter = new EventEmitter<{buyPrice: number, rentPrice: number}>();
  
  constructor(
    private utilityService: UtilityServiceService,
  ) {}

  comparePricing() {
    let completedPricingForm = this.pricingForm.value;
    this.utilityService.ingestForm(completedPricingForm);

    this.pricingForm.controls.mortgagePayment.setValue(this.utilityService.getMortgagePayment());
    this.pricingForm.controls.propertyTax.setValue(this.utilityService.getPropertyTax());
    this.pricingForm.controls.maintenanceCost.setValue(this.utilityService.getMaintenanceCost());
    this.pricingForm.controls.privateMortgageInsurance.setValue(this.utilityService.getPrivateMortgageInsurance());
    this.pricingForm.controls.homeInsurance.setValue(this.utilityService.getHomeInsurance());
    this.pricingForm.controls.opportunityCost.setValue(this.utilityService.getOpportunityCost());
    this.pricingForm.controls.equity.setValue(this.utilityService.getEquity());
    this.pricingForm.controls.appreciation.setValue(this.utilityService.getAppreciation());
    this.pricingForm.controls.totalMonthlyCost.setValue(this.utilityService.getTotalMonthlyCost());

    this.eventEmitter.emit({
      buyPrice: this.utilityService.getTotalMonthlyCost(),
      rentPrice: this.utilityService.getRentPrice()
    })
  }

  toggleBreakdown() {
    this.showBreakdown = !this.showBreakdown;
  }
}
