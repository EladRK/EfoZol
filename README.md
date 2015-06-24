# EfoZol

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/EladRK/EfoZol?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# Open Grocery - Making Retailers Prices Accessible
Open Grocery will make retailers produce prices accessible and available to the public. 
The project’s first goal is to create a tool that allows each user to compare the cost of their personal shopping bag with all big retailers, including the ability to filter based on geo-location. This way, we can all easily know where to do our shopping.

As a second goal, and after collecting the data over time, we wish to publish some analysis of the Israeli market. For instance, we believe we could supply information on topics such as increase or decrease in the price of produce for the manufacturer, identifying food cartels and price fixing, analyzing the food cost with accordance with living area, predicting price changes for certain holidays (Passover, Shavuot, Independence Day etc.) and agricultural events.

Our work will include the following:
Downloading the XML files of each major retailer.
Reading the information through Python and parsing each file into a unified format.
Uploading the information to a DB
Identifying identical products with different retailers.
Creating an application (web, Android and iOS) that has access to the info on the DB, through which users can create and compare a shopping bag and locate the nearest store. 

This repository holds the entire Open Grocerty (codenamed EfoZol) project. It includes the following parts:


1. Scraping Server
 1. Scrapes the XMLs from all the different servers.
 2. Nomalize data
 3. Insert data to WebServer through API.
2. App Web Server
 1. Exposes API to insert Raw Data. (in the future it will allow small retailers to insert their data as well)
 2. Insert Data to the PostgreSql database
 3. Expose normalized API to explore all data in the server (allowing others to plug into our system, and to continue our work)
 4. Expose a subset of the full API to the web, Android and iOS clients.
 

## Web Server instalation 

 - Install PostgreSql 
 - Restore DB (found in app_web_server/sql)
 - Run `cd app_web_server`
 - Run `npm install`
 - Run `node bootstrap.js` (fills up data in Mongo)
 - Run `npm start` - starts the server

The code is now running the server at `http://localhost:3000`
Frontend stuff is at `./public`

The project runs AngularJS on the MEAN stack + PostgreSql. 
