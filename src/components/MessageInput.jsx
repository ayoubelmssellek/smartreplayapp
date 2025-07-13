import React, { useEffect, useRef, useState } from "react";
import { Upload, Type, X, Camera } from "lucide-react";
import Tesseract from "tesseract.js";

const GEMINI_API_KEY = "AIzaSyA1GaUoHBijKv3DYRejSCjuFghy62Uypis"; // Replace with your real key

const MessageInput = () => {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [inputMethod, setInputMethod] = useState("text");
  const [inputText, setInputText] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatMessages");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
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
          alert("فشل استخراج النص من الصورة.");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files[0]) handleFile(e.target.files[0]);
  };

  const removeImage = () => {
    setUploadedImage(null);
    setInputText("");
    setInputMethod("text");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const sendMessage = async () => {
    const userMessage = inputText.trim();
    if (!userMessage || loading) return;

    const updatedMessages = [...messages, { role: "user", text: userMessage }];
    setMessages(updatedMessages);
    setLoading(true);
    setInputText("");

    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-goog-api-key": GEMINI_API_KEY,
          },
          body: JSON.stringify({
            contents: updatedMessages.map((m) => ({ role: m.role, parts: [{ text: m.text }] })),
          }),
        }
      );

      const data = await response.json();
      const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: botReply || "📛 وقع مشكل مع الخدمة، جرب من بعد." },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "📛 وقع مشكل مع الخدمة، جرب من بعد." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        دردش مع الذكاء الاصطناعي
      </h2>

      <div className="mb-4 max-h-96 overflow-y-auto border rounded-xl p-4 bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 p-3 rounded-xl max-w-[85%] whitespace-pre-wrap ${
              msg.role === "user"
                ? "bg-emerald-100 ml-auto text-right"
                : "bg-gray-200 mr-auto text-left"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-4 justify-center">
        <button
          onClick={() => setInputMethod("text")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
            inputMethod === "text"
              ? "bg-emerald-500 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          <Type className="w-4 h-4" /> كتابة النص
        </button>
        <button
          onClick={() => setInputMethod("image")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
            inputMethod === "image"
              ? "bg-emerald-500 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          <Camera className="w-4 h-4" /> رفع صورة
        </button>
      </div>

      {inputMethod === "text" && (
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="اكتب رسالتك هنا..."
          className="w-full h-24 p-4 border rounded-xl text-right mb-4"
          dir="rtl"
        />
      )}

      {inputMethod === "image" && (
        <div className="mb-4">
          {!uploadedImage ? (
            <div
              className={`border-2 border-dashed rounded-xl p-6 text-center ${
                dragActive ? "border-emerald-500 bg-emerald-50" : "border-gray-300"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 mb-2">ارفع صورة أو اسحبها هنا</p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-emerald-500 text-white px-4 py-2 rounded-xl"
              >
                اختر صورة
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
            </div>
          ) : (
            <div className="relative">
              <img
                src={uploadedImage}
                alt="Uploaded"
                className="w-full max-h-64 object-contain rounded-xl border"
              />
              <button
                onClick={removeImage}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      <div className="text-center">
        <button
          onClick={sendMessage}
          disabled={!inputText.trim() || loading}
          className={`px-6 py-3 rounded-xl font-semibold ${
            inputText.trim() && !loading
              ? "bg-gradient-to-r from-emerald-500 to-red-500 text-white"
              : "bg-gray-200 text-gray-400"
          }`}
        >
          {loading ? "يرد عليك..." : "أرسل 🚀"}
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
