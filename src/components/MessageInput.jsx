import React, { useRef, useState } from "react";
import { Upload, Type, X, Camera } from "lucide-react";
import Tesseract from "tesseract.js";
import { log } from "console";

const COHERE_API_KEY = "gjQTPpDNWOpnFd6v8Rv2kJ3ikynBdfrqCJVbEGTH";

const MessageInput = ({ inputText, setInputText, uploadedImage, setUploadedImage }) => {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [inputMethod, setInputMethod] = useState("text");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleFile = (file) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageDataUrl = e.target?.result;
        setUploadedImage(imageDataUrl);
        setInputMethod("image");

        try {
          const result = await Tesseract.recognize(imageDataUrl, "eng");
          const extractedText = result.data.text.trim();
          setInputText(extractedText);
        } catch (err) {
          console.error("OCR Error:", err);
          alert("فشل استخراج النص من الصورة.");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) handleFile(e.target.files[0]);
  };

  const removeImage = () => {
    setUploadedImage(null);
    setInputMethod("text");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const canAnalyze = inputText.trim();

  const onAnalyze = async () => {
    if (!canAnalyze || loading) return;

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
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">شنو هي الرسالة اللي بغيتي ترد عليها؟</h2>

      <div className="flex gap-2 mb-6 justify-center">
        <button onClick={() => setInputMethod("text")} className={`flex items-center gap-2 px-4 py-2 rounded-xl ${inputMethod === "text" ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-600"}`}>
          <Type className="w-4 h-4" /> كتابة النص
        </button>
        <button onClick={() => setInputMethod("image")} className={`flex items-center gap-2 px-4 py-2 rounded-xl ${inputMethod === "image" ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-600"}`}>
          <Camera className="w-4 h-4" /> رفع صورة
        </button>
      </div>

      {inputMethod === "text" && (
        <div className="mb-6">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="اكتب الرسالة هنا... مثال: كيداير؟ شنو الأخبار؟"
            className="w-full h-32 p-4 border rounded-xl text-right"
            dir="rtl"
            disabled={loading}
          />
        </div>
      )}

      {inputMethod === "image" && (
        <div className="mb-6">
          {!uploadedImage ? (
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center ${dragActive ? "border-emerald-500 bg-emerald-50" : "border-gray-300"}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">اسحب صورة الرسالة هنا أو اضغط للاختيار</p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-emerald-500 text-white px-6 py-2 rounded-xl"
                disabled={loading}
              >
                اختر صورة
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
                disabled={loading}
              />
            </div>
          ) : (
            <div className="relative">
              <img
                src={uploadedImage}
                alt="Uploaded message"
                className="w-full max-h-64 object-contain rounded-xl border"
              />
              <button
                onClick={removeImage}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                disabled={loading}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      <div className="text-center">
        <button
          onClick={onAnalyze}
          disabled={!canAnalyze || loading}
          className={`px-8 py-3 rounded-xl font-semibold ${canAnalyze && !loading ? "bg-gradient-to-r from-emerald-500 to-red-500 text-white" : "bg-gray-200 text-gray-400"}`}
        >
          {loading ? "كنحلل الرسالة..." : "حلل الرسالة وعطيني ردود 🤖"}
        </button>
      </div>

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
