# 🎬 TMDB Project

A simple Angular-based web application inspired by [The Movie Database (TMDB)](https://www.themoviedb.org/) website.  
It allows users to **search** for movies and TV shows, **filter** results, and view detailed information — all powered by the TMDB API.

---

## ✨ Features
- 🔍 **Search** movies and TV shows by title
- 🎯 **Filter** results based on criteria (e.g., genres, popularity)
- 📄 **Details page** for movies and TV shows with title, release date, description, and poster
- 🌐 Live data from the TMDB API

---

## 🛠️ Tech Stack
- **Frontend:** Angular
- **API:** TMDB API
- **Backend:** None (fully client-side)

---

## 📦 Installation & Setup

### 1️⃣ Prerequisites
- Node.js (LTS version recommended)
- Angular CLI installed globally:
npm install -g @angular/cli

---

### 2️⃣ Clone the repository
git clone https://github.com/AhmedRuzzeh/TMDB-Project.git  
cd TMDB-Project

---

### 3️⃣ Install dependencies
npm install

---

### 4️⃣ Get your TMDB API key
- Create a free account on TMDB  
- Go to Settings → API → Create API Key  
- Copy the key and add it to your environment configuration (src/environments/environment.ts):

export const environment = {  
  production: false,  
  apiKey: 'YOUR_TMDB_API_KEY'  
};

---

### 5️⃣ Run the app
ng serve

The app will be running at: http://localhost:4200/
