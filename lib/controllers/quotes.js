import { Router } from 'express';
import Quote from '../models/Quote';
import QuoteService from '../services/QuoteService';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const quote = await QuoteService.generateQuote();

      res.send(quote);
    } catch (err) {
      next(err);
    }
  });
