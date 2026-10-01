import * as XLSX from 'xlsx';
import { IncomeTransaction, ExpenseTransaction, OrganizationSettings } from '../types/treasury';

export function exportTreasuryToExcel(
  incomes: IncomeTransaction[],
  expenses: ExpenseTransaction[],
  incomeCategories: string[],
  expenseCategories: string[],
  paymentMethods: string[],
  settings: OrganizationSettings
) {
  const wb = XLSX.utils.book_new();

  // ==========================================
  // SHEET 1: Resumen General (Dashboard)
  // ==========================================
  const totalIngresosCalc = incomes.reduce((acc, curr) => acc + (Number(curr.monto) || 0), 0);
  const totalGastosCalc = expenses.reduce((acc, curr) => acc + (Number(curr.monto) || 0), 0);
  const saldoFinalCalc = (settings.saldoInicialCaja || 0) + totalIngresosCalc - totalGastosCalc;

  const resumenData: (string | number | { f: string })[][] = [
    ['MOVIMIENTO CONSOLACIÓN PARA EL MUNDO'],
    ['LIBRO DE CONTROL DE TESORERÍA - DASHBOARD PRINCIPAL'],
    ['Período:', settings.periodoActivo, '', 'Responsable:', settings.responsableTesoreria],
    ['Fecha de Generación:', new Date().toLocaleDateString('es-ES'), '', 'Moneda:', settings.moneda],
    [],
    ['INDICADORES CLAVE DE TESORERÍA (KPIS)', 'MONTO ($)', '', 'FÓRMULA EXCEL CORRESPONDIENTE', 'EXPLICACIÓN'],
    ['(+) Saldo Inicial en Caja / Banco', settings.saldoInicialCaja || 0, '', '=Ajustes!B6', 'Saldo de arrastre del período anterior'],
    ['(+) Total Ingresos Acumulados', { f: 'SUMA(Ingresos!G2:G1000)' }, '', '=SUMA(Ingresos!G2:G1000)', 'Suma total de la columna Monto en Ingresos'],
    ['(-) Total Gastos Ejecutados', { f: 'SUMA(Gastos!G2:G1000)' }, '', '=SUMA(Gastos!G2:G1000)', 'Suma total de la columna Monto en Gastos'],
    ['(=) SALDO FINAL DISPONIBLE', { f: 'B7+B8-B9' }, '', '=B7+B8-B9', 'Saldo neto disponible para operaciones'],
    ['ESTADO FINANCIERO', { f: 'IF(B10<0,"ALERTA: DÉFICIT","SUPERÁVIT SALUDABLE")' }, '', '=SI(B10<0, "DÉFICIT", "SUPERÁVIT")', 'Formato condicional: Rojo si es negativo'],
    [],
    ['RESUMEN DE INGRESOS POR CATEGORÍA', '', '', 'RESUMEN DE GASTOS POR CATEGORÍA', ''],
    ['Categoría Ingreso', 'Total ($)', '% Ingresos', 'Categoría Gasto', 'Total ($)', '% Gastos'],
  ];

  // Populate category rows
  const maxCats = Math.max(incomeCategories.length, expenseCategories.length);
  for (let i = 0; i < maxCats; i++) {
    const incCat = incomeCategories[i] || '';
    const expCat = expenseCategories[i] || '';
    const excelRow = 15 + i; // 1-based index in Excel

    const incFormula = incCat ? { f: `SUMIF(Ingresos!E:E, "${incCat}", Ingresos!G:G)` } : 0;
    const incPctFormula = incCat ? { f: `IF(B$8>0, B${excelRow}/B$8, 0)` } : 0;

    const expFormula = expCat ? { f: `SUMIF(Gastos!E:E, "${expCat}", Gastos!G:G)` } : 0;
    const expPctFormula = expCat ? { f: `IF(E$9>0, E${excelRow}/E$9, 0)` } : 0;

    resumenData.push([
      incCat,
      incFormula,
      incPctFormula,
      expCat,
      expFormula,
      expPctFormula,
    ]);
  }

  // Row for Totals
  const lastRow = 14 + maxCats;
  resumenData.push([]);
  resumenData.push([
    'TOTAL INGRESOS CALCULADOS',
    { f: `SUM(B15:B${lastRow})` },
    '100%',
    'TOTAL GASTOS CALCULADOS',
    { f: `SUM(E15:E${lastRow})` },
    '100%',
  ]);

  const wsResumen = XLSX.utils.aoa_to_sheet(resumenData);

  // Column widths
  wsResumen['!cols'] = [
    { wch: 32 },
    { wch: 18 },
    { wch: 14 },
    { wch: 32 },
    { wch: 18 },
    { wch: 14 },
  ];

  XLSX.utils.book_append_sheet(wb, wsResumen, 'Resumen General');

  // ==========================================
  // SHEET 2: Ingresos
  // ==========================================
  const ingresosHeaders = [
    'Fecha',
    'Fecha de Registro',
    'Nombre / Emisor',
    'Concepto / Motivo',
    'Categoría',
    'Método de Pago',
    'Monto ($)',
    'Observaciones',
  ];

  const ingresosRows = incomes.map((inc) => [
    inc.fecha,
    inc.fechaRegistro,
    inc.emisor,
    inc.concepto,
    inc.categoria,
    inc.metodoPago,
    Number(inc.monto),
    inc.observaciones,
  ]);

  const wsIngresos = XLSX.utils.aoa_to_sheet([ingresosHeaders, ...ingresosRows]);
  wsIngresos['!cols'] = [
    { wch: 12 },
    { wch: 16 },
    { wch: 28 },
    { wch: 36 },
    { wch: 22 },
    { wch: 22 },
    { wch: 15 },
    { wch: 35 },
  ];
  XLSX.utils.book_append_sheet(wb, wsIngresos, 'Ingresos');

  // ==========================================
  // SHEET 3: Gastos
  // ==========================================
  const gastosHeaders = [
    'Fecha',
    'N° Comprobante/Factura',
    'Proveedor / Destinatario',
    'Concepto / Detalle',
    'Categoría',
    'Método de Pago',
    'Monto ($)',
    'Observaciones',
  ];

  const gastosRows = expenses.map((exp) => [
    exp.fecha,
    exp.comprobante,
    exp.destinatario,
    exp.concepto,
    exp.categoria,
    exp.metodoPago,
    Number(exp.monto),
    exp.observaciones,
  ]);

  const wsGastos = XLSX.utils.aoa_to_sheet([gastosHeaders, ...gastosRows]);
  wsGastos['!cols'] = [
    { wch: 12 },
    { wch: 22 },
    { wch: 30 },
    { wch: 36 },
    { wch: 24 },
    { wch: 22 },
    { wch: 15 },
    { wch: 35 },
  ];
  XLSX.utils.book_append_sheet(wb, wsGastos, 'Gastos');

  // ==========================================
  // SHEET 4: Categorías y Ajustes
  // ==========================================
  const settingsHeaders = [
    'Categorías de Ingresos',
    'Categorías de Gastos',
    'Métodos de Pago',
    'Parámetro de Ajuste',
    'Valor Configurado',
  ];

  const settingsRows: (string | number)[][] = [];
  const maxRows = Math.max(incomeCategories.length, expenseCategories.length, paymentMethods.length, 6);

  const orgParams = [
    ['Organización', settings.nombreOrganizacion],
    ['Responsable', settings.responsableTesoreria],
    ['Moneda', settings.moneda],
    ['Símbolo Moneda', settings.simboloMoneda],
    ['Período', settings.periodoActivo],
    ['Saldo Inicial de Caja', settings.saldoInicialCaja],
  ];

  for (let i = 0; i < maxRows; i++) {
    settingsRows.push([
      incomeCategories[i] || '',
      expenseCategories[i] || '',
      paymentMethods[i] || '',
      orgParams[i] ? orgParams[i][0] : '',
      orgParams[i] ? orgParams[i][1] : '',
    ]);
  }

  const wsAjustes = XLSX.utils.aoa_to_sheet([settingsHeaders, ...settingsRows]);
  wsAjustes['!cols'] = [
    { wch: 26 },
    { wch: 28 },
    { wch: 24 },
    { wch: 24 },
    { wch: 32 },
  ];
  XLSX.utils.book_append_sheet(wb, wsAjustes, 'Categorías y Ajustes');

  // Generate binary and trigger browser download
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([wbout], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const fileName = `Tesoreria_Consolacion_Mundo_${settings.periodoActivo.replace(/\s+/g, '_')}.xlsx`;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
