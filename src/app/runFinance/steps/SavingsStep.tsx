
import { useFinanceForm } from "../../contexts/FinanceFormContext";
import { CurrencyInput } from "../../components/CurrencyInput";

export const SavingsStep = () => {
  const { formData, updateCategoryValue } = useFinanceForm();
  const savingsCategories = formData.savings;

  if (!savingsCategories || Object.keys(savingsCategories).length === 0) {
    return (
      <div className="flex flex-col p-8">
        <span className="text-2xl font-bold">No savings categories available.</span>
      </div>
    );
  }

  const totalIncome = Object.values(formData.income).reduce((acc, val) => acc + (val || 0), 0);
  const totalExpenses = Object.values(formData.expenses).reduce((acc, val) => acc + (val || 0), 0);
  const totalBills = Object.values(formData.bills).reduce((acc, val) => acc + (val || 0), 0);
  const totalSavings = Object.values(formData.savings).reduce((acc, val) => acc + (val || 0), 0);
  const totalCreditCards = Object.values(formData.creditCards).reduce((acc, val) => acc + (val || 0), 0);

  const totalSavingsToAllocate = totalIncome - (totalExpenses + totalBills + totalCreditCards + totalSavings);

  const savingsClassName = totalSavingsToAllocate === 0 ? "text-blue-500" : totalSavingsToAllocate < 0 ? "text-red-500" : "text-green-500";

  return (
    <div className="flex flex-col p-8">
      <span className="text-2xl font-bold mb-4 text-center">Step 4: Enter Savings</span>
      <div className="flex gap-1 mb-4 w-full justify-center">
        <span className="text-gray-700">
          You have
        </span>
        <span className={`${savingsClassName}`}>${totalSavingsToAllocate.toFixed(2)}
        </span>
        <span className="text-gray-700">
          available to allocate to your savings categories.
        </span>
      </div>
      <div className="flex flex-col w-full items-center justify-center mt-4 space-y-4">
        {Object.keys(savingsCategories).length > 0 && (
            Object.entries(savingsCategories).map(([category, value], index) => (
              <div key={index} className="flex items-center text-gray-800 gap-4 w-full max-w-md">
                <span className="font-semibold w-1/3 text-right">{category}</span>
                <CurrencyInput
                  value={value || 0}
                  onChange={(value) => updateCategoryValue('savings', category, value)}
                  placeholder={`Enter amount for ${category}`}
                />
              </div>
            ))
        )}
        {
          totalSavingsToAllocate < 0 && (
            <span className="text-red-500 text-sm">Exceeds available savings</span>
          )
        }
      </div>
    </div>
  );
};
