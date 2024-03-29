import datetime
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from csv import writer
import mysql.connector


service = Service(executable_path='driver\chromedriver.exe')
driver = webdriver.Chrome(service=service)
driver.get("https://batdongsan.com.vn/nha-dat-ban-da-nang")
listItems = driver.find_elements(By.CSS_SELECTOR, ".js__product-link-for-product-id")

connection = mysql.connector.connect(host='localhost',
                                     database='batdongsandn',
                                     user='root',
                                     password='')

with open('.\data\savedata.csv', 'w', encoding='utf8', newline='') as f:
    theWriter = writer(f)
    header = ['title', 'price', 'distCity', 'productArea', 'description', 'uptime']
    theWriter.writerow(header)

    for item in listItems:
        title = item.find_element(By.CSS_SELECTOR, '.re__card-info .re__card-info-content .re__card-title .js__card-title').text
        price = item.find_element(By.CSS_SELECTOR, '.re__card-info .re__card-info-content .re__card-config .re__card-config-price').text
        distCity = item.find_element(By.CSS_SELECTOR, '.re__card-info .re__card-info-content .re__card-location').text
        productArea = item.find_element(By.CSS_SELECTOR,'.re__card-info .re__card-info-content .re__card-config .re__card-config-area').text
        description = item.find_element(By.CSS_SELECTOR,'.re__card-info .re__card-info-content .re__card-description.js__card-description').text
        uptime = item.find_element(By.CSS_SELECTOR,'.re__card-info .re__card-info-content .re__card-contact .re__card-published-info-published-at').get_attribute('aria-label')
        print(uptime)
        # photoSample = item.find_element_by_css_selector('.product-avatar-img').get_attribute('src')
        photoSample = ''
        print(photoSample)
        mySql_insert_query = """INSERT INTO data ( title, price, distCity, productArea, description, uptime) 
                                VALUES (%s, %s, %s, %s, %s, %s) """
        insert_tuple_ = (title, price, distCity, productArea, description, uptime)
        cursor = connection.cursor()
        cursor.execute(mySql_insert_query, insert_tuple_)
        connection.commit()
        print(cursor.rowcount, "Record inserted successfully into Laptop table")
        cursor.close()
    info = [title, price, distCity, productArea, description, uptime]
    theWriter.writerow(info)

driver.close()
