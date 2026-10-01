import React, { useState, useMemo } from 'react';
import { IncomeTransaction, ExpenseTransaction, OrganizationSettings } from '../types/treasury';
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  BookOpen,
  Download,
} from 'lucide-react';

interface DashboardViewProps {
  incomes: IncomeTransaction[];
  expenses: ExpenseTransaction[];
  incomeCategories: string[];
  expenseCategories: string[];
  settings: OrganizationSettings;
  onNavigateToGuide: () => void;
  onExportExcel: () => void;
  onNavigateToTab: (tab: 'ingresos' | 'gastos') => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  incomes,
  expenses,
  incomeCategories,
  expenseCategories,
  settings,
  onNavigateToGuide,
  onExportExcel,
  onNavigateToTab,
}) => {
  const [selectedMonth, setSelectedMonth] = useState<string>('all');

  // Month options extracted from data
  const availableMonths = useMemo(() => {
    const set = new Set<string>();
    incomes.forEach((i) => i.fecha && set.add(i.fecha.substring(0, 7)));
    expenses.forEach((e) => e.fecha && set.add(e.fecha.substring(0, 7)));
    return Array.from(set).sort().reverse();
  }, [incomes, expenses]);

  // Filtered dataset
  const filteredIncomes = useMemo(() => {
    if (selectedMonth === 'all') return incomes;
    return incomes.filter((i) => i.fecha.startsWith(selectedMonth));
  }, [incomes, selectedMonth]);

  const filteredExpenses = useMemo(() => {
    if (selectedMonth === 'all') return expenses;
    return expenses.filter((e) => e.fecha.startsWith(selectedMonth));
  }, [expenses, selectedMonth]);

  // Totals calculation
  const totalIngresos = useMemo(() => {
    return filteredIncomes.reduce((acc, curr) => acc + (Number(curr.monto) || 0), 0);
  }, [filteredIncomes]);

  const totalGastos = useMemo(() => {
    return filteredExpenses.reduce((acc, curr) => acc + (Number(curr.monto) || 0), 0);
  }, [filteredExpenses]);

  // Saldo Final
  const saldoInicial = selectedMonth === 'all' ? (settings.saldoInicialCaja || 0) : 0;
  const saldoDisponible = saldoInicial + totalIngresos - totalGastos;
  const isDeficit = saldoDisponible < 0;

  // Breakdown by Income Category
  const incomeCategoryBreakdown = useMemo(() => {
    return incomeCategories.map((cat) => {
      const matched = filteredIncomes.filter((i) => i.categoria === cat);
      const total = matched.reduce((acc, curr) => acc + (Number(curr.monto) || 0), 0);
      const count = matched.length;
      const percentage = totalIngresos > 0 ? (total / totalIngresos) * 100 : 0;
      return {
        categoria: cat,
        monto: total,
        count,
        percentage,
      };
    }).sort((a, b) => b.monto - a.monto);
  }, [incomeCategories, filteredIncomes, totalIngresos]);

  // Breakdown by Expense Category
  const expenseCategoryBreakdown = useMemo(() => {
    return expenseCategories.map((cat) => {
      const matched = filteredExpenses.filter((e) => e.categoria === cat);
      const total = matched.reduce((acc, curr) => acc + (Number(curr.monto) || 0), 0);
      const count = matched.length;
      const percentage = totalGastos > 0 ? (total / totalGastos) * 100 : 0;
      return {
        categoria: cat,
        monto: total,
        count,
        percentage,
      };
    }).sort((a, b) => b.monto - a.monto);
  }, [expenseCategories, filteredExpenses, totalGastos]);

  // Monthly comparison data for interactive chart
  const monthlyCashflow = useMemo(() => {
    const map = new Map<string, { month: string; ingresos: number; gastos: number }>();
    
    incomes.forEach((i) => {
      const m = i.fecha ? i.fecha.substring(0, 7) : 'Sin fecha';
      if (!map.has(m)) map.set(m, { month: m, ingresos: 0, gastos: 0 });
      map.get(m)!.ingresos += Number(i.monto) || 0;
    });

    expenses.forEach((e) => {
      const m = e.fecha ? e.fecha.substring(0, 7) : 'Sin fecha';
      if (!map.has(m)) map.set(m, { month: m, ingresos: 0, gastos: 0 });
      map.get(m)!.gastos += Number(e.monto) || 0;
    });

    return Array.from(map.values()).sort((a, b) => a.month.localeCompare(b.month));
  }, [incomes, expenses]);

  const maxChartValue = useMemo(() => {
    let max = 1000;
    monthlyCashflow.forEach((d) => {
      if (d.ingresos > max) max = d.ingresos;
      if (d.gastos > max) max = d.gastos;
    });
    return max;
  }, [monthlyCashflow]);

  // Format currency
  const formatCurrency = (val: number) => {
    return `${settings.simboloMoneda || '$'} ${Number(val || 0).toLocaleString('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner / Context Info */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span>{settings.nombreOrganizacion}</span>
              <span aria-hidden="true">·</span>
              <span>{settings.periodoActivo}</span>
              <span aria-hidden="true">·</span>
              <span>Moneda {settings.moneda}</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Resumen General de Tesorería
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <label htmlFor="monthSelect" className="font-medium">Período:</label>
              <select
                id="monthSelect"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="bg-transparent font-medium text-slate-800 outline-none cursor-pointer"
              >
                <option value="all">Todo el Historial</option>
                {availableMonths.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={onNavigateToGuide}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Ver Fórmulas</span>
            </button>
          </div>
        </div>

        {/* Conditional Formatting Alert Banner */}
        {isDeficit ? (
          <div className="mt-4 p-3.5 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="text-xs text-rose-900">
              <div className="font-semibold text-rose-800">
                ¡ALERTA DE TESORERÍA: DÉFICIT DE SALDO DETECTADO!
              </div>
              <p className="mt-0.5 text-rose-700">
                Los gastos acumulados superan los ingresos y el fondo disponible por{' '}
                <span className="font-mono font-bold">{formatCurrency(Math.abs(saldoDisponible))}</span>.
                En Excel esto se resalta automáticamente mediante la regla de Formato Condicional{' '}
                <code className="bg-rose-100 px-1 py-0.5 rounded font-mono text-[11px]">=C4&lt;0</code>.
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between text-xs text-emerald-900">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>Tesorería en Superávit Operativo:</strong> El saldo final disponible cubre los compromisos vigentes con un excedente de{' '}
                <span className="font-mono font-bold">{formatCurrency(saldoDisponible)}</span>.
              </span>
            </div>
            <span className="text-[11px] text-emerald-700 hidden md:inline">
              Fórmula Excel: <code className="font-mono font-bold">=B7+B8-B9</code>
            </span>
          </div>
        )}
      </div>

      {/* TOP KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* KPI 1: Saldo Inicial */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Saldo Inicial de Caja</span>
            <Wallet className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold font-mono tracking-tight text-slate-900">
            {formatCurrency(saldoInicial)}
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center gap-1">
            <span>Fondo de arrastre</span>
            <span aria-hidden="true">·</span>
            <code className="text-[11px] font-mono text-slate-400">=Ajustes!B6</code>
          </div>
        </div>

        {/* KPI 2: Total Ingresos */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Total Ingresos</span>
            <div className="p-1 rounded bg-emerald-50 text-emerald-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono tracking-tight text-emerald-700">
            {formatCurrency(totalIngresos)}
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
            <span>{filteredIncomes.length} cobros registrados</span>
            <button
              onClick={() => onNavigateToTab('ingresos')}
              className="text-emerald-700 hover:text-emerald-800 font-medium inline-flex items-center gap-0.5 cursor-pointer"
            >
              <span>Ver tabla</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* KPI 3: Total Gastos */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Total Gastos</span>
            <div className="p-1 rounded bg-rose-50 text-rose-600">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono tracking-tight text-rose-700">
            {formatCurrency(totalGastos)}
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
            <span>{filteredExpenses.length} comprobantes pagados</span>
            <button
              onClick={() => onNavigateToTab('gastos')}
              className="text-rose-700 hover:text-rose-800 font-medium inline-flex items-center gap-0.5 cursor-pointer"
            >
              <span>Ver tabla</span>
              <ArrowDownRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* KPI 4: Saldo Final / Disponible (CONDITIONAL FORMATTING TARGET) */}
        <div
          className={`border rounded-xl p-5 shadow-xs transition-colors ${
            isDeficit
              ? 'bg-rose-50 border-rose-300 ring-2 ring-rose-400/20'
              : 'bg-emerald-50/50 border-emerald-300 ring-2 ring-emerald-400/20'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">
              Saldo Final / Disponible
            </span>
            {isDeficit ? (
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 bg-rose-200 text-rose-900 rounded">
                Déficit
              </span>
            ) : (
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 bg-emerald-200 text-emerald-900 rounded">
                Superávit
              </span>
            )}
          </div>
          <div
            className={`text-2xl font-bold font-mono tracking-tight ${
              isDeficit ? 'text-rose-700' : 'text-emerald-800'
            }`}
          >
            {formatCurrency(saldoDisponible)}
          </div>
          <div className="mt-2 text-xs text-slate-600 flex items-center justify-between">
            <span>Disponible en banco y caja</span>
            <code className="text-[11px] font-mono text-slate-500">=B7+B8-B9</code>
          </div>
        </div>
      </div>

      {/* CHARTS SECTION: COMPARISON BARS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart: Comparativa Ingresos vs Gastos */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Comparativa de Flujo de Caja (Ingresos vs. Gastos)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Evolución mensual para control presupuestario del Movimiento
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-emerald-600 inline-block"></span>
                <span>Ingresos</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-rose-500 inline-block"></span>
                <span>Gastos</span>
              </div>
            </div>
          </div>

          {monthlyCashflow.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-xs text-slate-400">
              No hay movimientos registrados para mostrar en el gráfico
            </div>
          ) : (
            <div className="space-y-4 pt-2">
              {monthlyCashflow.map((m) => {
                const incPct = maxChartValue > 0 ? (m.ingresos / maxChartValue) * 100 : 0;
                const expPct = maxChartValue > 0 ? (m.gastos / maxChartValue) * 100 : 0;
                const net = m.ingresos - m.gastos;

                return (
                  <div key={m.month} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800">{m.month}</span>
                      <span
                        className={`font-mono font-medium ${
                          net >= 0 ? 'text-emerald-700' : 'text-rose-700'
                        }`}
                      >
                        Neto: {net >= 0 ? '+' : ''}{formatCurrency(net)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-1">
                      {/* Income Bar */}
                      <div className="flex items-center gap-2">
                        <div className="w-14 text-[11px] text-slate-500 font-mono">Ingreso</div>
                        <div className="flex-1 bg-slate-100 rounded-sm h-4 overflow-hidden relative">
                          <div
                            className="bg-emerald-600 h-full rounded-sm transition-all duration-300"
                            style={{ width: `${Math.max(incPct, 2)}%` }}
                          />
                        </div>
                        <div className="w-24 text-right text-[11px] font-mono font-medium text-emerald-800">
                          {formatCurrency(m.ingresos)}
                        </div>
                      </div>

                      {/* Expense Bar */}
                      <div className="flex items-center gap-2">
                        <div className="w-14 text-[11px] text-slate-500 font-mono">Gasto</div>
                        <div className="flex-1 bg-slate-100 rounded-sm h-4 overflow-hidden relative">
                          <div
                            className="bg-rose-500 h-full rounded-sm transition-all duration-300"
                            style={{ width: `${Math.max(expPct, 2)}%` }}
                          />
                        </div>
                        <div className="w-24 text-right text-[11px] font-mono font-medium text-rose-800">
                          {formatCurrency(m.gastos)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick Excel Formula Linking Widget */}
        <div className="bg-slate-900 text-white rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Fórmulas en Español Activas</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Vinculación de Fórmulas Excel
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              En este libro, el Dashboard se conecta dinámicamente con las pestañas de{' '}
              <strong className="text-white">Ingresos</strong> y{' '}
              <strong className="text-white">Gastos</strong> mediante funciones matriciales y condicionales:
            </p>

            <div className="space-y-2 text-xs font-mono">
              <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
                <div className="text-[10px] text-slate-400 font-sans mb-0.5">Total Ingresos:</div>
                <div className="text-emerald-400">=SUMA(Ingresos!G2:G1000)</div>
              </div>
              <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
                <div className="text-[10px] text-slate-400 font-sans mb-0.5">Gastos por Categoría:</div>
                <div className="text-emerald-400">=SUMAR.SI(Gastos!E:E, A14, Gastos!G:G)</div>
              </div>
              <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
                <div className="text-[10px] text-slate-400 font-sans mb-0.5">Formato Condicional Rojo:</div>
                <div className="text-rose-400">Regla: Valor de la celda &lt; 0</div>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={onNavigateToGuide}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Ver guía paso a paso completa</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onExportExcel}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-md text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Descargar archivo Excel listo"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* SUMMARY TABLES: INGRESOS POR CATEGORÍA & GASTOS POR CATEGORÍA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Table 1: Ingresos por Categoría */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Ingresos por Categoría
              </h2>
              <span className="text-[11px] text-slate-500 font-mono">
                Fórmula: =SUMAR.SI(Ingresos!E:E, [Categoría], Ingresos!G:G)
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-700">
              {formatCurrency(totalIngresos)}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/75 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-4">Categoría</th>
                  <th className="py-2.5 px-4 text-center">N° Op.</th>
                  <th className="py-2.5 px-4 text-right">% Total</th>
                  <th className="py-2.5 px-4 text-right">Monto Recaudado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {incomeCategoryBreakdown.map((row) => (
                  <tr key={row.categoria} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-4 font-medium text-slate-900">
                      {row.categoria}
                    </td>
                    <td className="py-2.5 px-4 text-center font-mono text-slate-500">
                      {row.count}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono text-slate-600">
                      <div className="flex items-center justify-end gap-1.5">
                        <div className="w-12 bg-slate-100 rounded-full h-1.5 overflow-hidden hidden sm:block">
                          <div
                            className="bg-emerald-600 h-full rounded-full"
                            style={{ width: `${Math.min(row.percentage, 100)}%` }}
                          />
                        </div>
                        <span>{row.percentage.toFixed(1)}%</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono font-semibold text-slate-900">
                      {formatCurrency(row.monto)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-50 border-t border-slate-200 font-semibold text-slate-900">
                <tr>
                  <td className="py-2.5 px-4">Total General Ingresos</td>
                  <td className="py-2.5 px-4 text-center font-mono">{filteredIncomes.length}</td>
                  <td className="py-2.5 px-4 text-right font-mono">100.0%</td>
                  <td className="py-2.5 px-4 text-right font-mono text-emerald-700">
                    {formatCurrency(totalIngresos)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Table 2: Gastos por Categoría */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Gastos por Categoría
              </h2>
              <span className="text-[11px] text-slate-500 font-mono">
                Fórmula: =SUMAR.SI(Gastos!E:E, [Categoría], Gastos!G:G)
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-rose-700">
              {formatCurrency(totalGastos)}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/75 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-4">Categoría</th>
                  <th className="py-2.5 px-4 text-center">N° Op.</th>
                  <th className="py-2.5 px-4 text-right">% Total</th>
                  <th className="py-2.5 px-4 text-right">Monto Ejecutado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {expenseCategoryBreakdown.map((row) => (
                  <tr key={row.categoria} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-4 font-medium text-slate-900">
                      {row.categoria}
                    </td>
                    <td className="py-2.5 px-4 text-center font-mono text-slate-500">
                      {row.count}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono text-slate-600">
                      <div className="flex items-center justify-end gap-1.5">
                        <div className="w-12 bg-slate-100 rounded-full h-1.5 overflow-hidden hidden sm:block">
                          <div
                            className="bg-rose-500 h-full rounded-full"
                            style={{ width: `${Math.min(row.percentage, 100)}%` }}
                          />
                        </div>
                        <span>{row.percentage.toFixed(1)}%</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono font-semibold text-slate-900">
                      {formatCurrency(row.monto)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-50 border-t border-slate-200 font-semibold text-slate-900">
                <tr>
                  <td className="py-2.5 px-4">Total General Gastos</td>
                  <td className="py-2.5 px-4 text-center font-mono">{filteredExpenses.length}</td>
                  <td className="py-2.5 px-4 text-right font-mono">100.0%</td>
                  <td className="py-2.5 px-4 text-right font-mono text-rose-700">
                    {formatCurrency(totalGastos)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
