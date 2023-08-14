import { Component } from '@angular/core';

@Component({
  selector: 'app-number-calculator',
  templateUrl: './number-calculator.component.html',
  styleUrls: ['./number-calculator.component.scss'],
})
export class NumberCalculatorComponent {
  number1: number;
  number2: number;
  total: number;

  calculateTotal() {
    this.total = this.number1 + this.number2;
  }
}
