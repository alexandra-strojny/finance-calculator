
'use client';

import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';

export const Menu = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          {user && (
            <>
              <Link href="/finance" className="text-white hover:text-gray-300">Finance</Link>
              <Link href="/settings" className="text-white hover:text-gray-300">Settings</Link>
            </>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-300 text-sm">{user.email}</span>
              <button 
                onClick={handleSignOut}
                className="text-white hover:text-gray-300 bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link href="/login" className="text-white hover:text-gray-300">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}