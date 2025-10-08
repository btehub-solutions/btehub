import { useNavigate, useLocation } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId: string) => {
    // If we're not on the home page, navigate there first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // We're already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-primary/95 text-primary-foreground py-16 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-brand-blue to-brand-blue-dark"></div>
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="text-3xl font-bold">
                <span className="text-white">BTE</span>
                <span className="text-primary-foreground/80">Hub</span>
              </div>
              <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-primary-foreground rounded-full animate-bounce-subtle"></div>
              </div>
            </div>
            <p className="text-primary-foreground/80 mb-6 max-w-md leading-relaxed">
              Transforming businesses with cutting-edge artificial intelligence solutions. 
              We specialize in AI automation, chatbot development, and intelligent systems that deliver results.
            </p>
            <div className="flex gap-4">
              <div className="bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-sm font-medium text-primary-foreground">200+ Projects</span>
              </div>
              <div className="bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-sm font-medium text-primary-foreground">95% Success Rate</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6 text-primary-foreground">AI Services</h4>
            <ul className="space-y-3 text-primary-foreground/80">
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="hover:text-primary-foreground transition-colors duration-300 text-left"
                >
                  AI Automation
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="hover:text-primary-foreground transition-colors duration-300 text-left"
                >
                  Chatbot Development
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="hover:text-primary-foreground transition-colors duration-300 text-left"
                >
                  Prompt Engineering
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="hover:text-primary-foreground transition-colors duration-300 text-left"
                >
                  AI Consulting
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6 text-primary-foreground">Contact Info</h4>
            <ul className="space-y-4 text-primary-foreground/80">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 mt-0.5 bg-primary-foreground/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                </div>
                <a href="mailto:bensamoladoyin.btehub@gmail.com" className="hover:text-primary-foreground transition-colors duration-300">
                  bensamoladoyin.btehub@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 mt-0.5 bg-primary-foreground/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                </div>
                <a href="tel:+2347045422815" className="hover:text-primary-foreground transition-colors duration-300">
                  07045422815
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 mt-0.5 bg-primary-foreground/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                </div>
                <span className="text-primary-foreground/80">Abeokuta, Ogun State</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-foreground/80 text-sm">
            &copy; 2024 BTEHub Solutions. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => scrollToSection('home')}
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
