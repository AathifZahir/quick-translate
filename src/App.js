import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [error, setError] = useState(null);
  const [isRtl, setIsRtl] = useState(false);
  const [isManualRtl, setIsManualRtl] = useState(false); // New state for manual RTL toggle

  // Handle input change
  const handleTextChange = (e) => {
    setInputText(e.target.value);
  };

  // Handle translation API call
  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setError("Input text cannot be empty.");
      return;
    }
    setError(null); // Clear previous errors

    try {
      const response = await axios.post(
        "https://translation.googleapis.com/language/translate/v2",
        {
          q: inputText,
          target: "en",
          format: "text",
        },
        {
          headers: { "Content-Type": "application/json" },
          params: { key: process.env.REACT_APP_GOOGLE_API_KEY },
        }
      );

      const translated = response.data.data.translations[0].translatedText;
      setTranslatedText(translated);

      // Detect language automatically but allow manual override of RTL
      const detectedLang =
        response.data.data.translations[0].detectedSourceLanguage;
      if (!isManualRtl) {
        // Only set RTL if manual toggle is off
        setIsRtl(detectedLang === "ar" || detectedLang === "he");
      }
    } catch (err) {
      setError("Translation failed. Please try again.");
    }
  };

  // Handle manual RTL/LTR toggle
  const toggleRtl = () => {
    setIsManualRtl(!isManualRtl);
    setIsRtl(!isRtl); // Toggle RTL/LTR on button click
  };

  return (
    <div className="app">
      <h1>Simple Translation App</h1>
      <textarea
        placeholder="Enter text here"
        value={inputText}
        onChange={handleTextChange}
        rows="4"
        style={{ direction: isRtl ? "rtl" : "ltr" }} // Dynamically apply LTR/RTL
      />
      <button onClick={handleTranslate}>Translate</button>
      <button onClick={toggleRtl} style={{ marginTop: "10px" }}>
        {isRtl ? "Switch to LTR" : "Switch to RTL"} {/* Toggle button text */}
      </button>
      {error && <div className="error">{error}</div>}
      <div
        className="translated-text"
        style={{ direction: isRtl ? "rtl" : "ltr" }} // Dynamically apply LTR/RTL to translated text
      >
        {translatedText || "Translated text will appear here."}
      </div>
    </div>
  );
};

export default App;
