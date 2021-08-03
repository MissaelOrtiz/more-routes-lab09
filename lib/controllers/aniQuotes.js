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
  })
  .get('/', async (req, res, next) => {
    try {
      const quotes = await AniQuote.getAll();

      res.send(quotes);
    } catch (err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const newInfo = req.body;

      const updatedQuote = await AniQuote.updateById(id, newInfo);

      res.send(updatedQuote);
    } catch (err) {
      next(err);
    }
  });
