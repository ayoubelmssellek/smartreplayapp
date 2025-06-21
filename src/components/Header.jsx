import React from 'react';
import { MessageSquare, Github, Twitter } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-red-500 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-red-600 bg-clip-text text-transparent">
              JawbLi
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-emerald-600 transition-colors">
              <Github className="w-5 h-5" />
            </button>
            <button className="text-gray-600 hover:text-blue-600 transition-colors">
              <Twitter className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;