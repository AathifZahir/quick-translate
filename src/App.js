import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [error, setError] = useState(null);
  const [isRtl, setIsRtl] = useState(false);
  const [languageOption, setLanguageOption] = useState("detect"); // 'detect' or selected language code
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // Default to English
  const [charLimit] = useState(1000); // Set your desired character limit

  // Handle input change with character limit check
  const handleTextChange = (e) => {
    const newText = e.target.value;
    if (newText.length <= charLimit) {
      setInputText(newText);
    }
  };

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setError("Input text cannot be empty.");
      return;
    }

    // Check if the input text exceeds the character limit
    if (inputText.length > charLimit) {
      setError(`Input text cannot exceed ${charLimit} characters.`);
      return;
    }
    setError(null); // Clear previous errors

    if (languageOption === "select" && selectedLanguage === "en") {
      setTranslatedText(inputText);
      return;
    }

    try {
      // Prepare parameters for the API call
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
      <h1>Simple Translation App</h1>
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
            {languageOption === "select" && (
              <select
                value={selectedLanguage}
                onChange={handleSelectedLanguageChange}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="ar">Arabic</option>
                <option value="zh">Chinese</option>
              </select>
            )}
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
            Toggle Direction
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
