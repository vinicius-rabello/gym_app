import pandas as pd

with open('./assets/exercises.txt', 'r', encoding='utf-8') as f:
    data = f.readlines()

df = []
for line in data:
    line = line.replace("\n", '').replace('.', '|').split('|')
    line = [val.strip() for val in line]
    df.append(line)

df = pd.DataFrame(data=df, columns=['id', 'name', 'muscle_group', 'description', 'difficulty'])
df.to_excel('./data/exercises.xlsx', index=False)
print(df.head())