import React, { useState } from 'react';
import { Copy, Heart, Smile, MessageCircle, Check, RotateCcw } from 'lucide-react';

const ResponseCards = ({ onReset }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const responses = [
    {
      id: 1,
      type: 'formal',
      title: 'رد رسمي',
      text: 'السلام عليكم، كيداير؟ الله اعطيك الصحة، نشوفوك على خير إن شاء الله.',
      color: 'emerald',
      icon: MessageCircle
    },
    {
      id: 2,
      type: 'friendly',
      title: 'رد ودود',
      text: 'أهلا وسهلا! كيداير خويا؟ راه مشتاقينك، واش باقي معانا اليوم؟',
      color: 'blue',
      icon: Heart
    },
    {
      id: 3,
      type: 'casual',
      title: 'رد مرح',
      text: 'وايلي! شنو هاد الغيبة؟ فينك غادي، واش نسيتي الصحاب؟ 😄',
      color: 'purple',
      icon: Smile
    }
  ];

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getColorClasses = (color) => {
    const colors = {
      emerald: {
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        icon: 'bg-emerald-100 text-emerald-600',
        button: 'bg-emerald-500 hover:bg-emerald-600',
        text: 'text-emerald-700'
      },
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        icon: 'bg-blue-100 text-blue-600',
        button: 'bg-blue-500 hover:bg-blue-600',
        text: 'text-blue-700'
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        icon: 'bg-purple-100 text-purple-600',
        button: 'bg-purple-500 hover:bg-purple-600',
        text: 'text-purple-700'
      }
    };
    return colors[color];
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">الردود المقترحة</h3>
        <p className="text-gray-600">اختر الرد اللي كيعجبك أو خذ منه فكرة</p>
      </div>

      <div className="grid gap-6">
        {responses.map((response, index) => {
          const colors = getColorClasses(response.color);
          const Icon = response.icon;
          
          return (
            <div
              key={response.id}
              className={`${colors.bg} ${colors.border} border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 ${colors.icon} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className={`font-semibold ${colors.text}`}>{response.title}</h4>
              </div>
              
              <p className="text-gray-800 text-lg leading-relaxed mb-4 text-right" dir="rtl">
                {response.text}
              </p>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleCopy(response.text, index)}
                  className={`flex items-center gap-2 px-4 py-2 ${colors.button} text-white rounded-xl transition-colors text-sm font-medium`}
                >
                  {copiedIndex === index ? (
                    <>
                      <Check className="w-4 h-4" />
                      تم النسخ!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      انسخ الرد
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center pt-6">
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors mx-auto"
        >
          <RotateCcw className="w-4 h-4" />
          رسالة جديدة
        </button>
      </div>
    </div>
  );
};

export default ResponseCards;