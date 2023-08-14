import { Component } from '@angular/core';
import { PayCalculationService } from 'src/app/services/pay-calculation.service';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.scss'],
})
export class PagosComponent {

  constructor(private payCalculationService: PayCalculationService) {}

  calculatePay(hoursWorked: number) {
    const options = {
      workingDaysPerMonth: 22, // Ejemplo de dias trabajados al mes
      dailyHours: 8, // Ejemplo de horas trabajadas al dia
      foodPay: true,
      transportPay: true,
      nightShift: false,
      weekendOrHoliday: false,
      paymentSubsidy: true,
      familyAllowance: true
    };

    const pay = this.payCalculationService.calculatePay(hoursWorked, options);
    console.log('Calculated pay:', pay);
  }
}