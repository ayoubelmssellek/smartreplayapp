import React from 'react';
import { Heart, Coffee } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-gray-600 mb-4">
            <span>صنع بـ</span>
            <Heart className="w-4 h-4 text-red-500 animate-pulse" />
            <span>في المغرب</span>
            <Coffee className="w-4 h-4 text-amber-600" />
          </div>
          
          <p className="text-sm text-gray-500 mb-4">
            JawbLi - مساعدك الذكي للرد بالدارجة المغربية الأصيلة
          </p>
          
          <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-emerald-600 transition-colors">الخصوصية</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">الشروط</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">اتصل بنا</a>
          </div>
          
          <div className="mt-4 text-xs text-gray-400">
            © 2025 JawbLi. جميع الحقوق محفوظة.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;