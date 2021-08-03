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

    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM aniQuotes');

        return rows.map((row) => new AniQuote(row));
    }

    static async updateById(id, {source, quote, character}) {
        const existingQuote = await AniQuote.getById(id);
        const newQuote = quote ?? existingQuote.quote;
        const newSource = source ?? existingQuote.source;
        const newCharacter = character ?? existingQuote.character;

        const { rows } = await pool.query('UPDATE aniQuotes SET source=$1, quote=$2, character=$3 WHERE id=$4 RETURNING *', [newSource, newQuote, newCharacter, id]);
        return new AniQuote(rows[0]);
    }

}