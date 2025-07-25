
import Link from 'next/link';

export const Menu = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link href="/" className="text-white hover:text-gray-300">Home</Link>
        </li>
        <li>
          <Link href="/finance" className="text-white hover:text-gray-300">Finance</Link>
        </li>
        <li>
          <Link href="/login" className="text-white hover:text-gray-300">Login</Link>
        </li>
        <li>
          <Link href="/settings" className="text-white hover:text-gray-300">Settings</Link>
        </li>
      </ul>
    </nav>
  );
}