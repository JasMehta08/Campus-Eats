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

```src/
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
```
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
```

## API Endpoints

| Method | Endpoint                | Description                                      |
|--------|------------------------|--------------------------------------------------|
| GET    | /auth/google           | Redirects to Google OAuth login                  |
| GET    | /auth/google/callback  | Handles Google OAuth callback, returns JWT        |
| GET    | /dashboard             | Protected route, requires JWT                    |
| POST   | /api/admin/promote     | Admin-only: promote user to admin/other role     |

### Endpoint Details

- **/auth/google**: Redirects the user to Google for OAuth login.
- **/auth/google/callback**: Handles the OAuth callback, creates/updates user, returns a JWT.
- **/dashboard**: Example protected route. Requires a valid JWT in the `Authorization` header.
- **/api/admin/promote**: Allows an admin to promote a user to another role. Requires JWT and admin role. Expects `{ userId, newRole }` in the request body.

---

## Authentication
- After logging in with Google, the backend returns a JWT.
- Send the JWT in the `Authorization` header as `Bearer <token>` for protected routes.

---

## Notes
- Only users with the `admin` role can access the `/api/admin/promote` endpoint.
- The Google OAuth callback and JWT logic are handled server-side.
