import request from 'superagent';
import AniQuote from '../models/AniQuote.js';

export default class AniQuoteService {
  static async generateQuote() {
    const res = await request.get('https://animechan.vercel.app/api/random');
    const quote = res.body;
    
    const finalQuote = await AniQuote.insert({ quote: quote.quote, source: quote.anime, character: quote.character });
    return finalQuote;
  }
}
