# RecipeCraft - Modern Recipe Discovery Platform
Link : https://recipe-sharing143.netlify.app/
RecipeCraft is a premium, modern recipe discovery application built with React 19 and Vite. It leverages the Edamam API v2 to provide users with a vast collection of healthy and nutritious recipes, detailed nutritional information, and a seamless user experience.

## ✨ Features

- **Modern Tech Stack**: Built with React 19, Vite, and React Router v7.
- **Premium UI/UX**: Custom styling using Vanilla CSS with glassmorphism effects, smooth animations, and a responsive grid layout.
- **Dark/Light Mode**: Full theme support with synchronized `localStorage`.
- **Search & Filter**: Real-time recipe search with debounced suggestions and robust error handling.
- **Pagination**: "Load More" functionality seamlessly integrated with Edamam v2's `_links.next` API.
- **Favorites System**: Save your favorite recipes locally using the Context API and `localStorage`.
- **Detailed Recipe View**: Comprehensive nutritional breakdown (Calories, Protein, Fat, Carbs) and ingredients list.

## 🛠️ Technology Stack

- **Frontend**: React 19, React Router DOM, Lucide React (Icons)
- **Build Tool**: Vite
- **Styling**: Vanilla CSS (CSS Variables, Flexbox, Grid)
- **API Integration**: Native `fetch` API wrapping Edamam v2 endpoints

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository** (if applicable) or download the source code.
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Configure Environment Variables**:
   Copy the example environment file and add your Edamam API credentials:
   ```bash
   cp .env.example .env
   ```
   *Note: You can get your App ID and App Key by registering at [Edamam Developer Portal](https://developer.edamam.com/).*

4. **Start the development server**:
   ```bash
   npm run dev
   ```

## 🏗️ Folder Structure

```
src/
├── assets/         # Static images and icons
├── components/     # Reusable UI components (Navbar, RecipeCard, etc.)
├── context/        # React Context providers (Theme, Favorites)
├── hooks/          # Custom React hooks (useDebounce)
├── pages/          # Application routes (Home, RecipeDetails, Favorites)
├── services/       # API integration logic (api.js)
├── styles/         # Global CSS and design tokens
├── App.jsx         # Main application routing and providers
└── main.jsx        # React entry point
```

## 🌐 Deployment

This project is optimized for deployment on Vercel or Netlify.

**For Vercel**:
1. Push the code to GitHub.
2. Import the project in Vercel.
3. Add the Environment Variables (`VITE_EDAMAM_APP_ID`, `VITE_EDAMAM_APP_KEY`) in the Vercel dashboard.
4. Deploy!

**For Netlify**:
1. Push the code to GitHub.
2. Import the project in Netlify.
3. Set the build command to `npm run build` and publish directory to `dist`.
4. Add the Environment Variables.
5. Deploy!

## 📄 License
This project is for educational and portfolio purposes.
