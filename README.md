# 🏆 Leaderboard Interactive Points Game

An interactive, animated leaderboard where users can gain points through item selection, view rankings with medals and confetti, and track history of earned points. Perfect for classrooms, hackathons, or team games where you want a fun way to track scores in real-time!

---

## ✨ Features

- 🧑‍🤝‍🧑 Interactive leaderboard with real-time point updates
- 🎯 Click-to-select items instead of dropdowns
- 🏅 Top 3 ranks with animated medals (Gold, Silver, Bronze)
- 🎉 Confetti effect on point addition
- 🕹️ Live claim points feature
- 🕵️‍♂️ History table with user-wise point tracking
- 📨 Toast pop-ups for point notifications

---

## 🧱 Tech Stack

### Frontend:
- **React.js**
- **Framer Motion** – for animations
- **Canvas Confetti** – for celebration effects
- **React Toastify** – for notifications
- **Tailwind** - CSS

### Backend:
- **Node.js**
- **Express.js**
- **MongoDB** – for storing users and point history
- **Mongoose** – MongoDB object modeling

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Love-M-365/Leaderboard.git
cd leaderboard
```

### 2. Set Up the Backend

```bash
cd backend
npm install
```

- Create a `.env` file in `/backend` and add:

```
MONGO_URI=mongodb+srv://Love_m_365:LoVe365@cluster0.otamm.mongodb.net/leaderboarddb?retryWrites=true&w=majority&appName=Cluster0
Port=5000
```

- Run the backend:

```bash
npm start
```

### 3. Set Up the Frontend

```bash
cd ../frontend
npm install
npm run dev
```

The frontend will typically run on [http://localhost:5173](http://localhost:5173) if you're using Vite.

---

## 🧩 Project Structure

```
root
│
├── backend
│   ├── models
│   ├── routes
│   ├── server.js
│   └── .env
│
├── frontend
│   ├── components
│   │   ├── AddUser.jsx
│   │   ├── ClaimPoints.jsx
│   │   ├── ClaimPointsComponent.jsx
│   ├── assets
│   │   ├── first.gif
│   │   ├── secondplace.gif
│   │   └── thirdplace.gif
│   ├── App.jsx
│   └── ...
│
└── README.md
```

---


## ⚙️ APIs 

**GET** `/api/users` – Get all users  
**POST** `/api/users` – Add new user  
**PUT** `/api/users/:id/increase` – Add points to a user  
**GET** `/api/claim-history` – Get point history 
**POST** `/api/claim-history` – Add point history  

---

## 🌐 Deployment


[Live Demo](https://leaderboard-one-neon.vercel.app/)
- Backend: Hosted on Render
- Frontend: Hosted on Vercel

---



## 🙋‍♂️ Author

**Love Maggo**  
🔗 [LinkedIn](https://linkedin.com/in/lovemaggo) | [GitHub](https://github.com/Love-M-365)

---

