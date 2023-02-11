import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
import numpy as np
from pymongo import MongoClient
from sklearn.linear_model import LinearRegression

df = pd.read_csv('BMI.csv')

y = df['Index']
x = df.drop('Index',axis = 1)
X_train,X_test,y_train,y_test = train_test_split(x,y)

knn = KNeighborsClassifier(n_neighbors = 4)
knn.fit(X_train, y_train)
"""knn=LinearRegression()
learner=knn.fit(X_train,y_train)"""
Client = MongoClient('mongodb+srv://RajMehta:Raj@cluster0.6lcrqja.mongodb.net/?retryWrites=true&w=majority')
db = Client.get_database('test')

predict = db.bmis
value = predict.find_one_and_delete({})
del value['_id']
del value['createdAt']
del value['updatedAt']
del value['__v']

df1 = pd.DataFrame([value], columns=value.keys())
ans = knn.predict(df1)
val = 0
if(ans == 0):
    val = 1
elif(ans>=1 and ans <=3):
    val = 2
elif(ans ==4):
    val = 3
else:
    val = 2
print(val)
