import React, { useState, useEffect } from 'react';
import {
  IncomeTransaction,
  ExpenseTransaction,
  OrganizationSettings,
  ActiveTab,
} from './types/treasury';
import {
  INITIAL_INCOMES,
  INITIAL_EXPENSES,
  INITIAL_INCOME_CATEGORIES,
  INITIAL_EXPENSE_CATEGORIES,
  INITIAL_PAYMENT_METHODS,
  INITIAL_SETTINGS,
} from './data/initialData';
import { exportTreasuryToExcel } from './utils/excelExporter';
import { TopNav } from './components/TopNav';
import { DashboardView } from './components/DashboardView';
import { IncomeTableView } from './components/IncomeTableView';
import { ExpenseTableView } from './components/ExpenseTableView';
import { SettingsCategoriesView } from './components/SettingsCategoriesView';
import { ExcelGuideView } from './components/ExcelGuideView';
import { TransactionModal } from './components/TransactionModal';
import { Check, Info } from 'lucide-react';

export default function App() {
  // LocalStorage state initialization
  const [activeTab, setActiveTab] = useState<ActiveTab>('resumen');

  const [incomes, setIncomes] = useState<IncomeTransaction[]>(() => {
    const saved = localStorage.getItem('consolacion_incomes');
    return saved ? JSON.parse(saved) : INITIAL_INCOMES;
  });

  const [expenses, setExpenses] = useState<ExpenseTransaction[]>(() => {
    const saved = localStorage.getItem('consolacion_expenses');
    return saved ? JSON.parse(saved) : INITIAL_EXPENSES;
  });

  const [incomeCategories, setIncomeCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem('consolacion_income_categories');
    return saved ? JSON.parse(saved) : INITIAL_INCOME_CATEGORIES;
  });

  const [expenseCategories, setExpenseCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem('consolacion_expense_categories');
    return saved ? JSON.parse(saved) : INITIAL_EXPENSE_CATEGORIES;
  });

  const [paymentMethods, setPaymentMethods] = useState<string[]>(() => {
    const saved = localStorage.getItem('consolacion_payment_methods');
    return saved ? JSON.parse(saved) : INITIAL_PAYMENT_METHODS;
  });

  const [settings, setSettings] = useState<OrganizationSettings>(() => {
    const saved = localStorage.getItem('consolacion_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'income' | 'expense'>('income');
  const [editingItem, setEditingItem] = useState<IncomeTransaction | ExpenseTransaction | null>(null);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('consolacion_incomes', JSON.stringify(incomes));
  }, [incomes]);

  useEffect(() => {
    localStorage.setItem('consolacion_expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('consolacion_income_categories', JSON.stringify(incomeCategories));
  }, [incomeCategories]);

  useEffect(() => {
    localStorage.setItem('consolacion_expense_categories', JSON.stringify(expenseCategories));
  }, [expenseCategories]);

  useEffect(() => {
    localStorage.setItem('consolacion_payment_methods', JSON.stringify(paymentMethods));
  }, [paymentMethods]);

  useEffect(() => {
    localStorage.setItem('consolacion_settings', JSON.stringify(settings));
  }, [settings]);

  // Handlers for Income
  const handleAddIncomeClick = () => {
    setModalType('income');
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEditIncome = (income: IncomeTransaction) => {
    setModalType('income');
    setEditingItem(income);
    setIsModalOpen(true);
  };

  const handleDeleteIncome = (id: string) => {
    setIncomes((prev) => prev.filter((i) => i.id !== id));
    showToast('Ingreso eliminado correctamente');
  };

  const handleSaveIncome = (income: IncomeTransaction) => {
    if (editingItem) {
      setIncomes((prev) => prev.map((i) => (i.id === income.id ? income : i)));
      showToast('Ingreso actualizado con éxito');
    } else {
      setIncomes((prev) => [income, ...prev]);
      showToast('Nuevo ingreso registrado con éxito');
    }
  };

  // Handlers for Expense
  const handleAddExpenseClick = () => {
    setModalType('expense');
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEditExpense = (expense: ExpenseTransaction) => {
    setModalType('expense');
    setEditingItem(expense);
    setIsModalOpen(true);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
    showToast('Gasto eliminado correctamente');
  };

  const handleSaveExpense = (expense: ExpenseTransaction) => {
    if (editingItem) {
      setExpenses((prev) => prev.map((e) => (e.id === expense.id ? expense : e)));
      showToast('Gasto actualizado con éxito');
    } else {
      setExpenses((prev) => [expense, ...prev]);
      showToast('Nuevo comprobante de gasto registrado');
    }
  };

  // Open modal from TopNav
  const handleOpenNewTransaction = (type: 'income' | 'expense') => {
    setModalType(type);
    setEditingItem(null);
    setIsModalOpen(true);
  };

  // Reset to demo data
  const handleResetDemoData = () => {
    setIncomes(INITIAL_INCOMES);
    setExpenses(INITIAL_EXPENSES);
    setIncomeCategories(INITIAL_INCOME_CATEGORIES);
    setExpenseCategories(INITIAL_EXPENSE_CATEGORIES);
    setPaymentMethods(INITIAL_PAYMENT_METHODS);
    setSettings(INITIAL_SETTINGS);
    showToast('Datos de demostración restaurados');
  };

  // Export to Excel .xlsx
  const handleExportExcel = () => {
    exportTreasuryToExcel(
      incomes,
      expenses,
      incomeCategories,
      expenseCategories,
      paymentMethods,
      settings
    );
    showToast('Descargando archivo Excel (.xlsx) con 4 pestañas y fórmulas vinculadas');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Bar following Top Bar Contract */}
      <TopNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenNewTransaction={handleOpenNewTransaction}
        onExportExcel={handleExportExcel}
        orgName={settings.nombreOrganizacion}
      />

      {/* Main Workspace Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'resumen' && (
          <DashboardView
            incomes={incomes}
            expenses={expenses}
            incomeCategories={incomeCategories}
            expenseCategories={expenseCategories}
            settings={settings}
            onNavigateToGuide={() => setActiveTab('guia-excel')}
            onExportExcel={handleExportExcel}
            onNavigateToTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'ingresos' && (
          <IncomeTableView
            incomes={incomes}
            incomeCategories={incomeCategories}
            paymentMethods={paymentMethods}
            currencySymbol={settings.simboloMoneda || '$'}
            onAddIncome={handleAddIncomeClick}
            onEditIncome={handleEditIncome}
            onDeleteIncome={handleDeleteIncome}
          />
        )}

        {activeTab === 'gastos' && (
          <ExpenseTableView
            expenses={expenses}
            expenseCategories={expenseCategories}
            paymentMethods={paymentMethods}
            currencySymbol={settings.simboloMoneda || '$'}
            onAddExpense={handleAddExpenseClick}
            onEditExpense={handleEditExpense}
            onDeleteExpense={handleDeleteExpense}
          />
        )}

        {activeTab === 'categorias' && (
          <SettingsCategoriesView
            incomeCategories={incomeCategories}
            expenseCategories={expenseCategories}
            paymentMethods={paymentMethods}
            settings={settings}
            onUpdateIncomeCategories={setIncomeCategories}
            onUpdateExpenseCategories={setExpenseCategories}
            onUpdatePaymentMethods={setPaymentMethods}
            onUpdateSettings={setSettings}
            onResetDemoData={handleResetDemoData}
          />
        )}

        {activeTab === 'guia-excel' && (
          <ExcelGuideView onExportExcel={handleExportExcel} />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <div>
            <span>{settings.nombreOrganizacion}</span>
            <span className="mx-2">·</span>
            <span>Gestión de Tesorería &amp; Control Financiero</span>
            <span className="mx-2">·</span>
            <span>{settings.periodoActivo}</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('guia-excel')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Guía de Fórmulas
            </button>
            <button
              onClick={handleExportExcel}
              className="hover:text-emerald-700 transition-colors font-medium cursor-pointer"
            >
              Exportar .XLSX
            </button>
          </div>
        </div>
      </footer>

      {/* Transaction Modal (Income / Expense) */}
      <TransactionModal
        isOpen={isModalOpen}
        type={modalType}
        editingItem={editingItem}
        incomeCategories={incomeCategories}
        expenseCategories={expenseCategories}
        paymentMethods={paymentMethods}
        currencySymbol={settings.simboloMoneda || '$'}
        onClose={() => setIsModalOpen(false)}
        onSaveIncome={handleSaveIncome}
        onSaveExpense={handleSaveExpense}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-lg text-xs animate-in slide-in-from-bottom-2 fade-in duration-200">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
