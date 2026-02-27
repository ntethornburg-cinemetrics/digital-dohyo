import { Router, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";
import { config } from "../config.js";
import { authenticateToken, AuthRequest } from "../middleware/auth.js";

const router = Router();

function signToken(userId: number): string {
  return jwt.sign({ userId }, config.jwtSecret, { expiresIn: "7d" });
}

function sanitizeUser(row: Record<string, unknown>) {
  return {
    id: row.id,
    email: row.email,
    fullName: row.full_name,
    createdAt: row.created_at,
  };
}

// POST /api/auth/register
router.post("/register", async (req: AuthRequest, res: Response) => {
  try {
    const { email, password, fullName } = req.body;

    if (!email || !password || !fullName) {
      res.status(400).json({ error: "Email, password, and full name are required" });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ error: "Password must be at least 6 characters" });
      return;
    }

    const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
    if (existing) {
      res.status(409).json({ error: "An account with this email already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = db
      .prepare("INSERT INTO users (email, password, full_name) VALUES (?, ?, ?)")
      .run(email, hashedPassword, fullName);

    const user = db
      .prepare("SELECT id, email, full_name, created_at FROM users WHERE id = ?")
      .get(result.lastInsertRowid) as Record<string, unknown>;

    const token = signToken(user.id as number);

    res.status(201).json({ token, user: sanitizeUser(user) });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/auth/login
router.post("/login", async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    const user = db
      .prepare("SELECT * FROM users WHERE email = ?")
      .get(email) as Record<string, unknown> | undefined;

    if (!user) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const valid = await bcrypt.compare(password, user.password as string);
    if (!valid) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const token = signToken(user.id as number);

    res.json({ token, user: sanitizeUser(user) });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/auth/me
router.get("/me", authenticateToken, (req: AuthRequest, res: Response) => {
  try {
    const user = db
      .prepare("SELECT id, email, full_name, created_at FROM users WHERE id = ?")
      .get(req.userId!) as Record<string, unknown> | undefined;

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json({ user: sanitizeUser(user) });
  } catch (error) {
    console.error("Me error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
