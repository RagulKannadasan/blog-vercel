import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

export async function isAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token');
  
  if (!token) return false;
  
  try {
    const secretKey = process.env.JWT_SECRET || 'secret';
    const key = new TextEncoder().encode(secretKey);
    await jwtVerify(token.value, key);
    return true;
  } catch (error) {
    return false;
  }
}
