# Quick Translate

[![Vercel](https://img.shields.io/badge/Hosted%20on-Vercel-blue?logo=vercel)](https://quick-translate-ojfd1p7yi-aathifzahirs-projects.vercel.app/) [![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)](https://react.dev/) [![Axios](https://img.shields.io/badge/Backend%20API-Axios-orange?logo=axios)](https://axios-http.com/) [![License](https://img.shields.io/badge/License-MIT-green)](LICENSE) [![Tests](https://img.shields.io/badge/Testing-Passing-brightgreen?logo=jest)](https://jestjs.io/) [![Code Style](https://img.shields.io/badge/Code%20Style-Prettier-yellow?logo=prettier)](https://prettier.io/)  

Quick Translate is a simple translation app built with ReactJS. It allows users to input text, translate it using Google's Translation API, and supports features like text direction switching, character limits, and language detection.

## 🚀 Live Demo

[Visit Quick Translate](https://quick-translate-ojfd1p7yi-aathifzahirs-projects.vercel.app/)

## 🛠️ Features

- **Language Detection:** Automatically detect the input language.
- **Multi-Language Support:** Translate text into multiple languages, including English, Spanish, French, Arabic, and more.
- **Character Limit:** Enforces a maximum character limit of 1000 for input text.
- **Text Direction:** Switch between Left-to-Right (LTR) and Right-to-Left (RTL) directions.
- **Error Handling:** Displays toast notifications for errors like empty input or API failures.
- **Responsive Design:** Fully optimized for all screen sizes.

## 🖥️ Tech Stack

- **Frontend:** ReactJS, CSS
- **API Integration:** Google Translation API (via Axios)
- **Hosting:** Vercel
- **Testing:** React Testing Library, Jest
- **Styling:** Custom CSS with variables

## 🏗️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/aathifzahirs-projects/quick-translate.git
   ```

2. Navigate to the project directory:

   ```bash
   cd quick-translate
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your Google API Key:

   ```env
   REACT_APP_GOOGLE_API_KEY=your_api_key
   ```

5. Start the development server:

   ```bash
   npm start
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Folder Structure

```
src/
├── components/          # Reusable components
├── styles/              # CSS files
├── App.js               # Main application component
├── App.css              # Application styling
├── index.js             # React DOM render
├── index.css            # Global styles
└── .env                 # API Key configuration
```

## 🧪 Running Tests

To run tests, use the following command:

```bash
npm test
```

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! If you have suggestions or find bugs, please feel free to open an issue or submit a pull request.

## 🫂 Support

Star this project to show your support. Made with ❤️ by Aathif Zahir.
