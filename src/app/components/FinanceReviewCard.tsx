import { FinanceFormData } from "../contexts/FinanceFormContext";
import { UserCategories } from "../types/userCategories";

interface FinanceReviewCardProps {
  formData: FinanceFormData;
  userCategories: UserCategories;
  startDate: string;
  endDate: string;
}

export const FinanceReviewCard = ({ formData, userCategories, startDate, endDate }: FinanceReviewCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  };

  const totalIncome = Object.values(formData.income).reduce((acc, val) => acc + (val || 0), 0);
  const totalExpenses = Object.values(formData.expenses).reduce((acc, val) => acc + (val || 0), 0);
  const totalBills = Object.values(formData.bills).reduce((acc, val) => acc + (val || 0), 0);
  const totalSavings = Object.values(formData.savings).reduce((acc, val) => acc + (val || 0), 0);
  const totalCreditCards = Object.values(formData.creditCards).reduce((acc, val) => acc + (val || 0), 0);

  const netAmount = totalIncome - (totalExpenses + totalBills + totalSavings + totalCreditCards);
  const netColor = netAmount >= 0 ? 'text-green-600' : 'text-red-600';

  return (
    <div className="">
      <div className="text-center mb-6">
        <p className="text-2xl font-semibold mb-2 text-gray-600">
          {formatDate(startDate)} - {formatDate(endDate)}
        </p>
      </div>

      {/* Net Summary Card */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6 text-center">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Net Amount</h3>
        <p className={`text-3xl font-bold ${netColor}`}>
          ${Math.abs(netAmount).toFixed(2)}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          {netAmount >= 0 ? '🎉 You have money left over!' : '⚠️ You\'re spending more than you earn'}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Income Section */}
        <div className="space-y-4">
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-semibold text-green-700 flex items-center gap-2">
              💰 Income
            </h3>
            <p className="text-2xl font-bold text-green-600">
              ${totalIncome.toFixed(2)}
            </p>
          </div>
          
          <div className="space-y-2">
            {userCategories.income.map((category) => (
              <div key={category} className="flex justify-between items-center text-sm">
                <span className="text-gray-600">{category}</span>
                <span className="font-medium">
                  ${(formData.income[category] || 0).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Expenses Section */}
        <div className="space-y-4">
          <div className="border-l-4 border-orange-500 pl-4">
            <h3 className="font-semibold text-orange-700 flex items-center gap-2">
              🛒 Expenses & Credit Cards
            </h3>
            <p className="text-2xl font-bold text-orange-600">
              ${(totalExpenses + totalCreditCards).toFixed(2)}
            </p>
          </div>
          
          <div className="space-y-2">
            {userCategories.expenses.map((category) => (
              <div key={category} className="flex justify-between items-center text-sm">
                <span className="text-gray-600">{category}</span>
                <span className="font-medium">
                  ${(formData.expenses[category] || 0).toFixed(2)}
                </span>
              </div>
            ))}
            {userCategories.creditCards.map((category) => (
              <div key={category} className="flex justify-between items-center text-sm">
                <span className="text-gray-600">{category} (CC)</span>
                <span className="font-medium">
                  ${(formData.creditCards[category] || 0).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bills Section */}
        <div className="space-y-4">
          <div className="border-l-4 border-red-500 pl-4">
            <h3 className="font-semibold text-red-700 flex items-center gap-2">
              📄 Bills
            </h3>
            <p className="text-2xl font-bold text-red-600">
              ${totalBills.toFixed(2)}
            </p>
          </div>
          
          <div className="space-y-2">
            {userCategories.bills.map((category) => (
              <div key={category} className="flex justify-between items-center text-sm">
                <span className="text-gray-600">{category}</span>
                <span className="font-medium">
                  ${(formData.bills[category] || 0).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Savings Section */}
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold text-blue-700 flex items-center gap-2">
              🏦 Savings
            </h3>
            <p className="text-2xl font-bold text-blue-600">
              ${totalSavings.toFixed(2)}
            </p>
          </div>
          
          <div className="space-y-2">
            {userCategories.savings.map((category) => (
              <div key={category} className="flex justify-between items-center text-sm">
                <span className="text-gray-600">{category}</span>
                <span className="font-medium">
                  ${(formData.savings[category] || 0).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-sm text-gray-500">Total Spending</p>
            <p className="font-semibold text-red-600">
              ${(totalExpenses + totalBills + totalCreditCards).toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Bills Rate</p>
            <p className="font-semibold text-purple-600">
              {totalIncome > 0 ? ((totalBills / totalIncome) * 100).toFixed(1) : 0}%
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Savings Rate</p>
            <p className="font-semibold text-blue-600">
              {totalIncome > 0 ? ((totalSavings / totalIncome) * 100).toFixed(1) : 0}%
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Credit Card Rate</p>
            <p className="font-semibold text-orange-600">
              {totalIncome > 0 ? ((totalCreditCards / totalIncome) * 100).toFixed(1) : 0}%
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
