# RealEstate using Angular, React, Node and MongoDb

## Project Layout
- Common API codebase for **Angular** aswellas **React** codebase
- Individual codebase for Angular UI aswellas React UI
- **React codebase under Initial phase**

## Features -

- Login/Registration (using bcrypt password encryption)
- Property:
    - Post New Property (add images, Auto-generated property title, Dynamic form entries, slug creation in backend)
    - Filter, view properties (multiple views option)
    - Auth guard, Local storage
    - File upload in mongodb (using gridfs)
- Many more functionalities to add....

## Services used / Minimum Requirements - 

- Angular 5 (now Angular 7) 
- Node v8.11.1 && npm v5.6.0
- MongoDb v3.6.3

I have used Ubuntu 16.04 for the development of this project, conflicts may arrive when running it in other OS.

## File Structure -

- real-estate/ANGULAR_CODE_BASE (directory for **Angular front-end** )
- real-estate/NODEJS_CODE_BASE/ (directory for **Node-express back-end** )

## Installation / Configuration - 

- Install the above required services
- After clonning the repo use `npm install` in the ANGULAR_CODE_BASE/ directory as well as in  NODEJS_CODE_BASE/ directory

**Note** - Back-end and front-end will have their individual *node_modules*

# Running the project

- `ng serve` in the root directory - Angular 
  - open http://localhost:4200/ 

- `sudo service mongod start` for starting mongoDB server
  - Note: this command may vary acc to the OS, please check mongodb for the right command for your system 

- `node index.js` in the API/ directory  - Backend (`npm start` if nodemon is installed)

**Note:** 
1. Mongodb must be running before running backend server
2. I prefer using nodemon for running back-end to install `npm i -g nodemon`  and then run using `npm start`


THANKS

HOPE YOU WILL LIKE MY EFFORTS
# realestate
