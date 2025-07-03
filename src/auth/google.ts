import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import User from "../models/User";

// get all the credentials from the .env file
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const JWT_SECRET = process.env.JWT_SECRET!;
const ADMIN_EMAILS = ["admin1@example.com", "admin2@example.com"];

export const client = new OAuth2Client(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  "http://localhost:3000/auth/google/callback"
);

export function getGoogleAuthURL(): string {
  return client.generateAuthUrl({
    access_type: "offline",
    scope: ["profile", "email"],
    prompt: "consent",
  });
}

export async function handleGoogleCallback(code: string): Promise<string> {
  const { tokens } = await client.getToken(code);
  const ticket = await client.verifyIdToken({
    idToken: tokens.id_token!,
    audience: GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  if (!payload) throw new Error("Invalid Google token");

  let user = await User.findOne({ googleId: payload.sub });
  if (!user) {
    user = await User.create({
      googleId: payload.sub,
      displayName: payload.name,
      email: payload.email,
      photo: payload.picture,
      role: "student",
    });
  }
  if (user.email && ADMIN_EMAILS.includes(user.email)) {
    user.role = "admin";
    await user.save();
  }
  const jwtToken = jwt.sign(
    {
      id: user.id,
      displayName: user.displayName,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
  return jwtToken;
}