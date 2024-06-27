import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UtilityServiceService {

  buyPrice: number;
  downPayment: number;
  loanInterestRate: number;
  loanTerm: number;
  rentPrice: number;

  mortgagePayment: number;
  propertyTax: number;
  maintenanceCost: number;
  privateMortgageInsurance: number;
  totalMonthlyCost: number;

  //property tax charged as 1% of property value
  propertyTaxRate: number = 0.01 / 12;

  //repairs costing 1% of property value per year
  maintenanceCostRate: number = 0.01 / 12;

  constructor() { }

  getBuyPrice() {
    return this.buyPrice;
  }

  setBuyPrice(buyPrice: number) {
    this.buyPrice = buyPrice;
  }
  
  getDownPayment() {
    return this.downPayment;
  }

  setDownPayment(downPayment: number) {
    this.buyPrice = downPayment;
  }

  getLoanInterestRate() {
    return this.loanInterestRate;
  }

  setLoanInterestRate(loanInterestRate: number) {
    this.loanInterestRate = loanInterestRate;
  }

  getLoanTerm() {
    return this.loanTerm;
  }

  setLoanTerm(loanTerm: number) {
    this.loanTerm = loanTerm;
  }

  getRentPrice() {
    return this.rentPrice;
  }

  setRentPrice(rentPrice: number) {
    this.rentPrice = rentPrice;
  }

  getMortgagePayment() {
    return this.mortgagePayment;
  }

  setMortgagePayment(mortgagePayment: number) {
    this.mortgagePayment = mortgagePayment;
  }

  getPropertyTax() {
    return this.propertyTax;
  }

  setPropertyTax(propertyTax: number) {
    this.propertyTax = propertyTax;
  }

  getMaintenanceCost() {
    return this.maintenanceCost;
  }

  setMaintenanceCost(maintenanceCost: number) {
    this.maintenanceCost = maintenanceCost;
  }

  getPrivateMortgageInsurance() {
    return this.privateMortgageInsurance;
  }

  setPrivateMortgageInsurance(privateMortgageInsurance: number) {
    this.privateMortgageInsurance = privateMortgageInsurance;
  }

  getTotalMonthlyCost() {
    return this.totalMonthlyCost;
  }

  setTotalMonthlyCost(totalMonthlyCost: number) {
    this.totalMonthlyCost = totalMonthlyCost;
  }

  ingestForm(pricingForm: any) {
    this.buyPrice = pricingForm.buyPrice;
    this.downPayment = pricingForm.downPayment;
    this.loanInterestRate = pricingForm.loanInterestRate;
    this.loanTerm = pricingForm.loanTerm;
    this.rentPrice = pricingForm.rentPrice;
    
    let principalAmount: number = this.buyPrice - this.downPayment;
    let monthlyLoanInterestRate: number = (this.loanInterestRate / 100) / 12;
    let numberOfPayments: number = this.loanTerm * 12;
    this.mortgagePayment = Math.round(principalAmount * (monthlyLoanInterestRate * ((1 + monthlyLoanInterestRate) ** numberOfPayments)) / (((1 + monthlyLoanInterestRate) ** numberOfPayments) - 1));

    this.propertyTax = Math.round((this.buyPrice * this.propertyTaxRate) / 12);
    this.maintenanceCost = Math.round((pricingForm.buyPrice * this.maintenanceCostRate) / 12);
    this.privateMortgageInsurance = Math.round(200);
    this.totalMonthlyCost = Math.round(this.mortgagePayment + this.propertyTax + this.maintenanceCost + this.privateMortgageInsurance);
  }
}
