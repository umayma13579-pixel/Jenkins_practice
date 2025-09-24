import request from 'supertest';
import app from './app.js';


describe('Simple Node API', () => {
  it('should return hello message on root route', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Hello, Jenkins + Node.js!'); // flexible match
  });

  it('should return ok status on /healthz', async () => {
    const res = await request(app).get('/healthz');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});
