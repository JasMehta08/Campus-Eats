# Campus Eats (Work in Progress)

A full-stack food ordering and pickup system for college campuses. Students can place orders online, and cafeteria staff can manage them in real-time through a role-based dashboard.

---

## 📦 Tech Stack

- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB Atlas + Mongoose
- **Authentication**: Google OAuth 2.0, JWT
- **Payments**: Razorpay Integration
- **Realtime**: Socket.IO (WebSockets)
- **Deployment**: Heroku / Render (Backend), Vercel (Frontend planned)

---

## 📁 Folder Structure

src/
├── models/          # Mongoose schemas
├── controllers/     # Route logic
├── routes/          # Express endpoints
├── services/        # Business logic
├── middleware/      # Auth, error handling
├── config/          # DB connection, env
├── sockets/         # WebSocket logic
├── utils/           # ERN generator, helpers
├── app.ts
└── index.ts

---

## 🔧 Setup Instructions

### **Clone the repo**
   ```bash
   git clone https://github.com/yourusername/campus-eats.git
   cd campus-eats
    # install dependences
   npm install
    #create environment variables
   create .env
    #example: .env
   MONGO_URI=mongodb+srv://your-cluster-url
   JWT_SECRET=your_jwt_secret
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
    #start developing
   npm run dev