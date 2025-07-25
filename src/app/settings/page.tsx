export default function Settings() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-start w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>
        
        <div className="grid gap-8 w-full">
          {/* Profile Settings */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
            <div className="grid gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Display Name
                </label>
                <input 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  type="text" 
                  placeholder="Your display name"
                  defaultValue="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  type="email" 
                  placeholder="your.email@example.com"
                  defaultValue="john.doe@example.com"
                />
              </div>
            </div>
          </div>

          {/* Finance Settings */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Finance Settings</h2>
            <div className="grid gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Default Currency
                </label>
                <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="JPY">JPY - Japanese Yen</option>
                </select>
              </div>
              
              <div className="flex items-center">
                <input 
                  id="notifications" 
                  type="checkbox" 
                  className="mr-2"
                  defaultChecked
                />
                <label htmlFor="notifications" className="text-gray-700 text-sm">
                  Enable budget notifications
                </label>
              </div>
              
              <div className="flex items-center">
                <input 
                  id="monthly-reports" 
                  type="checkbox" 
                  className="mr-2"
                />
                <label htmlFor="monthly-reports" className="text-gray-700 text-sm">
                  Receive monthly financial reports
                </label>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
            <div className="grid gap-4">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-fit">
                Change Password
              </button>
              
              <div className="flex items-center">
                <input 
                  id="two-factor" 
                  type="checkbox" 
                  className="mr-2"
                />
                <label htmlFor="two-factor" className="text-gray-700 text-sm">
                  Enable two-factor authentication
                </label>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-4">
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Cancel
            </button>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Save Changes
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
