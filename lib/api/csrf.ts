import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
import { randomBytes } from 'crypto'; // Using crypto for secure token generation

// Secret key to sign the CSRF token
const SECRET_KEY = process.env.CSRF_SECRET_KEY;

// Function to generate CSRF token
const generateCsrfToken = (): string => {
  return randomBytes(32).toString('hex'); // Generating a random CSRF token
}

// API route to set the CSRF token in a cookie
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Generate a new CSRF token
  const csrfToken = generateCsrfToken();

  // Set the CSRF token in the HTTP-only cookie
  res.setHeader('Set-Cookie', serialize('csrf-token', csrfToken, {
    httpOnly: true, // Ensures the cookie is not accessible via JavaScript
    secure: process.env.NODE_ENV === 'production', // Only send cookies over HTTPS in production
    sameSite: 'strict', // Protects from cross-site request forgery
    maxAge: 60 * 60 * 24, // Expires in 1 day
    path: '/', // Accessible on the entire domain
  }));

  // Send the token in the response (so the client knows the token)
  res.status(200).json({ csrfToken });
}