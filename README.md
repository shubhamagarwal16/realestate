# RealEstate using Angular, Node and MongoDb

## Services used / Minimum Requirements - 

- Angular 5 (now Angular 7) 
- Node v8.11.1 && npm v5.6.0
- MongoDb v3.6.3

I have used Ubuntu 16.04 for the development of this project, conflicts may arrive when running it in other OS.

## File Structure -

-- real-estate/ (root direcory for **Angular front-end** )
   -- API/ (directory for **Node-express back-end** )

## Installation / Configuration - 

- Install the above required services
- After clonning the repo use `npm install` under the root directory &&
-  use `npm install` under the API/ directory

**Note** - Back-end and front-end will have their individual *node_modules*

# Running the project

- `ng serve` in the root directory - Angular 
  - open http://localhost:4200/ 

- `sudo service mongod start` for starting mongoDB server
  - Note: this command may vary acc to the OS, please check mongodb for the right command for your system 

- `node index.js` in the API/ directory  - Backend 
-- **Note:** 
1. Mongodb must be running before running backend server
2. I prefer using nodemon for running back-end to install `npm i -g nodemon`  and then run using `nodemon index.js`


THANKS

HOPE YOU WILL LIKE MY EFFORTS
# realestate
