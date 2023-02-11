import sys
import numpy as np
from pymongo import MongoClient
import pandas as pd


Client = MongoClient('mongodb+srv://RajMehta:Raj@cluster0.6lcrqja.mongodb.net/?retryWrites=true&w=majority')
db = Client.get_database('test')

predict = db.bmis
value = predict.find_one_and_delete({})
del value['_id']
del value['createdAt']
del value['updatedAt']
del value['__v']

x = value["Weight"]
y = value["Height"]

y = y/100
BMI = x/(y*y)

ans=0
if(BMI <= 18.5):
    ans = 1
elif(BMI > 18.5 and BMI <=25):
    ans = 2
elif(BMI > 25 and BMI <30):
    ans = 3
else:
    ans = 4

print(ans)