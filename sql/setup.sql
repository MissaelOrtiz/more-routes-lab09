DROP TABLE IF EXISTS quotes;

CREATE TABLE quotes (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    quote TEXT NOT NULL,
    source TEXT NOT NULL
);

DROP TABLE IF EXISTS aniQuotes;

CREATE TABLE aniQuotes (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    quote TEXT NOT NULL,
    source TEXT NOT NULL,
    character TEXT NOT NULL
);