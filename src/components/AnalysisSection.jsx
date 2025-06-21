import React from 'react';
import { Brain, Sparkles, MessageSquare } from 'lucide-react';

const AnalysisSection = ({ isAnalyzing }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center">
      <div className="mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Brain className="w-8 h-8 text-emerald-600 animate-pulse" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">كنحلل الرسالة...</h3>
        <p className="text-gray-600">صبر شوية، كنفهم اللغة والسياق</p>
      </div>

      {/* Loading Animation */}
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <Sparkles className="w-4 h-4 animate-spin" />
          <span>كنستخرج النص...</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-gradient-to-r from-emerald-500 to-red-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
        </div>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <MessageSquare className="w-4 h-4 animate-bounce" />
          <span>كنحضر الردود المناسبة...</span>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="bg-emerald-50 rounded-lg p-3">
          <div className="w-8 h-8 bg-emerald-200 rounded-full mx-auto mb-2 animate-pulse"></div>
          <p className="text-xs text-emerald-600">رد رسمي</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="w-8 h-8 bg-blue-200 rounded-full mx-auto mb-2 animate-pulse"></div>
          <p className="text-xs text-blue-600">رد ودود</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-3">
          <div className="w-8 h-8 bg-purple-200 rounded-full mx-auto mb-2 animate-pulse"></div>
          <p className="text-xs text-purple-600">رد مرح</p>
        </div>
      </div>
    </div>
  );
};

export default AnalysisSection;