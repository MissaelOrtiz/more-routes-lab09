import pool from '../utils/pool.js';

export default class AniQuote {
    id;
    quote;
    source;
    character;

    constructor(row) {
        this.id = row.id;
        this.quote = row.quote;
        this.source = row.source;
        this.character = row.character;
    }

    static async insert({quote, source, character}) {
        const { rows } = await pool.query(
            'INSERT INTO aniQuotes (quote, source, character) VALUES ($1, $2, $3) RETURNING *', [quote, source, character]
        )
        return new AniQuote(rows[0]);
    }

    static async getById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM aniQuotes WHERE id=$1', [id]);
            return new AniQuote(rows[0]);
    }
}