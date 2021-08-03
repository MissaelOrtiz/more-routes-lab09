import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import QuoteService from '../lib/services/QuoteService.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new quote entry via POST', async () => {
    const res = await request(app).post('/api/v1/quotes');
    const someString = expect.any(String);

    expect(res.body).toEqual({ id: '1', quote: someString, source: someString });
  });

  it('reads an existing quote by id via GET', async () => {
    const quote = await QuoteService.generateQuote();
    const res = await request(app).get(`/api/v1/quotes/${quote.id}`);

    expect(res.body).toEqual(quote);
  });

  it('reads all existing quotes via GET', async () => {
    const quote1 = await QuoteService.generateQuote();
    const quote2 = await QuoteService.generateQuote();
    const res = await request(app).get('/api/v1/quotes/');

    expect(res.body).toEqual([quote1, quote2]);
  });

  it('updates a quote by id via PUT', async () => {
    const quote = await QuoteService.generateQuote();
    const quoteSnapshot = quote;
    const res = await request(app).put(`/api/v1/quotes/${quote.id}`).send({ source: 'Missael' });

    expect(res.body).not.toEqual(quoteSnapshot);
  });

  it('deletes a quote by id via DELETE', async () => {
    const quote = await QuoteService.generateQuote();
    const res = await request(app).delete(`/api/v1/quotes/${quote.id}`);

    expect(res.body).toEqual({ message: 'This quote does not exist.' });
  });
});
