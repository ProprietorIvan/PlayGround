import { useRouter } from "next/router";
import { useState } from "react";
import { Menu, X } from 'lucide-react';

const Navigation = ({ currentPage, showActions = true }: any) => {
  const { push } = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { text: 'Home', url: '/' },
    { text: 'New Repair Request', url: 'new-repair' },
    { text: 'Schedule Appointment', url: '' },
    { text: 'My Repairs', url: ''  },
    { text: 'Pricing', url: ''  },
  ];

  return (
    <nav className="border-b relative bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-black rounded-lg p-2">
              <span className="text-2xl text-white">A</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  push(link.url)
                }}
                className="text-gray-500 hover:text-gray-900 transition-colors"
              >
                {link.text}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {showActions ? (
              <>
                <span className="text-red-500">Admin</span>
                <img
                  src="/api/placeholder/40/40"
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
              </>
            ) : (
              <button 
                onClick={() => currentPage('dashboard')}
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Get Started
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b shadow-lg z-50">
            <div className="px-4 py-2 space-y-1">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    push(link.url)
                    setIsMenuOpen(false);
                  }}
                  className="block py-2 px-4 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {link.text}
                </a>
              ))}
              
              {/* Mobile Actions */}
              <div className="border-t mt-2 pt-2">
                {showActions ? (
                  <div className="flex items-center gap-4 px-4 py-2">
                    <span className="text-red-500">Admin</span>
                    <img
                      src="/api/placeholder/40/40"
                      alt="Profile"
                      className="w-10 h-10 rounded-full"
                    />
                  </div>
                ) : (
                  <button 
                    onClick={() => {
                      currentPage('dashboard');
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Get Started
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation