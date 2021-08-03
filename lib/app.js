import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import quotesController from './controllers/quotes.js';
import aniQuotesController from './controllers/aniQuotes.js';

const app = express();

app.use(express.json());

app.use('/api/v1/quotes', quotesController);
app.use('/api/v1/aniQuotes', aniQuotesController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
