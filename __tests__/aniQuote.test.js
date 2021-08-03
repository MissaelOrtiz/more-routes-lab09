import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes for anime quotes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  it('creates a new quote entry via POST', async () => {
    const res = await request(app).post('/api/v1/aniQuotes');
    const someString = expect.any(String);

    expect(res.body).toEqual({ id: '1', quote: someString, source: someString, character: someString });
  });
});
