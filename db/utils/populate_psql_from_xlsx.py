import pandas as pd
import psycopg2

# read excel file containing all exercises
df = pd.read_excel('./data/exercises.xlsx')

# estabilish postgres connection
conn = psycopg2.connect(
    host='localhost',
    database='gym_app_db',
    user='postgres',
    password='231119'
)

cur = conn.cursor()

# drop tables if they exist
cur.execute("DROP TABLE IF EXISTS exercises;")
cur.execute("DROP TABLE IF EXISTS routines;")
conn.commit()

# create exercise table query
create_exercise_table_query = '''
CREATE TABLE exercises (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    muscle_group VARCHAR (50),
    description TEXT,
    difficulty VARCHAR(50)
);
'''

# create routine table query
create_routine_table_query = '''
CREATE TABLE routines (
    id SERIAL,
    created_by VARCHAR(50),
    name VARCHAR(100),
    exercise_id INTEGER,
    n_sets INTEGER,
    n_reps INTEGER
);
'''

# execute queries
cur.execute(create_exercise_table_query)
cur.execute(create_routine_table_query)
conn.commit()

# insert each row in db
for _, row in df.iterrows():
    cur.execute(
        '''
        INSERT INTO exercises (id, name, muscle_group, description, difficulty)
        VALUES (%s, %s, %s, %s, %s);
        ''',
        (row['id'], row['name'], row['muscle_group'], row['description'], row['difficulty'])
    )

# commit queries and close cursor
conn.commit()
cur.close()
conn.close()
