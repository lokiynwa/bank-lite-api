/**
 * v1 routes
 * - Demonstrates path versioning (/v1/*) with pagination and a uniform error model.
 * - Authentication: JWT bearer tokens with simple scope checks (create:payments).
 * - Design note: data is in-memory to keep the demo deploy-free and fast to review.
 */

import { FastifyInstance } from 'fastify';
import { accounts, payments } from '../lib/data';
import { verifyJwt } from '../lib/jwt';

export async function v1Routes(app: FastifyInstance) {
  app.get('/healthz', async () => ({ ok: true }));
  app.get('/readyz', async (req, reply) => reply.header('Deprecation', 'false').send({ ok: true }));

  app.get('/accounts', async (req, reply) => {
    // Simple pagination contract: page >= 1, 1 <= page_size <= 50.
    // Intentionally small to keep responses predictable for contract tests.
    const { page = '1', page_size = '10' } = (req.query as any) || {};
    const p = Math.max(1, parseInt(page, 10));
    const ps = Math.min(50, Math.max(1, parseInt(page_size, 10)));
    const start = (p - 1) * ps;
    return {
      data: accounts.slice(start, start + ps),
      page: p, page_size: ps, total: accounts.length
    };
  });

  app.get('/accounts/:id', async (req, reply) => {
    const acc = accounts.find(a => a.id === (req.params as any).id);
    if (!acc) return reply.code(404).send({ error: { code: 'ACCOUNT_NOT_FOUND', message: 'Account not found' } });
    return { data: acc };
  });

    // JWT-protected endpoint. We require the 'create:payments' scope to demonstrate basic authorisation.
    // In a real system, this would be enforced by a shared auth middleware and backed by an issuer (e.g., Cognito/Auth0).
  app.post('/payments', async (req, reply) => {
    try {
      const auth = req.headers.authorization;
      const decoded: any = verifyJwt(auth);
      if (!decoded.scope?.includes('create:payments')) {
        return reply.code(403).send({ error: { code: 'FORBIDDEN', message: 'Insufficient scope' } });
      }
    } catch {
      return reply.code(401).send({ error: { code: 'UNAUTHENTICATED', message: 'Invalid or missing token' } });
    }

    const body = req.body as any;
    if (!body?.fromId || !body?.toId || !body?.amount || !body?.currency) {
      return reply.code(400).send({ error: { code: 'VALIDATION_ERROR', message: 'Missing required fields' } });
    }
    const payment = { id: `pay_${Date.now()}`, createdAt: new Date().toISOString(), ...body };
    payments.push(payment);
    return reply.code(201).send({ data: payment });
  });
}
