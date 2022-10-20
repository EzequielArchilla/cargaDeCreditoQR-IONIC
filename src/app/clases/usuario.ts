export class Usuario {
  id: string;
  mail: string;
  monto: number;
  tipo: string;
  qrEscaneados: string[];

  constructor() {
    this.mail = '';
    this.monto = 0;
    this.tipo = '';
    this.qrEscaneados = [];
  }
}
