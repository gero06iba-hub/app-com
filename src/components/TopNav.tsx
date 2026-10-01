import React from 'react';
import { ActiveTab } from '../types/treasury';
import { Download, Plus } from 'lucide-react';

interface TopNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenNewTransaction: (type: 'income' | 'expense') => void;
  onExportExcel: () => void;
  orgName: string;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenNewTransaction,
  onExportExcel,
  orgName,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center">
            <button
              onClick={() => setActiveTab('resumen')}
              className="text-left text-lg font-bold tracking-tight text-slate-900 hover:text-emerald-700 transition-colors cursor-pointer"
            >
              {orgName || 'Movimiento Consolación'}
            </button>
          </div>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <button
              onClick={() => setActiveTab('resumen')}
              className={`px-3 py-2 text-sm font-medium transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'resumen'
                  ? 'border-emerald-600 text-emerald-800 font-semibold'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              Resumen General
            </button>
            <button
              onClick={() => setActiveTab('ingresos')}
              className={`px-3 py-2 text-sm font-medium transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'ingresos'
                  ? 'border-emerald-600 text-emerald-800 font-semibold'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              Ingresos
            </button>
            <button
              onClick={() => setActiveTab('gastos')}
              className={`px-3 py-2 text-sm font-medium transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'gastos'
                  ? 'border-emerald-600 text-emerald-800 font-semibold'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              Gastos
            </button>
            <button
              onClick={() => setActiveTab('categorias')}
              className={`px-3 py-2 text-sm font-medium transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'categorias'
                  ? 'border-emerald-600 text-emerald-800 font-semibold'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              Categorías y Ajustes
            </button>
            <button
              onClick={() => setActiveTab('guia-excel')}
              className={`px-3 py-2 text-sm font-medium transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'guia-excel'
                  ? 'border-emerald-600 text-emerald-800 font-semibold'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              Guía Fórmulas Excel
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onExportExcel}
              title="Descargar libro completo en formato .xlsx con 4 pestañas y fórmulas vinculadas"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5 text-emerald-700" />
              <span>Descargar Excel (.xlsx)</span>
            </button>
            
            <div className="relative group">
              <button
                onClick={() => onOpenNewTransaction('income')}
                className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Registrar</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="md:hidden flex items-center overflow-x-auto py-2 border-t border-slate-100 gap-1 text-xs">
          <button
            onClick={() => setActiveTab('resumen')}
            className={`px-2.5 py-1 rounded font-medium whitespace-nowrap ${
              activeTab === 'resumen' ? 'bg-emerald-100 text-emerald-900' : 'text-slate-600'
            }`}
          >
            Resumen
          </button>
          <button
            onClick={() => setActiveTab('ingresos')}
            className={`px-2.5 py-1 rounded font-medium whitespace-nowrap ${
              activeTab === 'ingresos' ? 'bg-emerald-100 text-emerald-900' : 'text-slate-600'
            }`}
          >
            Ingresos
          </button>
          <button
            onClick={() => setActiveTab('gastos')}
            className={`px-2.5 py-1 rounded font-medium whitespace-nowrap ${
              activeTab === 'gastos' ? 'bg-emerald-100 text-emerald-900' : 'text-slate-600'
            }`}
          >
            Gastos
          </button>
          <button
            onClick={() => setActiveTab('categorias')}
            className={`px-2.5 py-1 rounded font-medium whitespace-nowrap ${
              activeTab === 'categorias' ? 'bg-emerald-100 text-emerald-900' : 'text-slate-600'
            }`}
          >
            Ajustes
          </button>
          <button
            onClick={() => setActiveTab('guia-excel')}
            className={`px-2.5 py-1 rounded font-medium whitespace-nowrap ${
              activeTab === 'guia-excel' ? 'bg-emerald-100 text-emerald-900' : 'text-slate-600'
            }`}
          >
            Guía Excel
          </button>
        </div>
      </div>
    </header>
  );
};
