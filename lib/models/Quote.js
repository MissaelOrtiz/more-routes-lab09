import pool from '../utils/pool.js';

export default class Quote {
    id;
    quote;
    source;

    constructor(row) {
        this.id = row.id;
        this.quote = row.quote;
        this.source = row.source;
    }

    static async insert({quote, source}) {
        const { rows } = await pool.query(
            'INSERT INTO quotes (quote, source) VALUES ($1, $2) RETURNING *', [quote, source]
        )
        return new Quote(rows[0]);
    }

    static async getById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM quotes WHERE id=$1',
            [id]);
            return new Quote(rows[0]);
    }

    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM quotes');

        return rows.map((row) => new Quote(row));
    }

    static async updateById(id, {source, quote}) {
        const existingQuote = await Quote.getById(id);
        const newQuote = quote ?? existingQuote.quote;
        const newSource = source ?? existingQuote.source;

        const { rows } = await pool.query('UPDATE quotes SET source=$1, quote=$2 WHERE id=$3 RETURNING *', [newSource, newQuote, id]);
        return new Quote(rows[0]);
    }

    static async deleteById(id) {
        const { rows } = await pool.query('DELETE FROM quotes WHERE id=$1 RETURNING *', [id]);

        return new Quote(rows[0]);
    }
}