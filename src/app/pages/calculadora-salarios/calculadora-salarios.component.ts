import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculadora-salarios',
  templateUrl: './calculadora-salarios.component.html',
  styleUrls: ['./calculadora-salarios.component.scss'],
})
export class CalculadoraSalariosComponent {
  salarioBase:number=824.80;
  horasMensuales:number=240;
  horasExtra:number;
  horasExtrasPago:number;
  horasAdicionales:number;
  recargos:number;
  turnoNocturno:number;
  finesyferiados:number;
  transporte:number=4;
  alimentacion:number=0.50;
  subsidioAntigu:number;
  subsidioFamili:number;
  turnosTransporte:number;
  turnosAlimentaci:number;
  totalPagoMensual:number;
  iess=0.0945;

  calculoHoraExtra(){
    console.log("esto se recibe", this.horasExtra);
    console.log("esto se recibe", this.finesyferiados);
    this.recargos=this.horasExtra + this.finesyferiados;
  }
  
  calculoHorasAdicionales(){
    return((this.horasAdicionales || 0 ) * 1.5 - (this.salarioBase*this.iess)).toFixed(2);
  }
  
  calculoFinesFeriados(){
    console.log("esto se envia", this.finesyferiados);
    const val = (this.salarioBase/this.horasMensuales) * this.finesyferiados;
    const val1 = val * this.iess;
    const val2 =  val - val1;
  }

  calculoPagoMensualTotal(){
    this.totalPagoMensual = this.salarioBase//resto de calculos;
  }

  constructor() { }

}
