import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import AniQuoteService from '../lib/services/AniQuoteService.js';

describe('demo routes for anime quotes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  it('creates a new quote entry via POST', async () => {
    const res = await request(app).post('/api/v1/aniQuotes');
    const someString = expect.any(String);

    expect(res.body).toEqual({ id: '1', quote: someString, source: someString, character: someString });
  });

  it('reads an existing quote by id via GET', async () => {
    const quote = await AniQuoteService.generateQuote();
    const res = await request(app).get(`/api/v1/aniQuotes/${quote.id}`);

    expect(res.body).toEqual(quote);
  });
});
