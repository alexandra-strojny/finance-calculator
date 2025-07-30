'use client';

import { useState } from "react";
import { BillsStep, SavingsStep, ExpensesStep, IncomeStep, ReviewStep } from "./steps";
import { useFirebaseUserCategories } from "../hooks/useFirebaseUserCategories";
import { Loader } from "../components/Loader";
import { FinanceFormProvider, useFinanceForm } from "../contexts/FinanceFormContext";
import { FinancesHeader } from "./FinancesHeader";
import { useFirebaseFinanceEntries } from "../hooks/useFirebaseFinanceEntries";


const RunFinanceContent = () => {
  const context = useFinanceForm();
  const { addFinanceEntry } = useFirebaseFinanceEntries();
  const { isInitialized, formData } = context;
  const [step, setStep] = useState(0);

  const steps = [
    { title: "Income", component: <IncomeStep /> },
    { title: "Expenses",  component: <ExpensesStep /> },
    { title: "Bills", key: 'bills', component: <BillsStep /> },
    { title: "Savings", key: 'savings', component: <SavingsStep /> },
    { title: "Review", component: <ReviewStep /> }
  ];

  if (!isInitialized) {
    return (
    <div className="flex flex-col items-center min-h-screen p-8 gap-4">
      <span className="text-2xl font-bold">Let&apos;s run finances!</span>
      <div className="bg-white shadow-md rounded-lg p-6 w-3/4 flex items-center justify-center">
        <Loader />
      </div>
    </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center min-h-screen p-8 gap-4">
      {step !== steps.length - 1 && <FinancesHeader />}
      <div className="bg-white shadow-md rounded-lg w-full">
        {
          steps[step].component
        }
      </div>
      <div className="flex gap-8 max-w-md mt-8">
        <button 
          className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
          disabled={step === 0}
          onClick={() => setStep(step - 1)}
        >
          Prev
        </button>
        {
          step === steps.length - 1 ? (
            <button 
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => alert("Finances submitted!")}
            >
              Submit
            </button>
          ) : (
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setStep(step + 1)}
            >
              Next
            </button>
          )
        }
      </div>
    </div>
  );
};

const RunFinanceFlow = () => {
  const { userCategories, loading } = useFirebaseUserCategories();

  return (
    <FinanceFormProvider userCategories={!loading ? userCategories : undefined}>
      <RunFinanceContent />
    </FinanceFormProvider>
  );
}

export default RunFinanceFlow;