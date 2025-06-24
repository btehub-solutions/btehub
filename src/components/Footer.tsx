
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">BTEHub</h3>
            <p className="text-gray-400 mb-4 max-w-md">
              Transforming businesses with cutting-edge artificial intelligence solutions. 
              We specialize in AI automation, chatbot development, and intelligent systems.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">AI Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">AI Automation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Chatbot Development</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Prompt Engineering</a></li>
              <li><a href="#" className="hover:text-white transition-colors">AI Consulting</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2024 BTEHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
