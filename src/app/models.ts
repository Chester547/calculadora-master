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
    categoria:string;
    nombre:string;
    newFile:string;
    detalle:string;
    id : string;
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
  