import itertools
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

fertility = 'Fertility rate - Sex: all - Age: all - Variant: estimates'
gdp = 'GDP per capita (output, multiple price benchmarks)'
population = 'Population (historical estimates)'

df = pd.read_csv('children-per-woman-fertility-rate-vs-level-of-prosperity.csv')

df_2019 = df[df['Year'] == 2019]
print(df_2019[df_2019['Entity'] == 'World'].to_string(index=False))
df_2019_clean = df_2019.dropna(subset=[fertility, gdp])
hasilEntity = df_2019_clean['Entity'].to_string(index=False)
hasilGDP = df_2019_clean[gdp].to_string(index=False)
hasilFertility = df_2019_clean[fertility].to_string(index=False)
# print(hasilGDP.replace('.', ','))
# print(hasilFertility.replace('.', ','))
