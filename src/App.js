// App.js - Main application component for a simple translation app.
// Features include text input, character limit enforcement, language detection,
// language selection, and translation using Google's Translation API.
import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import Header from "./component/Header";

const App = () => {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [error, setError] = useState(null);
  const [isRtl, setIsRtl] = useState(false);
  const [languageOption, setLanguageOption] = useState("detect");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [charLimit] = useState(1000);

  // Handle input change with character limit check
  const handleTextChange = (e) => {
    const newText = e.target.value;
    if (newText.length <= charLimit) {
      setInputText(newText);
    }
  };

  // Handle translation API call
  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setError("Input text cannot be empty.");
      return;
    }

    if (inputText.length > charLimit) {
      setError(`Input text cannot exceed ${charLimit} characters.`);
      return;
    }
    setError(null);

    if (languageOption === "select" && selectedLanguage === "en") {
      setTranslatedText(inputText);
      return;
    }

    try {
      const params = {
        key: process.env.REACT_APP_GOOGLE_API_KEY,
        target: "en",
        ...(languageOption === "select" && { source: selectedLanguage }),
      };

      console.log(params);

      const response = await axios.post(
        "https://translation.googleapis.com/language/translate/v2",
        {
          q: inputText,
          format: "text",
        },
        {
          headers: { "Content-Type": "application/json" },
          params,
        }
      );

      console.log(response);

      const translated = response.data.data.translations[0].translatedText;
      setTranslatedText(translated);

      // Check detected source language for RTL text direction
      const detectedLang =
        response.data.data.translations[0].detectedSourceLanguage;
      setIsRtl(detectedLang === "ar" || detectedLang === "he");
    } catch (err) {
      setError("Translation failed. Please try again.");
      console.error(err.response?.data || err.message);
    }
  };

  // Handle language option change
  const handleLanguageOptionChange = (e) => {
    setLanguageOption(e.target.value);
  };

  // Handle selected language change
  const handleSelectedLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  // Toggle RTL/LTR direction
  const toggleDirection = () => {
    setIsRtl((prevIsRtl) => !prevIsRtl);
  };

  return (
    <div className="app">
      <div className="header-section">
        <Header />
      </div>
      <div className="content">
        <div className="input-section">
          <div className="language-options">
            <label>
              <input
                type="radio"
                value="detect"
                checked={languageOption === "detect"}
                onChange={handleLanguageOptionChange}
              />
              Detect Language
            </label>
            <label>
              <input
                type="radio"
                value="select"
                checked={languageOption === "select"}
                onChange={handleLanguageOptionChange}
              />
              Select Language:
            </label>
            {/* Always show the dropdown */}
            <select
              value={selectedLanguage}
              onChange={handleSelectedLanguageChange}
              disabled={languageOption !== "select"}
              style={{
                backgroundColor:
                  languageOption !== "select" ? "#f0f0f0" : "white",
                color: languageOption !== "select" ? "#888" : "black",
                cursor: languageOption !== "select" ? "not-allowed" : "pointer",
              }}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="ar">Arabic</option>
              <option value="zh">Chinese</option>
            </select>
          </div>
          <div className="fields">
            <div className="inputfield">
              <textarea
                placeholder="Enter text here"
                value={inputText}
                onChange={handleTextChange}
                rows="6"
                style={{ direction: isRtl ? "rtl" : "ltr" }}
              />
              <div className="char-count">
                {inputText.length}/{charLimit}
              </div>
            </div>
            <div className="outputfield">
              <textarea
                value={translatedText || "Translated text will appear here."}
                readOnly
                rows="6"
                style={{
                  direction: isRtl ? "rtl" : "ltr",
                  backgroundColor: "#f0f0f0",
                  color: "#555",
                }}
              />
            </div>
          </div>

          {/* Error Message Section */}
          {error && (
            <div
              className="error-message"
              style={{
                color: "red",
                fontWeight: "bold",
                marginTop: "10px",
              }}
            >
              {error}
            </div>
          )}

          <button onClick={handleTranslate}>Translate</button>

          {/* Toggle RTL/LTR Button */}
          <button onClick={toggleDirection} style={{ marginTop: "10px" }}>
            {isRtl ? "Switch to LTR" : "Switch to RTL"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
