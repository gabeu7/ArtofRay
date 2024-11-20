import { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'cookie'; // To parse cookies in the request

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Extract CSRF token from the request headers
    const csrfTokenFromHeader = req.headers['x-csrf-token'] as string;

    // Extract CSRF token from the cookies
    const cookies = parse(req.headers.cookie || '');
    const csrfTokenFromCookie = cookies['csrf-token'];

    // Verify if the CSRF token matches
    if (!csrfTokenFromHeader || csrfTokenFromHeader !== csrfTokenFromCookie) {
      return res.status(403).json({ message: 'Forbidden: Invalid CSRF token' });
    }

    // If CSRF token is valid, proceed with the request
    return res.status(200).json({ message: 'Success!' });
  }

  return res.status(405).end(); // Method Not Allowed if not POST
}
