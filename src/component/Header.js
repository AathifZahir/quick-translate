//Header.js - Header component for the translation app.
//Includes the app logo and name.
import React from "react";

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <img src="logo.svg" alt="Logo" className="logo" />
        <h1 className="app-name">Quick Translate</h1>
      </div>
    </header>
  );
};

export default Header;
