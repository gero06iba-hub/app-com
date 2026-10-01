import React, { useState, useEffect } from 'react';
import { IncomeTransaction, ExpenseTransaction } from '../types/treasury';
import { X, Check } from 'lucide-react';

interface TransactionModalProps {
  isOpen: boolean;
  type: 'income' | 'expense';
  editingItem: IncomeTransaction | ExpenseTransaction | null;
  incomeCategories: string[];
  expenseCategories: string[];
  paymentMethods: string[];
  currencySymbol: string;
  onClose: () => void;
  onSaveIncome: (income: IncomeTransaction) => void;
  onSaveExpense: (expense: ExpenseTransaction) => void;
}

export const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  type,
  editingItem,
  incomeCategories,
  expenseCategories,
  paymentMethods,
  currencySymbol,
  onClose,
  onSaveIncome,
  onSaveExpense,
}) => {
  const todayStr = new Date().toISOString().split('T')[0];

  // Form states
  const [fecha, setFecha] = useState(todayStr);
  const [fechaRegistro, setFechaRegistro] = useState(todayStr);
  const [emisor, setEmisor] = useState('');
  const [comprobante, setComprobante] = useState('');
  const [destinatario, setDestinatario] = useState('');
  const [concepto, setConcepto] = useState('');
  const [categoria, setCategoria] = useState('');
  const [metodoPago, setMetodoPago] = useState('');
  const [monto, setMonto] = useState<number | ''>('');
  const [observaciones, setObservaciones] = useState('');

  // Synchronize on open or change of editingItem
  useEffect(() => {
    if (editingItem) {
      setFecha(editingItem.fecha || todayStr);
      setConcepto(editingItem.concepto || '');
      setCategoria(editingItem.categoria || '');
      setMetodoPago(editingItem.metodoPago || '');
      setMonto(editingItem.monto || '');
      setObservaciones(editingItem.observaciones || '');

      if ('emisor' in editingItem) {
        setFechaRegistro(editingItem.fechaRegistro || todayStr);
        setEmisor(editingItem.emisor || '');
      } else {
        setComprobante(editingItem.comprobante || '');
        setDestinatario(editingItem.destinatario || '');
      }
    } else {
      // Defaults for new
      setFecha(todayStr);
      setFechaRegistro(todayStr);
      setEmisor('');
      setComprobante(`REC-${Math.floor(1000 + Math.random() * 9000)}`);
      setDestinatario('');
      setConcepto('');
      setCategoria(type === 'income' ? (incomeCategories[0] || '') : (expenseCategories[0] || ''));
      setMetodoPago(paymentMethods[0] || '');
      setMonto('');
      setObservaciones('');
    }
  }, [editingItem, type, isOpen, incomeCategories, expenseCategories, paymentMethods]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!monto || Number(monto) <= 0) return;

    if (type === 'income') {
      const incomeData: IncomeTransaction = {
        id: editingItem ? editingItem.id : `inc-${Date.now()}`,
        fecha,
        fechaRegistro,
        emisor: emisor.trim() || 'Anónimo / Aportante',
        concepto: concepto.trim() || 'Ingreso general',
        categoria: categoria || incomeCategories[0] || 'General',
        metodoPago: metodoPago || paymentMethods[0] || 'Efectivo',
        monto: Number(monto),
        observaciones: observaciones.trim(),
      };
      onSaveIncome(incomeData);
    } else {
      const expenseData: ExpenseTransaction = {
        id: editingItem ? editingItem.id : `exp-${Date.now()}`,
        fecha,
        comprobante: comprobante.trim() || 'S/N',
        destinatario: destinatario.trim() || 'Proveedor General',
        concepto: concepto.trim() || 'Gasto operativo',
        categoria: categoria || expenseCategories[0] || 'General',
        metodoPago: metodoPago || paymentMethods[0] || 'Efectivo',
        monto: Number(monto),
        observaciones: observaciones.trim(),
      };
      onSaveExpense(expenseData);
    }

    onClose();
  };

  const isIncome = type === 'income';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className={`p-4 border-b flex items-center justify-between ${
          isIncome ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'
        }`}>
          <div>
            <span className={`text-[10px] font-bold uppercase tracking-wider ${
              isIncome ? 'text-emerald-700' : 'text-rose-700'
            }`}>
              {isIncome ? 'Libro de Ingresos' : 'Libro de Gastos'}
            </span>
            <h2 className="text-base font-bold text-slate-900">
              {editingItem
                ? `Editar ${isIncome ? 'Ingreso' : 'Gasto'}`
                : `Registrar Nuevo ${isIncome ? 'Ingreso' : 'Gasto'}`}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Fecha de la Operación *
              </label>
              <input
                type="date"
                required
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 text-slate-800"
              />
            </div>

            {isIncome ? (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Fecha de Registro en Tesorería
                </label>
                <input
                  type="date"
                  value={fechaRegistro}
                  onChange={(e) => setFechaRegistro(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 text-slate-800"
                />
              </div>
            ) : (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  N° Comprobante / Factura *
                </label>
                <input
                  type="text"
                  required
                  placeholder="FAC-0012, REC-049..."
                  value={comprobante}
                  onChange={(e) => setComprobante(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 text-slate-800 font-mono"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {isIncome ? 'Nombre / Emisor (de quién se recibe) *' : 'Proveedor / Destinatario *'}
            </label>
            <input
              type="text"
              required
              placeholder={isIncome ? 'Ej. Familia Gómez, Miembros Juveniles, Donante...' : 'Ej. Distribuidora Central, Imprenta San José...'}
              value={isIncome ? emisor : destinatario}
              onChange={(e) => isIncome ? setEmisor(e.target.value) : setDestinatario(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 text-slate-800 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Concepto / Motivo Detallado *
            </label>
            <input
              type="text"
              required
              placeholder={isIncome ? 'Ej. Cuota mensual retiro, donación voluntaria...' : 'Ej. Compra de víveres para comedor, insumos de papelería...'}
              value={concepto}
              onChange={(e) => setConcepto(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 text-slate-800"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Categoría (Lista Validación) *
              </label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 text-slate-800 cursor-pointer font-medium"
              >
                {(isIncome ? incomeCategories : expenseCategories).map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Método de Pago *
              </label>
              <select
                value={metodoPago}
                onChange={(e) => setMetodoPago(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 text-slate-800 cursor-pointer"
              >
                {paymentMethods.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Monto ({currencySymbol}) *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-xs font-mono font-bold text-slate-400">
                {currencySymbol}
              </span>
              <input
                type="number"
                step="0.01"
                min="0.01"
                required
                placeholder="0.00"
                value={monto}
                onChange={(e) => setMonto(e.target.value === '' ? '' : parseFloat(e.target.value))}
                className="w-full pl-8 pr-3 py-2 text-sm font-mono font-bold bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Observaciones / N° Transacción Bancaria
            </label>
            <textarea
              rows={2}
              placeholder="Detalles adicionales, referencias bancarias, notas de tesorería..."
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 text-slate-800"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white rounded-lg transition-colors cursor-pointer ${
                isIncome ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>Guardar Registro</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
