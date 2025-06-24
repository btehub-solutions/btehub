
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="pt-24 pb-12 md:pt-32 md:pb-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Transforming Business With
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Artificial Intelligence</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            BTEHub specializes in AI automation, chatbot development, and prompt engineering 
            to help businesses unlock the full potential of artificial intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4 group">
              Start Your AI Journey
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 group">
              <Play className="mr-2 h-5 w-5" />
              See AI Demo
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-gray-200">
            <div>
              <div className="text-3xl font-bold text-gray-900">200+</div>
              <div className="text-gray-600">AI Solutions Deployed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">95%</div>
              <div className="text-gray-600">Automation Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">50+</div>
              <div className="text-gray-600">Chatbots Built</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
