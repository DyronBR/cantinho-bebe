'use client';

import { useState, useRef, useEffect } from 'react';
import { FiMenu, FiX, FiSearch, FiHome, FiPackage, FiInfo, FiChevronDown, FiInstagram, FiFacebook, FiMessageCircle } from 'react-icons/fi';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const searchRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollYRef = useRef(0);

  const categories = ['Roupas', 'Toalhas', 'Acessórios', 'Sapatinhos'];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Buscando:', searchQuery);
    setSearchExpanded(false);
    setSearchQuery('');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchExpanded(false);
      }
    };

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSearchExpanded(false);
      }
    };

    if (searchExpanded) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [searchExpanded]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      if (currentScrollY > lastScrollYRef.current && currentScrollY > 50) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }

      lastScrollYRef.current = currentScrollY;

      scrollTimeoutRef.current = setTimeout(() => {
        setIsHeaderVisible(true);
      }, 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  return (
    <>
      {/* Header Desktop & Mobile */}
      <header className={`fixed top-0 left-0 right-0 z-50 w-full bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 backdrop-blur-md border-b border-pink-100 shadow-lg transition-transform duration-300 ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-7xl mx-auto px-8 py-0">
          <div className="flex items-center justify-between">
            
            {/* Logo - AUMENTADA 200% NO MOBILE */}
            <div className="flex-shrink-0 flex justify-center lg:justify-start w-full lg:w-auto">
              <a href="/" className="group">
                <img 
                  src="/images/logo-icons.png" 
                  alt="Cantinho do Bebê"
                  className="h-20 md:h-10 lg:h-24 w-auto group-hover:scale-110 transition-transform duration-300"
                />
              </a>
            </div>

            {/* Menu Desktop */}
            <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
              <a href="/" className="flex items-center gap-2 text-gray-700 hover:text-pink-600 font-semibold transition-colors">
                <FiHome size={20} />
                <span>Início</span>
              </a>

              {/* Produtos - Link direto */}
              <a href="/products" className="flex items-center gap-2 text-gray-700 hover:text-pink-600 font-semibold transition-colors">
                <FiPackage size={20} />
                <span>Produtos</span>
              </a>

              <a href="/about" className="flex items-center gap-2 text-gray-700 hover:text-pink-600 font-semibold transition-colors">
                <FiInfo size={20} />
                <span>Sobre</span>
              </a>
            </nav>

            {/* Right side: Search, Social, Hamburger */}
            <div className="ml-auto flex items-center gap-4">
              {/* Search Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSearchExpanded(true);
                }}
                className="hidden md:flex p-3 bg-white/60 backdrop-blur-sm rounded-2xl border border-pink-100 hover:border-pink-200 hover:shadow-md transition-all duration-300 hover:scale-105 flex-shrink-0"
                aria-label="Buscar"
              >
                <FiSearch size={20} className="text-gray-500 hover:text-pink-600 transition-colors" />
              </button>

              {/* Redes Sociais Desktop */}
              <div className="hidden lg:flex items-center gap-4">
                <a href="https://www.instagram.com/cantinhodobebesc/" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:scale-110 transition-transform p-2 hover:bg-pink-100 rounded-full">
                  <FiInstagram size={20} />
                </a>
                <a href="https://www.facebook.com/cantinhobebesc" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:scale-110 transition-transform p-2 hover:bg-blue-100 rounded-full">
                  <FiFacebook size={20} />
                </a>
                <a href="https://wa.me/5548996915637" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:scale-110 transition-transform p-2 hover:bg-green-100 rounded-full">
                  <FiMessageCircle size={20} />
                </a>
              </div>

              {/* Hamburger Mobile */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden text-gray-700 hover:text-pink-600 p-1 -ml-2"
              >
                {mobileOpen ? <FiX size={28} /> : <FiMenu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Expanded Search */}
      {searchExpanded && (
        <>
          {/* Mobile Overlay */}
          <div 
            className="md:hidden fixed inset-0 z-[55] bg-black/20 backdrop-blur-sm"
            onClick={() => setSearchExpanded(false)}
          />
          {/* Search Bar */}
          <div
            ref={searchRef}
            className={`fixed z-[60] top-24 md:top-16 left-4 md:left-auto md:right-8 w-[calc(100%-2rem)] md:w-72 py-4 px-6 bg-white/95 backdrop-blur-xl rounded-3xl md:rounded-2xl border border-pink-100 shadow-2xl transition-all duration-300 ease-out flex items-center ${
              searchExpanded
                ? 'opacity-100 scale-100 translate-y-0'
                : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
            }`}
          >
            <form onSubmit={handleSearch} className="flex items-center gap-4 w-full">
              <FiSearch size={20} className="text-gray-400 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar..."
                className="bg-transparent outline-none flex-1 text-sm text-gray-700 placeholder-gray-400"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setSearchExpanded(false)}
                className="p-2 text-gray-400 hover:text-gray-700 rounded-xl hover:bg-gray-100 transition-colors flex-shrink-0"
              >
                <FiX size={18} />
              </button>
            </form>
          </div>
        </>
      )}

      {/* Menu Mobile */}
      {mobileOpen && (
        <div className="lg:hidden fixed left-0 right-0 top-20 bottom-0 z-40 bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50 backdrop-blur-md p-8 space-y-4 animate-in slide-in-from-top overflow-y-auto">
          <a href="/" className="block py-3 px-4 rounded-lg bg-white/60 text-gray-700 font-semibold hover:bg-pink-100 transition-colors">
            Início
          </a>

          {/* Produtos - Link direto */}
          <a href="/products" className="block py-3 px-4 rounded-lg bg-white/60 text-gray-700 font-semibold hover:bg-pink-100 transition-colors">
            Produtos
          </a>

          <a href="/about" className="block py-3 px-4 rounded-lg bg-white/60 text-gray-700 font-semibold hover:bg-pink-100 transition-colors">
            Sobre
          </a>

          {/* Busca Mobile */}
          <form onSubmit={handleSearch} className="mt-6 pt-4 border-t border-pink-200">
            <div className="flex items-center bg-white/60 rounded-full px-4 py-3 border border-pink-100">
              <FiSearch size={18} className="text-gray-400 mr-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar produtos..."
                className="bg-transparent outline-none flex-1 text-gray-700 placeholder-gray-400"
              />
            </div>
          </form>

          {/* Redes Sociais Mobile */}
          <div className="flex justify-center gap-6 pt-6 border-t border-pink-200">
            <a href="https://www.instagram.com/cantinhodobebesc/" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:scale-110 transition-transform p-3 bg-white/60 rounded-full">
              <FiInstagram size={24} />
            </a>
            <a href="https://www.facebook.com/cantinhobebesc" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:scale-110 transition-transform p-3 bg-white/60 rounded-full">
              <FiFacebook size={24} />
            </a>
            <a href="https://wa.me/5548996915637" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:scale-110 transition-transform p-3 bg-white/60 rounded-full">
              <FiMessageCircle size={24} />
            </a>
          </div>
        </div>
      )}
    </>
  );
}