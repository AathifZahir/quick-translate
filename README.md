# Simple Translation App

A simple translation app built with React and Google Cloud Translation API. It supports right-to-left languages such as Arabic and Hebrew and translates text into English.

## Features

- Input text and translate it to English.
- Detect language and support RTL (right-to-left) layout for languages like Arabic and Hebrew.
- Responsive UI with error handling for empty inputs or API failures.

## Requirements

- Node.js >= v14.x
- React.js
- Google Cloud Translation API Key (free trial available)

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/translation-app.git
cd translation-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root of the project and add your Google API key:

```env
REACT_APP_GOOGLE_API_KEY=your_google_api_key_here
```

### 4. Run the Application

```bash
npm start
```

This will run the app locally on `http://localhost:3000`.

### 5. Deploying the App

You can deploy the app to [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/). Simply link your GitHub repository to the platform and follow the instructions for deployment.

## Usage

1. Enter text into the text box.
2. Click the "Translate" button to get the translation.
3. The translated text will appear below, with proper RTL support if the language requires it.

## License

This project is licensed under the MIT License.
