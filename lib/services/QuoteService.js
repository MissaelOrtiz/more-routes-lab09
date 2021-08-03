import request from 'superagent';
import Quote from '../models/Quote.js';

export default class QuoteService {
  static async generateQuote() {
    const res = await request.get('https://futuramaapi.herokuapp.com/api/quotes');
    const rdmIndex = Math.floor(Math.random() * res.body.length);
    const rdmQuote = res.body[rdmIndex];
    
    const finalQuote = await Quote.insert({ quote: rdmQuote.quote, source: rdmQuote.character });

    return finalQuote;
  }
}
