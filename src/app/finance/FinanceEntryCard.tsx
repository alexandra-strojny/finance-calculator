import { FinanceEntry } from "../types/financeEntry";
import { useQueryUserCategories } from "../hooks/useQueryUserCategories";


export const FinanceEntryCard = (props: { financeEntry: FinanceEntry }) => {
  const userCategories = useQueryUserCategories();

  if (!props.financeEntry) {
    return <div className="text-gray-500">No finance entries found.</div>;
  }

  const startDate = new Date(props.financeEntry.startDate);
  const endDate = new Date(props.financeEntry.endDate);
  
  // Check if the date span crosses New Year (different years)
  const crossesNewYear = startDate.getFullYear() !== endDate.getFullYear();
  
  const formatOptions: Intl.DateTimeFormatOptions = crossesNewYear 
    ? { month: 'short', day: 'numeric', year: 'numeric' }
    : { month: 'short', day: 'numeric' };
  
  const formattedStartDate = startDate.toLocaleDateString('en-US', formatOptions);
  const formattedEndDate = endDate.toLocaleDateString('en-US', formatOptions);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">{formattedStartDate} - {formattedEndDate}</h2>

      <div className="py-4">
        <p className="font-medium">Income</p>
        <div className="border-b mb-2">
        {
          userCategories.income.map((subCategory) => (
            <div key={subCategory} className="flex justify-between items-center">
              <p className="text-sm text-gray-500">{subCategory}</p>
              <p className="text-green-600 font-semibold">
                ${props.financeEntry.income[subCategory]?.amount.toFixed(2) || '0.00'}
              </p>
            </div>
          ))
        }
        </div>
        <p className="text-sm text-gray-500">Total Income</p>
        <p className="text-green-600 font-semibold">
          ${Object.values(props.financeEntry.income).reduce((acc, curr) => acc + (curr?.amount || 0), 0).toFixed(2)}
        </p>
      </div>

       <div className="py-4">
        <p className="font-medium">Expenses</p>
        <div className="border-b mb-2">
        {
          userCategories.expenses.map((subCategory) => (
            <div key={subCategory} className="flex justify-between items-center">
              <p className="text-sm text-gray-500">{subCategory}</p>
              <p className="text-orange-600 font-semibold">
                ${props.financeEntry.expenses[subCategory]?.amount.toFixed(2) || '0.00'}
              </p>
            </div>
          ))
        }
        </div>
        <p className="text-sm text-gray-500">Total Credit Cards</p>
        <p className="text-orange-600 font-semibold">
          ${Object.values(props.financeEntry.expenses).reduce((acc, curr) => acc + (curr?.amount || 0), 0).toFixed(2)}
        </p>
      </div>

       <div className="py-4">
        <p className="font-medium">Bills</p>
        <div className="border-b mb-2">
        {
          userCategories.bills.map((subCategory) => (
            <div key={subCategory} className="flex justify-between items-center">
              <p className="text-sm text-gray-500">{subCategory}</p>
              <p className="text-red-600 font-semibold">
                ${props.financeEntry.bills[subCategory]?.amount.toFixed(2) || '0.00'}
              </p>
            </div>
          ))
        }
        </div>
        <p className="text-sm text-gray-500">Total Bills</p>
        <p className="text-red-600 font-semibold">
          ${Object.values(props.financeEntry.bills).reduce((acc, curr) => acc + (curr?.amount || 0), 0).toFixed(2)}
        </p>
      </div>

      <div className="py-4">
        <p className="font-medium">Savings</p>
        <div className="border-b mb-2">
        {
          userCategories.savings.map((subCategory) => (
            <div key={subCategory} className="flex justify-between items-center">
              <p className="text-sm text-gray-500">{subCategory}</p>
              <p className="text-blue-600 font-semibold">
                ${props.financeEntry.savings[subCategory]?.amount.toFixed(2) || '0.00'}
              </p>
            </div>
          ))
        }
        </div>
        <p className="text-sm text-gray-500">Total Savings</p>
        <p className="text-blue-600 font-semibold">
          ${Object.values(props.financeEntry.savings).reduce((acc, curr) => acc + (curr?.amount || 0), 0).toFixed(2)}
        </p>
      </div>
    </div>
  );
};
