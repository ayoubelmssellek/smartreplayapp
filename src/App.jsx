import React, { useState } from 'react';
import { MessageSquare, Upload, Image, Type, Sparkles, Heart, Laugh, MessageCircle, Zap } from 'lucide-react';
import Header from './components/Header';
import MessageInput from './components/MessageInput';
import AnalysisSection from './components/AnalysisSection';
import ResponseCards from './components/ResponseCards';
import Footer from './components/Footer';

function App() {
  const [inputText, setInputText] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState('input');

  const handleAnalyze = async () => {
    if (!inputText && !uploadedImage) return;
    
    setIsAnalyzing(true);
    setCurrentStep('analysis');
    
    // Simulate analysis delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      setCurrentStep('results');
    }, 3000);
  };

  const handleReset = () => {
    setInputText('');
    setUploadedImage(null);
    setIsAnalyzing(false);
    setAnalysisComplete(false);
    setCurrentStep('input');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-red-50" style={{ fontFamily: 'Cairo, sans-serif' }}>
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-red-500 bg-clip-text text-transparent mb-4">
            <Sparkles className="w-8 h-8 text-emerald-500" />
            <h1 className="text-4xl md:text-5xl font-bold">JawbLi</h1>
            <Sparkles className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-xl text-gray-600 mb-2">مساعد ذكي للرد على الرسائل</p>
          <p className="text-gray-500">بالدارجة المغربية الأصيلة</p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Input Section */}
          {currentStep === 'input' && (
            <MessageInput
              inputText={inputText}
              setInputText={setInputText}
              uploadedImage={uploadedImage}
              setUploadedImage={setUploadedImage}
              onAnalyze={handleAnalyze}
            />
          )}

          {/* Analysis Section */}
          {currentStep === 'analysis' && (
            <AnalysisSection isAnalyzing={isAnalyzing} />
          )}

          {/* Results Section */}
          {currentStep === 'results' && analysisComplete && (
            <>
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  تحليل الرسالة
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-emerald-50 rounded-xl p-4">
                    <p className="text-sm text-emerald-600 font-medium mb-2">اللغة المكتشفة</p>
                    <p className="text-emerald-800 font-semibold">دارجة مغربية</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4">
                    <p className="text-sm text-blue-600 font-medium mb-2">نوع الرسالة</p>
                    <p className="text-blue-800 font-semibold">محادثة ودية</p>
                  </div>
                </div>
              </div>

              <ResponseCards onReset={handleReset} />
            </>
          )}
        </div>

        {/* Features Section */}
        {currentStep === 'input' && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">ليش تختار JawbLi؟</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">ردود طبيعية</h3>
                <p className="text-gray-600 text-sm">ردود بالدارجة المغربية الأصيلة، ما شي ترجمة</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Laugh className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">ذكي ومرح</h3>
                <p className="text-gray-600 text-sm">يفهم السياق ويعطيك ردود مناسبة للموقف</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">سهل الاستعمال</h3>
                <p className="text-gray-600 text-sm">صور، نص، أو كتابة - اختار اللي يناسبك</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;