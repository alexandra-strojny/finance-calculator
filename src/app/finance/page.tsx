'use client';

import { useRouter } from "next/navigation";
import { useQueryFinanceEntries } from "../hooks/useQueryFinanceEntries";
import { FinanceEntryCard } from "../components/FinanceEntryCard";

export default function Finance() {
  const financeEntries = useQueryFinanceEntries();
    const router = useRouter();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pb-10 sm:pb-4">
      <main className="flex flex-col gap-8 row-start-2 items-start w-full max-w-6xl">
        <div className="flex justify-between items-center w-full mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => router.push('/runFinance')}
          >
            Run Finances
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-8">
          {/* Summary Cards */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Total Balance</h3>
            <p className="text-3xl font-bold text-green-600">$12,345.67</p>
            <p className="text-sm text-gray-500 mt-1">+2.3% from last month</p>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Monthly Income</h3>
            <p className="text-3xl font-bold text-blue-600">$4,500.00</p>
            <p className="text-sm text-gray-500 mt-1">+5.2% from last month</p>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Monthly Expenses</h3>
            <p className="text-3xl font-bold text-red-600">$3,245.89</p>
            <p className="text-sm text-gray-500 mt-1">-1.8% from last month</p>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Savings</h3>
            <p className="text-3xl font-bold text-purple-600">$8,901.23</p>
            <p className="text-sm text-gray-500 mt-1">+12.5% from last month</p>
          </div>
        </div>

          {/* Recent Transactions */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full mb-8">
            <FinanceEntryCard financeEntry={financeEntries[0]} />
            <FinanceEntryCard financeEntry={financeEntries[1]} />
            <FinanceEntryCard financeEntry={financeEntries[2]} />
          </div>
          <button className="w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            View All Transactions
          </button>
         

          {/* Budget Overview */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Budget Overview</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Food & Dining</span>
                  <span className="text-sm text-gray-500">$450 / $600</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: '75%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Transportation</span>
                  <span className="text-sm text-gray-500">$280 / $300</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{width: '93%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Entertainment</span>
                  <span className="text-sm text-gray-500">$120 / $200</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '60%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Utilities</span>
                  <span className="text-sm text-gray-500">$340 / $400</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Shopping</span>
                  <span className="text-sm text-gray-500">$180 / $250</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{width: '72%'}}></div>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Manage Budget
            </button>
          </div>

        {/* Quick Actions */}
        <div className="bg-white shadow-md rounded-lg p-6 w-full">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline">
              Add Transaction
            </button>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline">
              Transfer Money
            </button>
            <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline">
              Investment
            </button>
            <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline">
              Generate Report
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
