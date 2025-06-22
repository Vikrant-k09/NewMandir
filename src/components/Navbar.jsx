// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home, Info, Phone, Calendar } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="bg-[#F4C95D] shadow-md select-none sticky top-0 z-50 text-[#2D2D2D]">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Brand Logo */}
        <Link to="/" className="text-[#872341] text-2xl md:text-3xl font-bold whitespace-nowrap">
          🚩 जय बाबा वीर बुलाकी जी
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-[#872341] focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-6">
          <NavbarLink to="/" label="होम" Icon={Home} />
          <NavbarLink to="/events" label="आयोजन" Icon={Calendar} />
          <NavbarLink to="/contact" label="संपर्क करें" Icon={Phone} />
          <NavbarLink to="/about" label="हमारे बारे में" Icon={Info} />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } bg-[#F4C95D] z-40`}
      >
        <div className="flex flex-col px-4 py-4 gap-3">
          <NavbarLink to="/" label="होम" Icon={Home} onClick={closeMobileMenu} />
          <NavbarLink to="/events" label="आयोजन" Icon={Calendar} onClick={closeMobileMenu} />
          <NavbarLink to="/contact" label="संपर्क करें" Icon={Phone} onClick={closeMobileMenu} />
          <NavbarLink to="/about" label="हमारे बारे में" Icon={Info} onClick={closeMobileMenu} />
        </div>
      </div>
    </nav>
  );
};

// Reusable Link Component
const NavbarLink = ({ to, label, Icon, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="text-[#2D2D2D] text-lg flex items-center gap-2 px-3 py-2 rounded-md hover:bg-[#872341] hover:text-[#FFF8E7] transition-colors duration-200"
  >
    {Icon && <Icon size={20} />} {label}
  </Link>
);

export default Navbar;
