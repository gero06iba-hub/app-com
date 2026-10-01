import React, { useState, useMemo } from 'react';
import { IncomeTransaction } from '../types/treasury';
import {
  Search,
  Plus,
  Trash2,
  Edit2,
  FileSpreadsheet,
} from 'lucide-react';

interface IncomeTableViewProps {
  incomes: IncomeTransaction[];
  incomeCategories: string[];
  paymentMethods: string[];
  currencySymbol: string;
  onAddIncome: () => void;
  onEditIncome: (income: IncomeTransaction) => void;
  onDeleteIncome: (id: string) => void;
}

export const IncomeTableView: React.FC<IncomeTableViewProps> = ({
  incomes,
  incomeCategories,
  paymentMethods,
  currencySymbol,
  onAddIncome,
  onEditIncome,
  onDeleteIncome,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('all');

  // Filtered dataset
  const filteredIncomes = useMemo(() => {
    return incomes.filter((item) => {
      const matchSearch =
        searchTerm === '' ||
        item.emisor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.concepto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.observaciones.toLowerCase().includes(searchTerm.toLowerCase());

      const matchCategory =
        selectedCategory === 'all' || item.categoria === selectedCategory;

      const matchMethod =
        selectedPaymentMethod === 'all' || item.metodoPago === selectedPaymentMethod;

      return matchSearch && matchCategory && matchMethod;
    });
  }, [incomes, searchTerm, selectedCategory, selectedPaymentMethod]);

  const totalFilteredMonto = useMemo(() => {
    return filteredIncomes.reduce((acc, curr) => acc + (Number(curr.monto) || 0), 0);
  }, [filteredIncomes]);

  const formatCurrency = (val: number) => {
    return `${currencySymbol} ${Number(val || 0).toLocaleString('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Header and Filter bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span>Pestaña 'Ingresos'</span>
              <span aria-hidden="true">·</span>
              <span>Tabla Estructurada Oficial</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-emerald-700 font-semibold">{incomes.length} registros totales</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Libro Diario de Ingresos y Recaudaciones
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onAddIncome}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer shadow-xs whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Nuevo Ingreso</span>
            </button>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar por emisor, concepto u observación..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white text-slate-900"
            />
          </div>

          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-800 cursor-pointer"
            >
              <option value="all">Todas las Categorías</option>
              {incomeCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedPaymentMethod}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-800 cursor-pointer"
            >
              <option value="all">Todos los Métodos de Pago</option>
              {paymentMethods.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-100/80 text-slate-700 font-semibold border-b border-slate-200 select-none">
              <tr>
                <th className="py-3 px-3.5 whitespace-nowrap">Fecha</th>
                <th className="py-3 px-3.5 whitespace-nowrap">Fecha Registro</th>
                <th className="py-3 px-3.5 whitespace-nowrap">Nombre / Emisor</th>
                <th className="py-3 px-3.5 whitespace-nowrap">Concepto / Motivo</th>
                <th className="py-3 px-3.5 whitespace-nowrap">Categoría</th>
                <th className="py-3 px-3.5 whitespace-nowrap">Método de Pago</th>
                <th className="py-3 px-3.5 text-right whitespace-nowrap">Monto ($)</th>
                <th className="py-3 px-3.5 whitespace-nowrap">Observaciones</th>
                <th className="py-3 px-3 text-center whitespace-nowrap">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredIncomes.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    <FileSpreadsheet className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                    <p className="font-medium text-slate-600">No se encontraron ingresos con los filtros seleccionados</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Intenta cambiar los términos de búsqueda o registra uno nuevo.</p>
                  </td>
                </tr>
              ) : (
                filteredIncomes.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="py-2.5 px-3.5 font-mono text-slate-600 whitespace-nowrap">
                      {item.fecha}
                    </td>
                    <td className="py-2.5 px-3.5 font-mono text-slate-500 whitespace-nowrap">
                      {item.fechaRegistro}
                    </td>
                    <td className="py-2.5 px-3.5 font-semibold text-slate-900 whitespace-nowrap max-w-xs truncate">
                      {item.emisor}
                    </td>
                    <td className="py-2.5 px-3.5 text-slate-700 max-w-sm truncate" title={item.concepto}>
                      {item.concepto}
                    </td>
                    <td className="py-2.5 px-3.5 text-slate-600 whitespace-nowrap">
                      {item.categoria}
                    </td>
                    <td className="py-2.5 px-3.5 text-slate-600 whitespace-nowrap">
                      {item.metodoPago}
                    </td>
                    <td className="py-2.5 px-3.5 text-right font-mono font-bold text-emerald-700 whitespace-nowrap">
                      {formatCurrency(item.monto)}
                    </td>
                    <td className="py-2.5 px-3.5 text-slate-500 max-w-xs truncate" title={item.observaciones}>
                      {item.observaciones || '—'}
                    </td>
                    <td className="py-2.5 px-3 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1 opacity-80 group-hover:opacity-100">
                        <button
                          onClick={() => onEditIncome(item)}
                          className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors cursor-pointer"
                          title="Editar ingreso"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteIncome(item.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                          title="Eliminar ingreso"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            {filteredIncomes.length > 0 && (
              <tfoot className="bg-slate-50 border-t-2 border-slate-200 font-semibold text-slate-900">
                <tr>
                  <td colSpan={6} className="py-3 px-3.5 text-right font-medium text-slate-600">
                    Total Ingresos Filtrados ({filteredIncomes.length} filas):
                  </td>
                  <td className="py-3 px-3.5 text-right font-mono text-sm font-bold text-emerald-700 whitespace-nowrap">
                    {formatCurrency(totalFilteredMonto)}
                  </td>
                  <td colSpan={2} className="py-3 px-3.5 text-slate-400 font-mono text-[11px]">
                    =SUMA(G2:G{filteredIncomes.length + 1})
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};
