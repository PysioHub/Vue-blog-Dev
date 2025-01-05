'use client';

import { useState } from 'react';
import Link from 'next/link';
import { navbar } from '@/config/navbar';
import type { NavItem } from '@/config/navbar';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleDropdown = (text: string) => {
    setActiveDropdown(activeDropdown === text ? null : text);
  };

  return (
    <nav className="sticky top-0 z-40 w-full backdrop-blur border-b border-slate-50/[0.06] bg-white/75 dark:bg-black/75 transition-colors duration-500">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3">
          <span className="self-center text-xl font-semibold whitespace-nowrap"> Pysio&apos;s Home</span>
        </Link>
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto transition-all duration-300`}>
          <ul className="flex flex-col md:flex-row md:space-x-8 md:mt-0 md:border-0">
            {navbar.map((navItem: NavItem) => (
              <li key={navItem.text} className="relative">
                {navItem.children ? (
                  <div>
                    <button
                      onClick={() => handleDropdown(navItem.text)}
                      className="flex items-center justify-between w-full py-2 px-3 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {navItem.text}
                      <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                        <path 
                          fillRule="evenodd" 
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                    </button>
                    {activeDropdown === navItem.text && navItem.children && (
                      <div className="md:absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                        {navItem.children.map((child) => (
                          <Link
                            key={child.text}
                            href={child.link || '#'}
                            className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            {child.text}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={navItem.link || '#'}
                    className="block py-2 px-3 hover:text-blue-600 dark:hover:text-blue-400"
                    target={navItem.link?.startsWith('http') ? '_blank' : undefined}
                  >
                    {navItem.text}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
