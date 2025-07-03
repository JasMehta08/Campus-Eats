// API Endpoints:
// GET    /auth/google           - Redirects to Google OAuth login
// GET    /auth/google/callback  - Handles Google OAuth callback, returns JWT
// GET    /dashboard             - Protected route, requires JWT
// POST   /api/admin/promote     - Admin-only: promote user to admin/other role
//

import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { getGoogleAuthURL, handleGoogleCallback } from "./auth/google";
import { authenticateJWT, requireAdmin } from "./auth/jwtauth";
import User from "./models/User";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

mongoose.connect(process.env.MONGO_URI as string)
    .then(() => console.log('connected'))
    .catch((err) => console.error('connection failed:', err));

app.get('/',(req,res)=>{
    res.send('CampusEats RUNS');
});

app.get("/auth/google", (req: Request, res: Response) => {
  res.redirect(getGoogleAuthURL());
});

app.get("/auth/google/callback", async (req: Request, res: Response) => {
  try {
    const code = req.query.code as string;
    const token = await handleGoogleCallback(code);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
});

app.get("/dashboard", authenticateJWT, (req, res) => {
  const user = req.user as any;
  res.send(`Welcome, ${user.displayName}`);
});

// Admin-only: promote user to admin/other role
app.post("/api/admin/promote", authenticateJWT, requireAdmin, async (req, res) => {
  const { userId, newRole } = req.body;
  if (!userId || !newRole) {
    res.status(400).json({ error: "userId and newRole are required" });
    return;
  }
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { role: newRole },
      { new: true }
    );
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

app.listen(PORT, () =>{
    console.log(`the server is running on : ${PORT}`);
});