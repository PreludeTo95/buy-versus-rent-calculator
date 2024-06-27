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
  homeInsurance: number;
  opportunityCost: number;
  equity: number;
  appreciation: number;
  totalMonthlyCost: number;

  //property tax charged as 1% of property value
  propertyTaxRate: number = 0.009 / 12;

  //repairs costing 1% of property value per year
  maintenanceCostRate: number = 0.015 / 12;

  homeInsuranceRate: number = 0.008 / 12;

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

  getHomeInsurance() {
    return this.homeInsurance;
  }

  setHomeInsurance(homeInsurance: number) {
    this.homeInsurance = homeInsurance;
  }

  getOpportunityCost() {
    return this.opportunityCost;
  }

  setOpportunityCost(opportunityCost: number) {
    this.opportunityCost = opportunityCost;
  }

  getEquity() {
    return this.equity;
  }

  setEquity(equity: number) {
    this.equity = equity;
  }

  getAppreciation() {
    return this.appreciation;
  }

  setAppreciation(appreciation: number) {
    this.appreciation = appreciation;
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

    this.propertyTax = Math.round((this.buyPrice * this.propertyTaxRate));
    this.maintenanceCost = Math.round((pricingForm.buyPrice * this.maintenanceCostRate));
    
    if ((this.downPayment / this.buyPrice) <= 0.2) {
      this.privateMortgageInsurance = Math.round((principalAmount * 0.0125)/12);
    } else {
      this.privateMortgageInsurance = 0;
    }

    this.homeInsurance = Math.round(this.homeInsuranceRate * this.buyPrice);
    this.opportunityCost = Math.round((this.downPayment * 0.06) / 12);

    this.equity = Math.round((0.012 * principalAmount) / 12) * -1;
    this.appreciation = Math.round((0.01 * this.buyPrice) / 12) * -1;

    this.totalMonthlyCost = Math.round(this.mortgagePayment + this.propertyTax + this.maintenanceCost + this.privateMortgageInsurance + this.equity + this.appreciation + this.opportunityCost);
  }
}
