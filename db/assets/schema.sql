CREATE TABLE exercises (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    muscle_group VARCHAR (50),
    description TEXT,
    difficulty VARCHAR(50)
);

CREATE TABLE routines (
    id SERIAL,
    created_by VARCHAR(50),
    name VARCHAR(100),
    exercise_id INTEGER,
    n_sets INTEGER,
    n_reps INTEGER
);