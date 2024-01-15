export interface DatosUsuario {
    nombre:string;
    apellido:string;
    enlace:string;
}
export interface UserData {
    cedula:string;
    alias:string;
    email:string;
    nombre:string;
    password:string;
    uuid:string;
}
export interface FileData {
    id : string;
    asistencia:boolean;
    nombre:string;
}
export interface PayCalculationOptions {
    workingDaysPerMonth: number;
    dailyHours: number;
    foodPay: boolean;
    transportPay: boolean;
    nightShift: boolean;
    weekendOrHoliday: boolean;
    paymentSubsidy: boolean;
    familyAllowance: boolean;
  }
  