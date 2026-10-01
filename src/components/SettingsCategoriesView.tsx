import React, { useState } from 'react';
import { OrganizationSettings } from '../types/treasury';
import {
  Plus,
  Trash2,
  Building,
  Check,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface SettingsCategoriesViewProps {
  incomeCategories: string[];
  expenseCategories: string[];
  paymentMethods: string[];
  settings: OrganizationSettings;
  onUpdateIncomeCategories: (cats: string[]) => void;
  onUpdateExpenseCategories: (cats: string[]) => void;
  onUpdatePaymentMethods: (methods: string[]) => void;
  onUpdateSettings: (settings: OrganizationSettings) => void;
  onResetDemoData: () => void;
}

export const SettingsCategoriesView: React.FC<SettingsCategoriesViewProps> = ({
  incomeCategories,
  expenseCategories,
  paymentMethods,
  settings,
  onUpdateIncomeCategories,
  onUpdateExpenseCategories,
  onUpdatePaymentMethods,
  onUpdateSettings,
  onResetDemoData,
}) => {
  // Local state for new entries
  const [newIncomeCat, setNewIncomeCat] = useState('');
  const [newExpenseCat, setNewExpenseCat] = useState('');
  const [newMethod, setNewMethod] = useState('');

  // Local state for settings form
  const [orgForm, setOrgForm] = useState<OrganizationSettings>({ ...settings });
  const [savedSettingsSuccess, setSavedSettingsSuccess] = useState(false);

  // Income category actions
  const handleAddIncomeCat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIncomeCat.trim()) return;
    if (incomeCategories.includes(newIncomeCat.trim())) return;
    onUpdateIncomeCategories([...incomeCategories, newIncomeCat.trim()]);
    setNewIncomeCat('');
  };

  const handleDeleteIncomeCat = (catToDelete: string) => {
    if (incomeCategories.length <= 1) return;
    onUpdateIncomeCategories(incomeCategories.filter((c) => c !== catToDelete));
  };

  // Expense category actions
  const handleAddExpenseCat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpenseCat.trim()) return;
    if (expenseCategories.includes(newExpenseCat.trim())) return;
    onUpdateExpenseCategories([...expenseCategories, newExpenseCat.trim()]);
    setNewExpenseCat('');
  };

  const handleDeleteExpenseCat = (catToDelete: string) => {
    if (expenseCategories.length <= 1) return;
    onUpdateExpenseCategories(expenseCategories.filter((c) => c !== catToDelete));
  };

  // Payment methods actions
  const handleAddMethod = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMethod.trim()) return;
    if (paymentMethods.includes(newMethod.trim())) return;
    onUpdatePaymentMethods([...paymentMethods, newMethod.trim()]);
    setNewMethod('');
  };

  const handleDeleteMethod = (methodToDelete: string) => {
    if (paymentMethods.length <= 1) return;
    onUpdatePaymentMethods(paymentMethods.filter((m) => m !== methodToDelete));
  };

  // Save settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(orgForm);
    setSavedSettingsSuccess(true);
    setTimeout(() => setSavedSettingsSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span>Pestaña 'Categorías y Ajustes'</span>
              <span aria-hidden="true">·</span>
              <span>Validación de Datos & Parámetros Maestros</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Listas Desplegables y Configuración de Tesorería
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onResetDemoData}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              title="Restaurar las categorías y movimientos iniciales sugeridos para el Movimiento"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restaurar Datos Ejemplo</span>
            </button>
          </div>
        </div>

        {/* Explain Connection to Excel Data Validation */}
        <div className="mt-4 p-3 bg-amber-50/70 border border-amber-200/80 rounded-lg text-xs text-amber-900 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>¿Para qué sirve esta pestaña en Excel?</strong> En Microsoft Excel, estas listas son el origen de las <em>Listas Desplegables</em> (menú <strong>Datos &gt; Validación de Datos &gt; Lista</strong>). Mantener unificados los nombres evita errores ortográficos (por ejemplo, escribir "Alimentación" y "Comida"), asegurando que las fórmulas <code>SUMAR.SI</code> del Dashboard sumen con 100% de exactitud.
          </p>
        </div>
      </div>

      {/* Grid of 3 Master Lists */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* List 1: Categorías de Ingresos */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <h2 className="text-sm font-bold text-slate-900">
                Categorías de Ingresos
              </h2>
              <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                {incomeCategories.length} listas
              </span>
            </div>

            <p className="text-xs text-slate-500 mb-3">
              Columna E en la hoja 'Ingresos'. Vinculada con Excel como: <code className="text-slate-700 font-mono font-medium">=Ajustes!$A$2:$A${incomeCategories.length + 1}</code>
            </p>

            <ul className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
              {incomeCategories.map((cat) => (
                <li
                  key={cat}
                  className="flex items-center justify-between py-1.5 px-2.5 text-xs rounded-lg bg-slate-50 hover:bg-slate-100 group transition-colors"
                >
                  <span className="font-medium text-slate-800">{cat}</span>
                  <button
                    onClick={() => handleDeleteIncomeCat(cat)}
                    className="text-slate-400 hover:text-rose-600 p-0.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    title="Eliminar categoría"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <form onSubmit={handleAddIncomeCat} className="mt-4 pt-3 border-t border-slate-100 flex gap-2">
            <input
              type="text"
              placeholder="Nueva categoría..."
              value={newIncomeCat}
              onChange={(e) => setNewIncomeCat(e.target.value)}
              className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-900"
            />
            <button
              type="submit"
              className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* List 2: Categorías de Gastos */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <h2 className="text-sm font-bold text-slate-900">
                Categorías de Gastos
              </h2>
              <span className="text-[11px] font-mono text-rose-700 bg-rose-50 px-2 py-0.5 rounded font-semibold">
                {expenseCategories.length} listas
              </span>
            </div>

            <p className="text-xs text-slate-500 mb-3">
              Columna E en la hoja 'Gastos'. Vinculada con Excel como: <code className="text-slate-700 font-mono font-medium">=Ajustes!$B$2:$B${expenseCategories.length + 1}</code>
            </p>

            <ul className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
              {expenseCategories.map((cat) => (
                <li
                  key={cat}
                  className="flex items-center justify-between py-1.5 px-2.5 text-xs rounded-lg bg-slate-50 hover:bg-slate-100 group transition-colors"
                >
                  <span className="font-medium text-slate-800">{cat}</span>
                  <button
                    onClick={() => handleDeleteExpenseCat(cat)}
                    className="text-slate-400 hover:text-rose-600 p-0.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    title="Eliminar categoría"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <form onSubmit={handleAddExpenseCat} className="mt-4 pt-3 border-t border-slate-100 flex gap-2">
            <input
              type="text"
              placeholder="Nueva categoría..."
              value={newExpenseCat}
              onChange={(e) => setNewExpenseCat(e.target.value)}
              className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-500 text-slate-900"
            />
            <button
              type="submit"
              className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* List 3: Métodos de Pago */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <h2 className="text-sm font-bold text-slate-900">
                Métodos de Pago
              </h2>
              <span className="text-[11px] font-mono text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-semibold">
                {paymentMethods.length} medios
              </span>
            </div>

            <p className="text-xs text-slate-500 mb-3">
              Columna F en hojas 'Ingresos' y 'Gastos'. Vinculada con Excel como: <code className="text-slate-700 font-mono font-medium">=Ajustes!$C$2:$C${paymentMethods.length + 1}</code>
            </p>

            <ul className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
              {paymentMethods.map((m) => (
                <li
                  key={m}
                  className="flex items-center justify-between py-1.5 px-2.5 text-xs rounded-lg bg-slate-50 hover:bg-slate-100 group transition-colors"
                >
                  <span className="font-medium text-slate-800">{m}</span>
                  <button
                    onClick={() => handleDeleteMethod(m)}
                    className="text-slate-400 hover:text-rose-600 p-0.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    title="Eliminar método"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <form onSubmit={handleAddMethod} className="mt-4 pt-3 border-t border-slate-100 flex gap-2">
            <input
              type="text"
              placeholder="Nuevo método..."
              value={newMethod}
              onChange={(e) => setNewMethod(e.target.value)}
              className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 text-slate-900"
            />
            <button
              type="submit"
              className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Organization Parameters */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-slate-600" />
            <h2 className="text-sm font-bold text-slate-900">
              Datos de la Organización y Parámetros del Libro
            </h2>
          </div>
          {savedSettingsSuccess && (
            <span className="inline-flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
              <Check className="w-3.5 h-3.5" />
              <span>Ajustes guardados correctamente</span>
            </span>
          )}
        </div>

        <form onSubmit={handleSaveSettings} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Nombre de la Organización / Movimiento
            </label>
            <input
              type="text"
              value={orgForm.nombreOrganizacion}
              onChange={(e) => setOrgForm({ ...orgForm, nombreOrganizacion: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-900 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Responsable de Tesorería / Administración
            </label>
            <input
              type="text"
              value={orgForm.responsableTesoreria}
              onChange={(e) => setOrgForm({ ...orgForm, responsableTesoreria: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Período Activo / Ejercicio Fiscal
            </label>
            <input
              type="text"
              value={orgForm.periodoActivo}
              onChange={(e) => setOrgForm({ ...orgForm, periodoActivo: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Moneda y Código
            </label>
            <input
              type="text"
              value={orgForm.moneda}
              onChange={(e) => setOrgForm({ ...orgForm, moneda: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-900"
              placeholder="ARS, USD, EUR..."
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Símbolo de Moneda
            </label>
            <input
              type="text"
              value={orgForm.simboloMoneda}
              onChange={(e) => setOrgForm({ ...orgForm, simboloMoneda: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-900"
              placeholder="$, €, US$..."
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Saldo Inicial en Caja / Banco ($)
            </label>
            <input
              type="number"
              value={orgForm.saldoInicialCaja}
              onChange={(e) => setOrgForm({ ...orgForm, saldoInicialCaja: Number(e.target.value) || 0 })}
              className="w-full px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-900 font-semibold"
            />
          </div>

          <div className="sm:col-span-2 lg:col-span-3 flex justify-end pt-2">
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              Guardar Ajustes de la Organización
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
