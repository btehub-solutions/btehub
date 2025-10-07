
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-md z-50 border-b border-border/50 shadow-subtle">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold cursor-pointer" onClick={() => scrollToSection('home')}>
            <span className="text-foreground">BTE</span>
            <span className="text-brand-blue">Hub</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')} 
              className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
            >
              Services
            </button>
            <Link 
              to="/portfolio" 
              className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
            >
              Portfolio
            </Link>
            <Link 
              to="/pricing" 
              className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
            >
              Pricing
            </Link>
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
            >
              Contact
            </button>
            <Button asChild variant="professional" size="sm">
              <Link to="/book">Get Started</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-accent transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border/50 pt-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('home')} 
                className="text-muted-foreground hover:text-primary transition-colors text-left font-medium py-2"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('services')} 
                className="text-muted-foreground hover:text-primary transition-colors text-left font-medium py-2"
              >
                Services
              </button>
              <Link 
                to="/portfolio"
                onClick={() => setIsMenuOpen(false)}
                className="text-muted-foreground hover:text-primary transition-colors text-left font-medium py-2"
              >
                Portfolio
              </Link>
              <Link 
                to="/pricing"
                onClick={() => setIsMenuOpen(false)}
                className="text-muted-foreground hover:text-primary transition-colors text-left font-medium py-2"
              >
                Pricing
              </Link>
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-muted-foreground hover:text-primary transition-colors text-left font-medium py-2"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="text-muted-foreground hover:text-primary transition-colors text-left font-medium py-2"
              >
                Contact
              </button>
              <Button asChild className="w-fit mt-4" variant="professional">
                <Link to="/book">Get Started</Link>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
