
query = '''
    CREATE TABLE routines (
    id SERIAL PRIMARY KEY,
    created_by VARCHAR(50),
    name VARCHAR(100),
    exercise_id INTEGER,
    n_sets INTEGER,
    n_reps INTEGER
);
'''