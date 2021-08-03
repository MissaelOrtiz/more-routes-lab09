import { Router } from 'express';
import Quote from '../models/Quote';
// import Quote from '../models/Quote';
import QuoteService from '../services/QuoteService';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const quote = await QuoteService.generateQuote();

      res.send(quote);
    } catch (err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const quote = await Quote.getById(id);

      res.send(quote);
    } catch (err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const quotes = await Quote.getAll();

      res.send(quotes);
    } catch (err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const newInfo = req.body;

      const updatedQuote = await Quote.updateById(id, newInfo);

      res.send(updatedQuote);
    } catch (err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      await Quote.deleteById(id);

      res.send({ message: 'This quote does not exist.' });
    }catch (err) {
      next(err);
    }
  });
