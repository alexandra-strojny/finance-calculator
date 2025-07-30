import { useFinanceForm } from "../../contexts/FinanceFormContext";
import { CurrencyInput } from "../../components/CurrencyInput";

export const ExpensesStep = () => {
  const { formData, updateCategoryValue } = useFinanceForm();
  const creditCardCategories = formData.creditCards;
  const expenseCategories = formData.expenses;
  const combinedCategories = { ...expenseCategories, ...creditCardCategories };

  if (!combinedCategories || Object.keys(combinedCategories).length === 0) {
    return (
      <div className="flex flex-col p-8">
        <span className="text-2xl font-bold">No expense or credit card categories available.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-8">
      <span className="text-2xl font-bold mb-4 text-center">Step 2: Enter Expenses and Credit Cards</span>
      <div className="flex flex-col w-full items-center justify-center mt-4 space-y-4">
        {Object.keys(combinedCategories).length > 0 && (
            Object.entries(combinedCategories).map(([category, value], index) => (
              <div key={index} className="flex items-center text-gray-800 gap-4 w-full max-w-md">
                <span className="font-semibold w-1/3 text-right">{category}</span>
                <CurrencyInput
                  value={value || 0}
                  onChange={(value) => {
                    if (category in creditCardCategories) {
                      updateCategoryValue('creditCards', category, value);
                    } else if (category in expenseCategories) {
                      updateCategoryValue('expenses', category, value);
                    }
                  }}
                  placeholder={`Enter amount for ${category}`}
                />
              </div>
            ))
        )}
      </div>
    </div>
  );
}