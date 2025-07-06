# 🧑‍💼 Job Finder

A full-stack job platform that connects job posters and job seekers. Users can post jobs, apply to jobs, get real-time notifications, and manage profiles — all in a clean, intuitive interface.

---

## 🔧 Tech Stack

### ⚙️ Backend:
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Google OAuth with Passport.js

### 🖥 Frontend:
- React.js
- React Router
- Context API (for global auth state)
- Axios for HTTP requests
- Plain CSS (fully responsive)

---

## ✨ Features

✅ **Authentication**  
- Email/Password Signup/Login  
- Google OAuth Login  
- Role selection: `Job Poster` or `Job Seeker`

✅ **Job System**  
- Posters can post, edit, and delete jobs  
- Seekers can view and apply to jobs  
- Role-based dashboards

✅ **Notifications**  
- Bell icon with unread badge  
- Real-time feedback on job applications  
- Automatically marked as read on open

✅ **Profile Page**  
- View name, email, phone, role  
- Dropdown access from navbar initials icon

✅ **UI/UX**  
- Mobile-friendly design  
- Spinner during submission  
- Disabled buttons on submit to prevent spam

---

## 📁 Project Structure

job-finder/
├── client/               # React frontend
│   ├── public/
│   └── src/
│       ├── components/   # Navbar, Home, Dashboard, Profile etc.
│       ├── context/      # AuthContext for managing user auth state
│       ├── pages/        # Login, Signup, Dashboards
│       └── App.js
│
├── server/               # Express backend
│   ├── config/           # DB connection and Passport strategy
│   ├── controllers/      # Logic for jobs, auth, notifications
│   ├── middleware/       # Auth middleware (JWT)
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   └── server.js
│
├── .env                  # Environment variables
├── .gitignore
├── LICENSE
└── README.md

1️⃣ Backend Setup
bash
Copy
Edit
cd server
npm install
npm start

Make sure to add a .env file in server/ like this:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

2️⃣ Frontend Setup
bash
Copy
Edit
cd client
npm install
npm start

This will start the React app on:
👉 http://localhost:3000

📄 License
This project is licensed under the MIT License.

🙋‍♂️ Author
Made with ❤️ by PRASHANT SINGH (psingh-123)

📄 License
This project is licensed under the MIT License.


