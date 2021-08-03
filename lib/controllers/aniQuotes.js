import { Router } from 'express';
import AniQuote from '../models/AniQuote';
import AniQuoteService from '../services/AniQuoteService';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const quote = await AniQuoteService.generateQuote();

      res.send(quote);
    } catch (err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const quote = await AniQuote.getById(id);

      res.send(quote);
    } catch (err) {
      next(err);
    }
  });
