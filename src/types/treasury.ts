export interface IncomeTransaction {
  id: string;
  fecha: string;               // YYYY-MM-DD
  fechaRegistro: string;       // YYYY-MM-DD
  emisor: string;              // Nombre / Emisor
  concepto: string;            // Concepto / Motivo
  categoria: string;           // Categoría
  metodoPago: string;          // Método de Pago
  monto: number;               // Monto ($)
  observaciones: string;       // Observaciones
}

export interface ExpenseTransaction {
  id: string;
  fecha: string;               // YYYY-MM-DD
  comprobante: string;         // N° Comprobante / Factura
  destinatario: string;        // Proveedor / Destinatario
  concepto: string;            // Concepto / Detalle
  categoria: string;           // Categoría
  metodoPago: string;          // Método de Pago
  monto: number;               // Monto ($)
  observaciones: string;       // Observaciones
}

export interface OrganizationSettings {
  nombreOrganizacion: string;
  responsableTesoreria: string;
  moneda: string;
  simboloMoneda: string;
  periodoActivo: string;
  saldoInicialCaja: number;
}

export type ActiveTab = 'resumen' | 'ingresos' | 'gastos' | 'categorias' | 'guia-excel';
