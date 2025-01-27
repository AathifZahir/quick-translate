// App.js - Main application component for a simple translation app.
// Features include text input, character limit enforcement, language detection,
// language selection, and translation using Google's Translation API.

import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Header from "./component/Header";

const App = () => {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isRtl, setIsRtl] = useState(false);
  const [languageOption, setLanguageOption] = useState("detect");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [charLimit] = useState(1000);

  // Function to show error messages using toast
  const showError = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  // Function to handle text input
  const handleTextChange = (e) => {
    const newText = e.target.value;
    if (newText.length <= charLimit) {
      setInputText(newText);
    }
  };

  // Function to handle API call for translation
  const handleTranslate = async () => {
    if (!inputText.trim()) {
      showError("Input text cannot be empty.");
      return;
    }

    if (inputText.length > charLimit) {
      showError(`Input text cannot exceed ${charLimit} characters.`);
      return;
    }

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

      // API call to Google Translation API
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

      const translated = response.data.data.translations[0].translatedText;
      setTranslatedText(translated);

      const detectedLang =
        response.data.data.translations[0].detectedSourceLanguage;
      setIsRtl(detectedLang === "ar" || detectedLang === "he");
    } catch (err) {
      showError("Translation failed. Please try again.");
      console.error(err.response?.data || err.message);
    }
  };

  // Function to handle language option change
  const handleLanguageOptionChange = (e) => {
    setLanguageOption(e.target.value);
    if (e.target.value === "detect") {
      setIsRtl(false);
    }
  };

  // Function to handle selected language change
  const handleSelectedLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
    if (languageOption === "select") {
      setTranslatedText("");
    }
    if (e.target.value === "ar" || e.target.value === "he") {
      setIsRtl(true);
    } else {
      setIsRtl(false);
    }
  };

  // Function to toggle text direction
  const toggleDirection = () => {
    setIsRtl((prevIsRtl) => !prevIsRtl);
  };

  return (
    <div className="app">
      <ToastContainer />
      <div className="header-section">
        <Header />
      </div>
      <div className="content">
        <div className="input-section">
          {/* Language Options */}
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
            <select
              value={selectedLanguage}
              onChange={handleSelectedLanguageChange}
              disabled={languageOption !== "select"}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="ar">Arabic</option>
              <option value="zh">Chinese</option>
              <option value="he">Hebrew</option>
            </select>
          </div>
          {/* Input and Output Fields */}
          <div className="fields">
            <textarea
              placeholder="Enter text here"
              value={inputText}
              onChange={handleTextChange}
              rows="6"
              style={{ direction: isRtl ? "rtl" : "ltr" }}
            />
            <textarea
              value={translatedText || "Translated text will appear here."}
              readOnly
              rows="6"
              style={{
                direction: isRtl ? "rtl" : "ltr",
                backgroundColor: "#f0f0f0",
              }}
            />
          </div>
          {/* Buttons */}
          <button onClick={handleTranslate}>Translate</button>
          <button onClick={toggleDirection}>
            {isRtl ? "Switch to LTR" : "Switch to RTL"} {/* Dynamic text */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
