
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900">
            BTEHub
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-600 hover:text-gray-900 transition-colors">Home</a>
            <a href="#services" className="text-gray-600 hover:text-gray-900 transition-colors">Services</a>
            <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
            <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4">
            <div className="flex flex-col space-y-4">
              <a href="#home" className="text-gray-600 hover:text-gray-900 transition-colors">Home</a>
              <a href="#services" className="text-gray-600 hover:text-gray-900 transition-colors">Services</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
              <Button className="bg-blue-600 hover:bg-blue-700 w-fit">Get Started</Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
