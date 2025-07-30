
import { useFinanceForm } from "../../contexts/FinanceFormContext";
import { CurrencyInput } from "../../components/CurrencyInput";

export const BillsStep = () => {
  const { formData, updateCategoryValue } = useFinanceForm();
  const billCategories = formData.bills;

  if (!billCategories || Object.keys(billCategories).length === 0) {
    return (
      <div className="flex flex-col p-8">
        <span className="text-2xl font-bold">No bill categories available.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-8">
      <span className="text-2xl font-bold mb-4 text-center">Step 3: Enter Bills</span>
      <div className="flex flex-col w-full items-center justify-center mt-4 space-y-4">
        {Object.keys(billCategories).length > 0 && (
            Object.entries(billCategories).map(([category, value], index) => (
              <div key={index} className="flex items-center text-gray-800 gap-4 w-full max-w-md">
                <span className="font-semibold w-1/3 text-right">{category}</span>
                <CurrencyInput
                  value={value || 0}
                  onChange={(value) => updateCategoryValue('bills', category, value)}
                  placeholder={`Enter amount for ${category}`}
                />
              </div>
            ))
        )}
      </div>
    </div>
  );
};
