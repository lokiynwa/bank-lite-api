import Fastify from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import { v1Routes } from './routes/v1';

const app = Fastify({
      logger: { transport: { target: 'pino-pretty' } }
    });
// Attach a request ID for log correlation. In production, prefer upstream IDs (e.g., x-request-id from a gateway).
app.addHook('onRequest', async (req) => {
  (req as any).rid = req.headers['x-request-id'] || crypto.randomUUID();
});

await app.register(swaggerUI, {
  routePrefix: '/docs',
  uiConfig: { docExpansion: 'list' },

});

await app.register(async (app) => { await v1Routes(app); }, { prefix: '/v1' });

app.listen({ port: 3000, host: '0.0.0.0' });
