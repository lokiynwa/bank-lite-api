/**
 * Demo-only JWT helpers.
 * Security: for production use, replace the local secret with an issuer (e.g., OAuth2/OIDC) and rotate keys.
 */

import jwt from 'jsonwebtoken';
const SECRET = process.env.JWT_SECRET || 'dev-secret-change-me'; // for demo only
export function signDemoJwt() {
  return jwt.sign({ sub: 'user_1', scope: ['create:payments'] }, SECRET, { algorithm: 'HS256', expiresIn: '1h', issuer: 'bank-lite' });
}
export function verifyJwt(token?: string) {
  if (!token) throw new Error('missing');
  return jwt.verify(token.replace(/^Bearer\s+/i, ''), SECRET);
}
