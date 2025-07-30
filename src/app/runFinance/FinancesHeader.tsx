import { useState } from "react";
import { useFinanceForm } from "../contexts/FinanceFormContext";

export const FinancesHeader = () => {
  const context = useFinanceForm();
  const { formData } = context;

  // Calculate default dates
  const today = new Date();
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(today.getDate() - 14);

  const [startDate, setStartDate] = useState(twoWeeksAgo.toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(today.toISOString().split('T')[0]);

  const totalIncome = Object.values(formData.income).reduce((acc, val) => acc + (val || 0), 0);
  const totalExpenses = Object.values(formData.expenses).reduce((acc, val) => acc + (val || 0), 0);
  const totalBills = Object.values(formData.bills).reduce((acc, val) => acc + (val || 0), 0);
  const totalSavings = Object.values(formData.savings).reduce((acc, val) => acc + (val || 0), 0);
  const totalCreditCards = Object.values(formData.creditCards).reduce((acc, val) => acc + (val || 0), 0);

  return (
    <div className="w-full space-y-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-gray-800">Finance Overview</h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center gap-2">
              <label htmlFor="startDate" className="text-sm font-medium text-gray-600">From:</label>
              <input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="endDate" className="text-sm font-medium text-gray-600">To:</label>
              <input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 items-center mt-4">
        <div className="p-2 lg:col-span-1">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Total Income</h3>
          <p className="text-3xl font-bold text-green-600">${totalIncome.toFixed(2)}</p>
          <p className="text-sm text-gray-500 mt-1">+5.2% from last month</p>
        </div>
        
        <div className="hidden lg:block border-l border-gray-300 h-16 mx-auto"></div>
        
        <div className="p-2 lg:col-span-1">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Total Expenses</h3>
          <p className="text-3xl font-bold text-red-600">${(totalExpenses + totalCreditCards).toFixed(2)}</p>
          <p className="text-sm text-gray-500 mt-1">-1.8% from last month</p>
        </div>

        <div className="hidden lg:block border-l border-gray-300 h-16 mx-auto"></div>

        <div className="p-2 lg:col-span-1">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Total Bills</h3>
          <p className="text-3xl font-bold text-blue-600">${totalBills.toFixed(2)}</p>
          <p className="text-sm text-gray-500 mt-1">+2.3% from last month</p>
        </div>
        
        <div className="hidden lg:block border-l border-gray-300 h-16 mx-auto"></div>
        
        <div className="p-2 lg:col-span-1">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Total Savings</h3>
          <p className="text-3xl font-bold text-purple-600">${totalSavings.toFixed(2)}</p>
          <p className="text-sm text-gray-500 mt-1">+12.5% from last month</p>
        </div>
      </div>
      </div>
    </div>
  );
}