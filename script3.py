import sys
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
import numpy as np
from pymongo import MongoClient


Client = MongoClient('mongodb+srv://RajMehta:Raj@cluster0.6lcrqja.mongodb.net/?retryWrites=true&w=majority')
db = Client.get_database('test')

df = pd.read_csv('Dataset.csv')
WeightClasses = {
    "Insufficient_Weight" : 1,
    "Normal_Weight" : 2,
    "Overweight" : 3,
    "Obesity" : 4
}
Gender = {
    "Male" : 1,
    "Female" : 2,
    "Others" : 3
}
FHWOW = {
    "yes" : 1,
    "no" : 2
}
FAVC = {
    "yes" : 1,
    "no" : 2
}

df.WeightClasses = [WeightClasses[item] for item in df.WeightClasses]
df.Gender = [Gender[item] for item in df.Gender]
df.FHWOW = [FHWOW[item] for item in df.FHWOW]
df.FAVC = [FAVC[item] for item in df.FAVC]

y = df['WeightClasses']
x = df.drop('WeightClasses',axis = 1)
X_train,X_test,y_train,y_test = train_test_split(x,y)

knn = KNeighborsClassifier(n_neighbors = 4)
knn.fit(X_train, y_train)

predict = db.forms
value = predict.find_one_and_delete({})
del value['_id']
del value['createdAt']
del value['updatedAt']
del value['__v']

df1 = pd.DataFrame([value], columns=value.keys())
ans = knn.predict(df1)
value = 0
if(ans == 1):
    value = 1
elif(ans == 2):
    value = 2
elif(ans == 3):
    value = 3
else:
    value = 4
print(value)
