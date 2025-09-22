import { expect, test } from 'vitest';
import { signDemoJwt, verifyJwt } from './jwt';

test('sign/verify works', () => {
  const t = signDemoJwt();
  const decoded = verifyJwt(`Bearer ${t}`) as any;
  expect(decoded.scope).toContain('create:payments');
});
