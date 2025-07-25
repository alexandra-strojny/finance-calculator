export default function Login() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="max-w-md w-full">
          <h1 className="text-3xl font-bold text-center mb-8">Login</h1>
          
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="email" 
                type="email" 
                placeholder="Enter your email"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                id="password" 
                type="password" 
                placeholder="Enter your password"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                type="button"
              >
                Sign In
              </button>
              <a 
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" 
                href="#"
              >
                Forgot Password?
              </a>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Don&apos;t have an account? 
              <a href="#" className="text-blue-500 hover:text-blue-800 ml-1">Sign up</a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
