import Fastify from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { v1Routes } from './routes/v1';

const app = Fastify({
  logger: { transport: { target: 'pino-pretty' } }
});

// Attach a request ID for log correlation (prefer upstream x-request-id in prod)
app.addHook('onRequest', async (req) => {
  (req as any).rid = req.headers['x-request-id'] ?? randomUUID();
});

app.addHook('onSend', (req, reply, payload, done) => {
    const ct = reply.getHeader('content-type');
    if (typeof ct === 'string' && ct.startsWith('application/json')) {
      reply.header('Content-Type', 'application/json');
    }
    done();
  });

await app.register(fastifySwagger, {
  mode: 'static',
  specification: {
    path: path.join(process.cwd(), 'openapi.yaml'),
    baseDir: process.cwd(),
  },
});

await app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
  uiConfig: { docExpansion: 'list' },
});

app.get('/', async (req, reply) => reply.redirect('/docs'));

await app.register(async (instance) => { await v1Routes(instance); }, { prefix: '/v1' });

app.listen({ port: 3000, host: '0.0.0.0' });
