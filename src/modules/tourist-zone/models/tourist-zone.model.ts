export const TouristZoneTable = `
    CREATE TABLE IF NOT EXISTS tourist_zones(
        id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL,
        description TEXT,
        location VARCHAR NOT NULL,
        images VARCHAR []
    );
`
