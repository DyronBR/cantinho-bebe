'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiInstagram, FiFacebook, FiMessageCircle } from 'react-icons/fi';

interface MobileMenuProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

export default function MobileMenu({ searchQuery, setSearchQuery, handleSearch }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const menuItems = [
    { label: 'Início', href: '/' },
    { label: 'Produtos', href: '#products' },
    { label: 'Categorias', href: '/categorias' },
    { label: 'Contato', href: '/contato' },
  ];

  return (
    <>
      {/* Botão Hamburger */}
      <button
        onClick={toggleMenu}
        className="md:hidden flex flex-col space-y-1.5 cursor-pointer z-50"
        aria-label="Menu"
      >
        <span
          className={`block w-6 h-0.5 bg-gray-900 transition-all duration-300 ${
            isOpen ? 'rotate-45 translate-y-2' : ''
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-gray-900 transition-all duration-300 ${
            isOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-gray-900 transition-all duration-300 ${
            isOpen ? '-rotate-45 -translate-y-2' : ''
          }`}
        />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Menu Drawer */}
      <nav
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-40 md:hidden transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="pt-20 px-6 space-y-6">
          {/* Busca no Menu Mobile */}
          <form 
            onSubmit={(e) => {
              handleSearch(e);
              closeMenu();
            }}
            className="flex items-center bg-gray-100 rounded-full px-3 py-2 hover:bg-gray-200 transition-colors"
          >
            <input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-gray-900 placeholder-gray-500 outline-none flex-1 text-sm"
            />
          </form>

          {/* Menu Items */}
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors"
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}

          {/* Redes Sociais no Menu Mobile */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm font-semibold text-gray-700 mb-3">Siga-nos</p>
            <div className="flex items-center gap-4">
              <a 
                href="https://www.instagram.com/cantinhodobebesc/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-pink-500 transition-colors"
                aria-label="Instagram"
              >
                <FiInstagram size={24} />
              </a>
              <a 
                href="https://www.facebook.com/cantinhobebesc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                aria-label="Facebook"
              >
                <FiFacebook size={24} />
              </a>
              <a 
                href="https://wa.me/5548996915637" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-green-500 transition-colors"
                aria-label="WhatsApp"
              >
                <FiMessageCircle size={24} />
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}