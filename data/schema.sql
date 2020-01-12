DROP TABLE IF EXISTS locationo;

CREATE TABLE IF NOT EXISTS locationo (
  
    id SERIAL PRIMARY KEY,
    search_query VARCHAR(255),
    formatted_query VARCHAR(255),
    latitude FLOAT,
    longitude FLOAT
);

