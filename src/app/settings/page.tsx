'use client';

import { CategoriesCard } from "./CategoriesCard";

export default function Settings() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pb-10 sm:pb-4">
      <main className="flex flex-col gap-8 row-start-2 items-start w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-4">Settings</h1>
        <div className="bg-white shadow-md rounded-lg p-6 w-full">
          <CategoriesCard />
        </div>
      </main>
    </div>
  );
}
