🎬 Not Just Movies...   ...New Dimensions

Welcome to Not Just Movies... New Dimensions — a modern, responsive movie discovery app that goes beyond just listing films. Dive into a stylish interface where you can browse, filter, search, and interact with the latest and most popular movies — all in one place.


🚀 Features
🔍 Search movies by title
🎭 Filter by genre, rating, and popularity
🏷️ Clickable genre badges on each movie card — filter instantly by clicking!
🎞️ Watch trailers directly for each movie
📄 Detailed movie view — see posters, metadata, and more
🔐 User authentication — register or log in with email/password
✅ Form validation (powered by react-hook-form + Joi)
☁️ Firebase integration for authentication and user data
🌙 Theme switching (light/dark)
📱 Fully responsive layout


🔧 Tech Stack
Frontend:
React 19
React Router DOM 7
Redux Toolkit & Redux Persist
Tailwind CSS
Styles module CSS
Firebase
React Hook Form + Joi

🛠 Dependencies
"dependencies": {
"@hookform/resolvers": "^5.2.1",
"@reduxjs/toolkit": "^2.8.2",
"@tailwindcss/vite": "^4.1.11",
"axios": "^1.11.0",
"firebase": "^12.0.0",
"joi": "^17.13.3",
"react": "^19.1.0",
"react-dom": "^19.1.0",
"react-redux": "^9.2.0",
"react-router-dom": "^7.6.3",
"redux-persist": "^6.0.0",
"tailwindcss": "^4.1.11"
}

🧪 How to Run Locally
Clone the repo
git clone 
cd
npm install

env file
VITE_API_KEY=3270545d51e3e3d21f06068d3592ea36
VITE_API_BASE_URL=https://api.themoviedb.org/3
npm run dev

🔒 Authentication
Firebase Authentication is implemented with:
Email and password sign-up/login
State persistence via Redux + redux-persist

📂 Project Structure Highlights
components/ – reusable UI components
pages/ – route-based page components (e.g. MovieList, MovieDetails)
store/ – Redux slices & configuration
firebase/ – Firebase configuration
models/ – TypeScript interfaces
etc

🧑‍💻 Author
Oksana Moskalova
A frontend developer (occasionally full-stack) passionate about clean UI and a smooth UX.
