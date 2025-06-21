import React, { useRef, useState } from "react";
import { Upload, Type, X, Camera } from "lucide-react";

// عوّض بمفتاحك الخاص في Cohere API
const COHERE_API_KEY = "gjQTPpDNWOpnFd6v8Rv2kJ3ikynBdfrqCJVbEGTH";

const MessageInput = ({
  inputText,
  setInputText,
  uploadedImage,
  setUploadedImage,
}) => {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [inputMethod, setInputMethod] = useState("text");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result);
        setInputMethod("image");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    setInputMethod("text");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const canAnalyze = inputText.trim();

 const onAnalyze = async () => {
  if (!inputText.trim() || loading) {
    alert("الرجاء كتابة رسالة قبل الإرسال.");
    return;
  }

  setLoading(true);
  setReply("");

  try {
    const response = await fetch("https://api.cohere.ai/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${COHERE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "command",
        prompt: `You are a smart assistant that understands Moroccan Arabic (Darija). The user message is: "${inputText.trim()}". Please provide 3 appropriate responses in English.`,
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "طلب غير ناجح");
    }

    const data = await response.json();

    if (!data.text) throw new Error("لا توجد ردود من API");

    setReply(data.text.trim());

  } catch (error) {
    console.error("Cohere API Error:", error.message);
    setReply("📛 وقع مشكل مع الخدمة، جرب من بعد.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        شنو هي الرسالة اللي بغيتي ترد عليها؟
      </h2>

      {/* اختيار طريقة الإدخال */}
      <div className="flex gap-2 mb-6 justify-center">
        <button
          onClick={() => setInputMethod("text")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
            inputMethod === "text"
              ? "bg-emerald-500 text-white shadow-md"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          <Type className="w-4 h-4" />
          كتابة النص
        </button>
        <button
          onClick={() => setInputMethod("image")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
            inputMethod === "image"
              ? "bg-emerald-500 text-white shadow-md"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          disabled
        >
          <Camera className="w-4 h-4" />
          رفع صورة (غير مدعوم)
        </button>
      </div>

      {/* حقل النص */}
      {inputMethod === "text" && (
        <div className="mb-6">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="اكتب الرسالة هنا... مثال: كيداير؟ شنو الأخبار؟"
            className="w-full h-32 p-4 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-right"
            dir="rtl"
            disabled={loading}
          />
        </div>
      )}

      {/* زر التحليل */}
      <div className="text-center">
        <button
          onClick={onAnalyze}
          disabled={!canAnalyze || loading}
          className={`px-8 py-3 rounded-xl font-semibold transition-all ${
            canAnalyze && !loading
              ? "bg-gradient-to-r from-emerald-500 to-red-500 text-white hover:shadow-lg transform hover:scale-105"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          {loading ? "كنحلل الرسالة..." : "حلل الرسالة وعطيني ردود 🤖"}
        </button>
      </div>

      {/* عرض الردود */}
      {reply && (
        <div className="mt-6 p-4 bg-gray-50 border rounded-xl text-right whitespace-pre-line">
          <h3 className="font-bold mb-2 text-emerald-700">✅ الردود المقترحة:</h3>
          <pre className="whitespace-pre-wrap">{reply}</pre>
        </div>
      )}
    </div>
  );
};

export default MessageInput;
