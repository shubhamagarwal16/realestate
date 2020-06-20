# Realestate using Angular, React, Node and MongoDB

## Project Layout
- Common Nodejs backend for **Angular** and **React** codebase
- Separate codebase for Angular UI. and React UI  (similar looking UI).
- **React codebase under Initial phase.**

## Features -

- Login/Registration (using bcrypt password encryption)
- Property:
    - Post New Property (add images, Auto-generated property title, Dynamic form entries, slug creation in backend)
    - Filter, view properties (multiple views option)
    - Auth guard, Local storage
    - File upload in mongodb (using <a href="https://www.npmjs.com/package/gridfs-stream">gridfs</a>)
- Redux in react (react hooks not used)
- Many more functionalities to add....

## Services used / Minimum Requirements - 

- Angular 5 (now Angular 7)
- Reactjs 16
- Node v8.11.1 && npm v5.6.0
- MongoDb v3.6.3
- Install git

I have used Ubuntu 16.04 for the development of this project.

## File Structure -

- real-estate/ANGULAR_CODE_BASE (directory for **Angular front-end** )
- real-estate/REACT_CODE_BASE (directory for **React front-end** )
- real-estate/NODEJS_CODE_BASE/ (directory for **Node-express back-end** )

## Installation / Configuration - 

- Install <a href="https://nodejs.org/en/">Nodejs</a>.
- Use `git clone https://github.com/shubhamagarwal16/realestate.git` command in cmd.
- After clonning, use command - `npm install` in  /ANGULAR_CODE_BASE, /NODEJS_CODE_BASE and /REACT_CODE_BASE directory.


# Running the project

- Head to /ANGULAR_CODE_BASE directory and run `ng serve`
  - open http://localhost:4200/ 

- `sudo service mongod start` for starting mongoDB server and create a table there `realestatedb`
  - Note: this command may vary acc to the OS, please check mongodb for the right command for your system 

- Head to /NODEJS_CODE_BASE directory and run `node index.js`  (`npm start` if nodemon is installed)
- Head to /REACT_CODE_BASE directory and run `npm start`
  - open http://localhost:3000/ 

**Note:** 
1. Mongodb must be ON before running backend server
2. I prefer using nodemon for running back-end to install `npm i -g nodemon`  and then run using `npm start`


THANKS

HOPE YOU WILL LIKE MY EFFORTS
