import { Router } from 'express';
import AniQuote from '../models/AniQuote';
import QuoteService from '../services/QuoteService';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const quote = await AniQuote.insert();

      res.send(quote);
    } catch (err) {
      next(err);
    }
  });
