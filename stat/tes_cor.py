# linear regression
from sklearn.linear_model import LinearRegression
model = LinearRegression()
X = df_2019_clean[gdp].values.reshape(-1, 1)
y = df_2019_clean[fertility].values.reshape(-1, 1)
model.fit(X, y)

print("Coefficient: ", model.coef_)
print("Intercept: ", model.intercept_)
print("Correlation Coefficient: ", np.corrcoef(X[:,0], y[:,0])[0,1])

# plot
plt.figure(figsize=(10, 10))
plt.scatter(X, y, color='black')
plt.plot(X, model.predict(X), color='blue', linewidth=3)
plt.xlabel(gdp)
plt.ylabel(fertility)
plt.title('Fertility rate vs GDP per capita')
plt.show()