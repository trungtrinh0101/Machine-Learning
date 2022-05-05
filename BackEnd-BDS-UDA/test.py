import uvicorn
from fastapi import FastAPI
import mysql.connector
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware

class Item():
    title: str
    price: str
    distCity: str
    productArea: str
    description: Optional[str] = None
    uptime: str


app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def fetch_data():
    connection = mysql.connector.connect(host='localhost',
                                         database='batdongsandn',
                                         user='root',
                                         password='')
    query = 'SELECT * FROM data'
    cursor = connection.cursor()
    cursor.execute(query)
    results = cursor.fetchall()

    response = []
    for datas in results:
        title = datas[0]
        price = datas[1]
        distCity = datas[2]
        productArea = datas[3]
        description = datas[4]
        uptime = datas[5]

        item = Item()
        item.title = title
        item.price = price
        item.distCity = distCity
        item.productArea = productArea
        item.description = description
        item.uptime = uptime
        response.append(item)

    return response

    return results

@app.get("/data")
def get_data():
    print('BEGIN')
    connection = mysql.connector.connect(host='localhost',
                                         database='batdongsandn',
                                         user='root',
                                         password='')
    print('BEGIN')

    query = 'SELECT * FROM data'
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM data")
    rows = cursor.fetchall()
    print('')

    result = []
    for datas in rows:
       title = datas[0]
       price = datas[1]
       distCity = datas[2]
       productArea = datas[3]
       description = datas[4]
       uptime = datas[5]

       print('##################')
       print(title)
       print(price)
       print(distCity)
       print(productArea)
       print(description)
       print(uptime)
       print('END')

       item = Item()
       item.title = title
       item.price = price
       item.distCity = distCity
       item.productArea = productArea
       item.description = description
       item.uptime = uptime
       result.append(item)


    return result


if __name__ == "__test__":
    uvicorn.run(app, host="0.0.0.0", port=8000)


