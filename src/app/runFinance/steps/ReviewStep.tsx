import { useFinanceForm } from "../../contexts/FinanceFormContext";
import { useFirebaseUserCategories } from "../../hooks/useFirebaseUserCategories";
import { FinanceReviewCard } from "../../components/FinanceReviewCard";
import { Loader } from "../../components/Loader";

export const ReviewStep = () => {
  const { formData, startDate, endDate } = useFinanceForm();
  const { userCategories, loading } = useFirebaseUserCategories();

  if (loading || !userCategories) {
    return (
      <div className="flex flex-col p-8 items-center">
        <span className="text-2xl font-bold mb-4">Step 5: Review Your Finances</span>
        <Loader />
      </div>
    );
  }

  const totalIncome = Object.values(formData.income).reduce((acc, val) => acc + (val || 0), 0);
  const totalExpenses = Object.values(formData.expenses).reduce((acc, val) => acc + (val || 0), 0);
  const totalBills = Object.values(formData.bills).reduce((acc, val) => acc + (val || 0), 0);
  const totalSavings = Object.values(formData.savings).reduce((acc, val) => acc + (val || 0), 0);
  const totalCreditCards = Object.values(formData.creditCards).reduce((acc, val) => acc + (val || 0), 0);

  const hasAnyData = totalIncome > 0 || totalExpenses > 0 || totalBills > 0 || totalSavings > 0 || totalCreditCards > 0;

  return (
    <div className="flex flex-col p-8">
      <div className="text-center mb-6">
        <span className="text-2xl font-bold">Step 5: Review Your Finances</span>
        <p className="text-gray-600 mt-2">
          Take a moment to review everything before submitting
        </p>
      </div>
      
      {!hasAnyData ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No financial data entered yet
          </h3>
          <p className="text-gray-500">
            Go back to the previous steps to enter your income, expenses, bills, and savings.
          </p>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto w-full">
          <FinanceReviewCard 
            formData={formData}
            userCategories={userCategories}
            startDate={startDate}
            endDate={endDate}
          />
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-3">
              <div className="text-blue-500 text-xl">💡</div>
              <div>
                <h4 className="font-medium text-blue-800 mb-1">Ready to submit?</h4>
                <p className="text-blue-700 text-sm">
                  Once you click submit, this financial snapshot will be saved for the period {' '}
                  <strong>{new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}</strong>.
                  You can always come back and add more entries for different time periods!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
