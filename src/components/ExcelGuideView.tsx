import React, { useState } from 'react';
import {
  Copy,
  Check,
  Download,
  HelpCircle,
  FileCheck,
  ShieldCheck,
  ChevronRight,
  Code,
  ArrowRight,
} from 'lucide-react';

interface ExcelGuideViewProps {
  onExportExcel: () => void;
}

export const ExcelGuideView: React.FC<ExcelGuideViewProps> = ({ onExportExcel }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      {/* Hero Section */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span>Especialista en Excel &amp; Finanzas de Organizaciones Sin Fines de Lucro</span>
              <span aria-hidden="true">·</span>
              <span>Movimiento Consolación para el Mundo</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Manual Técnico de Excel: Fórmulas y Vinculación
            </h1>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed max-w-2xl">
              Guía paso a paso con las fórmulas exactas en español, configuración de tablas oficiales, listas desplegables de validación y reglas de formato condicional para alertar sobre déficit financiero.
            </p>
          </div>

          <div className="flex flex-col gap-2 shrink-0">
            <button
              onClick={onExportExcel}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Descargar Archivo .xlsx Configurado</span>
            </button>
            <span className="text-[11px] text-center text-slate-500">
              Incluye las 4 pestañas y fórmulas vinculadas
            </span>
          </div>
        </div>

        {/* Quick Summary Pill Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 text-xs">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-slate-500 block mb-0.5">Estructura</span>
            <span className="font-semibold text-slate-800">4 Pestañas Vinculadas</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-slate-500 block mb-0.5">Idioma Fórmulas</span>
            <span className="font-semibold text-slate-800">Español (SUMA, SUMAR.SI)</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-slate-500 block mb-0.5">Control de Errores</span>
            <span className="font-semibold text-slate-800">Validación de Datos (Listas)</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-slate-500 block mb-0.5">Semáforo de Saldo</span>
            <span className="font-semibold text-rose-700">Formato Condicional Rojo</span>
          </div>
        </div>
      </div>

      {/* STEP 1: SHEET ARCHITECTURE */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
            1
          </span>
          <h2 className="text-lg font-bold text-slate-900">
            Estructura de las 4 Pestañas en tu Libro de Excel
          </h2>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Crea un libro nuevo en Microsoft Excel y renombra las 4 etiquetas de las hojas en la barra inferior exactamente con los siguientes nombres:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-900">1. Resumen General</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-slate-200 text-slate-700 rounded font-semibold">
                Dashboard
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Contiene las tarjetas de KPI (Saldo Inicial, Total Ingresos, Total Gastos, Saldo Final Disponible), los resúmenes matriciales por categoría y los gráficos comparativos. Aquí no se introducen registros diarios, solo fórmulas automáticas.
            </p>
          </div>

          <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-900">2. Ingresos</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-semibold">
                Libro Diario
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Columnas: <strong>Fecha | Fecha de Registro | Nombre / Emisor | Concepto / Motivo | Categoría | Método de Pago | Monto ($) | Observaciones</strong>.
            </p>
          </div>

          <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-900">3. Gastos</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-rose-100 text-rose-800 rounded font-semibold">
                Libro Diario
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Columnas: <strong>Fecha | N° Comprobante/Factura | Proveedor / Destinatario | Concepto / Detalle | Categoría | Método de Pago | Monto ($) | Observaciones</strong>.
            </p>
          </div>

          <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-900">4. Categorías y Ajustes</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-semibold">
                Maestros
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Columnas: <strong>Categorías de Ingresos | Categorías de Gastos | Métodos de Pago | Parámetros Generales</strong>. Sirve como origen para las listas desplegables.
            </p>
          </div>
        </div>

        {/* Tip: Convert to Official Table */}
        <div className="p-3.5 bg-sky-50 border border-sky-200 rounded-lg text-xs text-sky-900 flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
          <div>
            <strong>Consejo Pro de Especialista: Convierte tus datos en Tablas Oficiales de Excel</strong>
            <p className="mt-0.5 text-sky-800 leading-relaxed">
              En las pestañas 'Ingresos' y 'Gastos', selecciona cualquier celda con datos y presiona <kbd className="px-1 py-0.5 bg-white border border-sky-300 rounded font-mono font-bold text-slate-800">Ctrl + T</kbd> (o ficha <em>Insertar &gt; Tabla</em>). Asigna el nombre <code>TablaIngresos</code> y <code>TablaGastos</code> en la pestaña <em>Diseño de tabla</em>. De esta forma, cuando el tesorero agregue una fila nueva en el futuro, las fórmulas del Dashboard se actualizarán automáticamente sin necesidad de ajustar rangos de celdas.
            </p>
          </div>
        </div>
      </section>

      {/* STEP 2: EXACT SPANISH FORMULAS */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
            2
          </span>
          <h2 className="text-lg font-bold text-slate-900">
            Fórmulas Exactas en Español para la Pestaña 'Resumen General'
          </h2>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Copia y pega estas fórmulas en las celdas correspondientes de tu hoja principal. Se presentan tanto con la sintaxis de rango estándar de Excel como con la sintaxis de Tabla estructurada:
        </p>

        {/* Formula 1: Total Ingresos */}
        <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                A) Tarjeta Superior: Total Ingresos Acumulados
              </span>
              <span className="text-[11px] text-slate-500">
                Suma todos los importes registrados en la columna Monto ($) de la hoja Ingresos
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-semibold self-start sm:self-center">
              Fórmula SUMA
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between bg-slate-900 text-white p-3 rounded-md font-mono text-xs overflow-x-auto">
              <code>=SUMA(Ingresos!G2:G1000)</code>
              <button
                onClick={() => copyToClipboard('=SUMA(Ingresos!G2:G1000)', 'f1')}
                className="ml-3 p-1.5 hover:bg-slate-800 rounded text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
                title="Copiar fórmula"
              >
                {copiedKey === 'f1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <div className="flex items-center justify-between bg-slate-800 text-slate-300 p-2.5 rounded-md font-mono text-xs overflow-x-auto">
              <span className="text-[11px] font-sans text-slate-400">Si usas Tabla Oficial:</span>
              <code>=SUMA(TablaIngresos[Monto])</code>
              <button
                onClick={() => copyToClipboard('=SUMA(TablaIngresos[Monto])', 'f1_tbl')}
                className="ml-3 p-1 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
              >
                {copiedKey === 'f1_tbl' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
          </div>
        </div>

        {/* Formula 2: Total Gastos */}
        <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                B) Tarjeta Superior: Total Gastos Ejecutados
              </span>
              <span className="text-[11px] text-slate-500">
                Suma todos los comprobantes pagados de la columna Monto ($) en la hoja Gastos
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 bg-rose-100 text-rose-800 rounded font-semibold self-start sm:self-center">
              Fórmula SUMA
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between bg-slate-900 text-white p-3 rounded-md font-mono text-xs overflow-x-auto">
              <code>=SUMA(Gastos!G2:G1000)</code>
              <button
                onClick={() => copyToClipboard('=SUMA(Gastos!G2:G1000)', 'f2')}
                className="ml-3 p-1.5 hover:bg-slate-800 rounded text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
                title="Copiar fórmula"
              >
                {copiedKey === 'f2' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <div className="flex items-center justify-between bg-slate-800 text-slate-300 p-2.5 rounded-md font-mono text-xs overflow-x-auto">
              <span className="text-[11px] font-sans text-slate-400">Si usas Tabla Oficial:</span>
              <code>=SUMA(TablaGastos[Monto])</code>
              <button
                onClick={() => copyToClipboard('=SUMA(TablaGastos[Monto])', 'f2_tbl')}
                className="ml-3 p-1 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
              >
                {copiedKey === 'f2_tbl' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
          </div>
        </div>

        {/* Formula 3: Saldo Final / Disponible */}
        <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                C) Tarjeta Superior: Saldo Final / Disponible
              </span>
              <span className="text-[11px] text-slate-500">
                Calcula la tesorería neta disponible: Saldo Inicial + Ingresos - Gastos
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-semibold self-start sm:self-center">
              Fórmula Operativa
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between bg-slate-900 text-white p-3 rounded-md font-mono text-xs overflow-x-auto">
              <code>=B6+B7-B8</code>
              <button
                onClick={() => copyToClipboard('=B6+B7-B8', 'f3')}
                className="ml-3 p-1.5 hover:bg-slate-800 rounded text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
                title="Copiar fórmula"
              >
                {copiedKey === 'f3' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              * Donde <code>B6</code> es el Saldo Inicial de Caja (traído desde <code>='Categorías y Ajustes'!B6</code>), <code>B7</code> es el Total de Ingresos y <code>B8</code> es el Total de Gastos.
            </p>
          </div>
        </div>

        {/* Formula 4: SUMAR.SI por Categoría */}
        <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                D) Tabla Resumida: Ingresos por Categoría con SUMAR.SI
              </span>
              <span className="text-[11px] text-slate-500">
                Suma únicamente los montos cuyo valor en la columna Categoría coincida con el nombre de la fila
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded font-semibold self-start sm:self-center">
              Fórmula SUMAR.SI
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between bg-slate-900 text-white p-3 rounded-md font-mono text-xs overflow-x-auto">
              <code>=SUMAR.SI(Ingresos!$E$2:$E$1000, A14, Ingresos!$G$2:$G$1000)</code>
              <button
                onClick={() => copyToClipboard('=SUMAR.SI(Ingresos!$E$2:$E$1000, A14, Ingresos!$G$2:$G$1000)', 'f4')}
                className="ml-3 p-1.5 hover:bg-slate-800 rounded text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
                title="Copiar fórmula"
              >
                {copiedKey === 'f4' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <div className="flex items-center justify-between bg-slate-800 text-slate-300 p-2.5 rounded-md font-mono text-xs overflow-x-auto">
              <span className="text-[11px] font-sans text-slate-400">Si usas Tabla Oficial:</span>
              <code>=SUMAR.SI(TablaIngresos[Categoría], [@Categoría], TablaIngresos[Monto])</code>
              <button
                onClick={() => copyToClipboard('=SUMAR.SI(TablaIngresos[Categoría], [@Categoría], TablaIngresos[Monto])', 'f4_tbl')}
                className="ml-3 p-1 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
              >
                {copiedKey === 'f4_tbl' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              * Parámetros: <strong>Ingresos!$E$2:$E$1000</strong> es el rango a evaluar (Categoría), <strong>A14</strong> es la celda con el nombre de la categoría (ej. "Cuotas" o "Donaciones"), y <strong>Ingresos!$G$2:$G$1000</strong> es el rango que se sumará (Monto).
            </p>
          </div>
        </div>

        {/* Formula 5: Gastos por Categoría */}
        <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                E) Tabla Resumida: Gastos por Categoría con SUMAR.SI
              </span>
              <span className="text-[11px] text-slate-500">
                Suma los egresos clasificados en Alimentación, Transporte, Materiales, etc.
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 bg-rose-100 text-rose-800 rounded font-semibold self-start sm:self-center">
              Fórmula SUMAR.SI
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between bg-slate-900 text-white p-3 rounded-md font-mono text-xs overflow-x-auto">
              <code>=SUMAR.SI(Gastos!$E$2:$E$1000, D14, Gastos!$G$2:$G$1000)</code>
              <button
                onClick={() => copyToClipboard('=SUMAR.SI(Gastos!$E$2:$E$1000, D14, Gastos!$G$2:$G$1000)', 'f5')}
                className="ml-3 p-1.5 hover:bg-slate-800 rounded text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
                title="Copiar fórmula"
              >
                {copiedKey === 'f5' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <div className="flex items-center justify-between bg-slate-800 text-slate-300 p-2.5 rounded-md font-mono text-xs overflow-x-auto">
              <span className="text-[11px] font-sans text-slate-400">Si usas Tabla Oficial:</span>
              <code>=SUMAR.SI(TablaGastos[Categoría], [@Categoría], TablaGastos[Monto])</code>
              <button
                onClick={() => copyToClipboard('=SUMAR.SI(TablaGastos[Categoría], [@Categoría], TablaGastos[Monto])', 'f5_tbl')}
                className="ml-3 p-1 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
              >
                {copiedKey === 'f5_tbl' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
          </div>
        </div>

        {/* Formula 6: Estado / Alerta con SI */}
        <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                F) Etiqueta de Estado Financiero Automático
              </span>
              <span className="text-[11px] text-slate-500">
                Muestra un mensaje de advertencia inmediato si la caja entra en números rojos
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-200 text-slate-800 rounded font-semibold self-start sm:self-center">
              Fórmula Lógica SI
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between bg-slate-900 text-white p-3 rounded-md font-mono text-xs overflow-x-auto">
              <code>=SI(B9&lt;0, "⚠️ ALERTA: DÉFICIT DE CAJA", "✅ SUPERÁVIT OPERATIVO")</code>
              <button
                onClick={() => copyToClipboard('=SI(B9<0, "⚠️ ALERTA: DÉFICIT DE CAJA", "✅ SUPERÁVIT OPERATIVO")', 'f6')}
                className="ml-3 p-1.5 hover:bg-slate-800 rounded text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
                title="Copiar fórmula"
              >
                {copiedKey === 'f6' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* STEP 3: CONDITIONAL FORMATTING GUIDE */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-rose-600 text-white text-xs font-bold flex items-center justify-center">
            3
          </span>
          <h2 className="text-lg font-bold text-slate-900">
            Paso a Paso: Formato Condicional para Alertar si el Saldo es Negativo
          </h2>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Sigue estas instrucciones visuales en Microsoft Excel para que la celda de tu saldo disponible cambie automáticamente a color <strong className="text-rose-700">rojo de alerta</strong> en caso de que los gastos superen a los ingresos:
        </p>

        {/* Step-by-step visual cards */}
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3.5 rounded-lg bg-slate-50 border border-slate-200">
            <div className="w-6 h-6 rounded bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              1
            </div>
            <div className="text-xs text-slate-700 space-y-1">
              <strong>Selecciona la celda del Saldo Final en Excel</strong>
              <p className="text-slate-600">
                Haz clic sobre la celda que contiene el cálculo del saldo disponible (por ejemplo, la celda <code>B9</code> o <code>C4</code> en la hoja <em>'Resumen General'</em>).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-lg bg-slate-50 border border-slate-200">
            <div className="w-6 h-6 rounded bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              2
            </div>
            <div className="text-xs text-slate-700 space-y-1">
              <strong>Abre el menú de Formato Condicional en la Cinta de Opciones</strong>
              <p className="text-slate-600">
                En la barra superior de Excel, asegúrate de estar en la pestaña <strong>Inicio</strong>. En la sección <em>Estilos</em>, haz clic en el botón <strong>Formato condicional</strong>.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-lg bg-slate-50 border border-slate-200">
            <div className="w-6 h-6 rounded bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              3
            </div>
            <div className="text-xs text-slate-700 space-y-1">
              <strong>Aplica la regla 'Es menor que...'</strong>
              <p className="text-slate-600">
                Pasa el ratón por <strong>Reglas para resaltar celdas</strong> y en el submenú haz clic en <strong>Es menor que...</strong>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-lg bg-slate-50 border border-slate-200">
            <div className="w-6 h-6 rounded bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              4
            </div>
            <div className="text-xs text-slate-700 space-y-1">
              <strong>Configura el valor de corte en 0 y el color de alerta</strong>
              <p className="text-slate-600">
                En la ventana flotante que aparece:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600 pt-1">
                <li>En el recuadro izquierdo escribe exactamente: <code className="font-bold bg-white px-1.5 py-0.5 border border-slate-300 rounded font-mono">0</code></li>
                <li>En el menú desplegable derecho selecciona: <strong className="text-rose-700">Relleno rojo claro con texto rojo oscuro</strong>.</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-lg bg-slate-50 border border-slate-200">
            <div className="w-6 h-6 rounded bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              5
            </div>
            <div className="text-xs text-slate-700 space-y-1">
              <strong>Confirma haciendo clic en 'Aceptar'</strong>
              <p className="text-slate-600">
                ¡Listo! A partir de este momento, siempre que el saldo final caiga por debajo de cero ($ -1, -500, etc.), la celda se encenderá en rojo vivo advirtiendo de forma inmediata a la comisión de tesorería.
              </p>
            </div>
          </div>
        </div>

        {/* Optional Green Rule for Superavit */}
        <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-lg text-xs text-emerald-950 space-y-1">
          <strong className="text-emerald-900 block font-bold">
            Opcional: Semáforo Verde para Saldo Positivo
          </strong>
          <p className="text-emerald-800 leading-relaxed">
            Repite los pasos anteriores con la misma celda, pero seleccionando <strong>Reglas para resaltar celdas &gt; Es mayor o igual que &gt; 0</strong> y eligiendo <em>Relleno verde claro con texto verde oscuro</em>. Así tendrás un semáforo financiero dinámico completo (Verde = Saludable, Rojo = Déficit).
          </p>
        </div>
      </section>

      {/* STEP 4: DATA VALIDATION (DROPDOWNS) */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
            4
          </span>
          <h2 className="text-lg font-bold text-slate-900">
            Paso a Paso: Listas Desplegables con 'Validación de Datos'
          </h2>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Para que las fórmulas <code>SUMAR.SI</code> funcionen siempre al 100%, es fundamental evitar errores de digitación (por ejemplo, que alguien escriba "Comida" en lugar de "Alimentación"). En Excel esto se soluciona vinculando las columnas con las listas maestras de la pestaña <strong>'Categorías y Ajustes'</strong>:
        </p>

        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3.5 rounded-lg bg-slate-50 border border-slate-200">
            <div className="w-6 h-6 rounded bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              1
            </div>
            <div className="text-xs text-slate-700 space-y-1">
              <strong>Selecciona las celdas de la columna en la hoja Ingresos o Gastos</strong>
              <p className="text-slate-600">
                Ve a la pestaña <em>'Ingresos'</em> y sombrea todo el rango de la columna <strong>Categoría</strong> (por ejemplo de <code>E2</code> hasta <code>E1000</code>).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-lg bg-slate-50 border border-slate-200">
            <div className="w-6 h-6 rounded bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              2
            </div>
            <div className="text-xs text-slate-700 space-y-1">
              <strong>Abre la herramienta de Validación de Datos</strong>
              <p className="text-slate-600">
                En la cinta superior, haz clic en la pestaña <strong>Datos</strong> y luego en el icono <strong>Validación de datos</strong> (grupo <em>Herramientas de datos</em>).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-lg bg-slate-50 border border-slate-200">
            <div className="w-6 h-6 rounded bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              3
            </div>
            <div className="text-xs text-slate-700 space-y-1">
              <strong>Configura el Criterio de Validación</strong>
              <ul className="list-disc pl-5 space-y-1 text-slate-600 pt-1">
                <li>En el campo <strong>Permitir:</strong> selecciona <strong>Lista</strong>.</li>
                <li>Verifica que la casilla <strong>Celda con lista desplegable</strong> esté marcada.</li>
                <li>
                  En el recuadro <strong>Origen:</strong> escribe la referencia absoluta a la hoja de categorías. Por ejemplo para categorías de ingresos:{' '}
                  <code className="font-mono font-bold bg-white px-1.5 py-0.5 border border-slate-300 rounded text-slate-900">
                    ='Categorías y Ajustes'!$A$2:$A$20
                  </code>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-lg bg-slate-50 border border-slate-200">
            <div className="w-6 h-6 rounded bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              4
            </div>
            <div className="text-xs text-slate-700 space-y-1">
              <strong>Repite para Métodos de Pago y Gastos</strong>
              <p className="text-slate-600">
                Para la columna Método de Pago en ambas hojas, el origen será:{' '}
                <code className="font-mono bg-white px-1 border border-slate-300 rounded">
                  ='Categorías y Ajustes'!$C$2:$C$15
                </code>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STEP 5: FINANCIAL GOVERNANCE FOR NONPROFITS */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-700" />
          <h2 className="text-lg font-bold text-slate-900">
            Recomendaciones de Gobernanza Financiera para el Movimiento Consolación
          </h2>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Como asesor de tesorería para obras eclesiales y sin fines de lucro, te sugiero implementar estas 4 normas operativas para proteger la transparencia del Movimiento:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 text-xs">
          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
            <strong className="text-slate-900 flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
              1. Cero Pagos sin Comprobante Físico/Digital
            </strong>
            <p className="text-slate-600 leading-relaxed">
              Toda salida de dinero debe respaldarse con factura formal, ticket fiscal o recibo firmado con DNI/RUT. Asigna a cada comprobante físico el número correlativo que figura en la columna <strong>N° Comprobante</strong> de Excel.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
            <strong className="text-slate-900 flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
              2. Política de Doble Visto Bueno
            </strong>
            <p className="text-slate-600 leading-relaxed">
              Ningún retiro o transferencia extraordinaria superior a un monto acordado (ej. $50.000) debe ejecutarse con una sola firma. Se recomienda que el Tesorero y el Coordinador General firmen conjuntamente.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
            <strong className="text-slate-900 flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
              3. Arqueo Mensual de Caja Chica
            </strong>
            <p className="text-slate-600 leading-relaxed">
              El último día hábil de cada mes, cuenta físicamente el dinero en efectivo de la caja y coteja contra el saldo en Excel y el extracto del banco. Cualquier discrepancia debe asentarse en el renglón de ajustes.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
            <strong className="text-slate-900 flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
              4. Fondo de Reserva para Misiones y Emergencias
            </strong>
            <p className="text-slate-600 leading-relaxed">
              Mantener un fondo de reserva intocable equivalente al menos a 2 meses de costos fijos comunitarios para asegurar el sostenimiento continuo de las misiones y la sede.
            </p>
          </div>
        </div>

        {/* CTA Box */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-600">
            ¿Deseas descargar el archivo ya listo con todas estas fórmulas y pestañas aplicadas?
          </div>
          <button
            onClick={onExportExcel}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Descargar Libro Excel (.xlsx)</span>
          </button>
        </div>
      </section>
    </div>
  );
};
