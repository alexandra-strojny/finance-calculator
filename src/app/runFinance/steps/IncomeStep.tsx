
import { useFinanceForm } from "../../contexts/FinanceFormContext";
import { CurrencyInput } from "../../components/CurrencyInput";

export const IncomeStep = () => {
  const { formData, updateCategoryValue } = useFinanceForm();
  const incomeCategories = formData.income;

  if (!incomeCategories || Object.keys(incomeCategories).length === 0) {
    return (
      <div className="flex flex-col p-8">
        <span className="text-2xl font-bold">No income categories available.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-8">
      <span className="text-2xl font-bold text-center">Step 1: Enter Income</span>
      <div className="flex flex-col w-full items-center justify-center mt-4 space-y-4">
        {incomeCategories && Object.keys(incomeCategories).length > 0 && (
            Object.entries(incomeCategories).map(([category, value], index) => (
              <div key={index} className="flex items-center text-gray-800 gap-4 w-full max-w-md">
                <span className="font-semibold w-1/3 text-right">{category}</span>
                <CurrencyInput
                  value={value || 0}
                  onChange={(value) => updateCategoryValue('income', category, value)}
                  placeholder={`Enter amount for ${category}`}
                />
              </div>
            ))
        )}
      </div>
    </div>
  );
}