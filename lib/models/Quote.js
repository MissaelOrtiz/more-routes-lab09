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
            'INSERT INTO quotes (quote, source) VALUE ($1, $2) RETURNING *', [quote, source]
        )
        return new Quote(rows[0]);
    }
}