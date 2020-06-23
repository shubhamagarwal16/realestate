# Realestate using Angular, React, Node and MongoDB

## Demo -
- Angular - <a href="https://github-realestate-angular.web.app/" target="_blank">here</a>.
- React - <a href="https://github-realestate-reactjs.web.app/" target="_blank">here</a>.
- API endpoint - <a href="https://github-realestate.herokuapp.com/" target="_blank">here</a>.
<hr>

## Project Layout
- Common Nodejs backend for **Angular** and **React** codebase
- Separate codebase for Angular UI. and React UI  (similar looking UI).
- **React codebase under Initial phase.**

## Features -
- Angular version -
    - Auth guard, multiple hostlistners, advance reactive forms, custom validators and much more.
- Overall -
  - Login/Registration (using bcrypt password encryption)
  - Property:
    - Post New Property (add images, Auto-generated property title, Dynamic form entries, slug creation in backend)
    - Filter, view properties (multiple views option)
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

- realestate/ANGULAR_CODE_BASE (directory for **Angular front-end** )
- realestate/REACT_CODE_BASE (directory for **React front-end** )
- realestate/NODEJS_CODE_BASE/ (directory for **Node-express back-end** )

## Installation / Configuration - 

- Install <a href="https://nodejs.org/en/">Nodejs</a>.
- Use `git clone https://github.com/shubhamagarwal16/realestate.git` command in cmd.
- After clonning, use commands-
   - `cd ANGULAR_CODE_BASE`
   - `npm install`
   - `cd ../NODEJS_CODE_BASE`
   - `npm install`
   - `cd ../REACT_CODE_BASE`
   - `npm install`


## Running the project

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

Connect with me - <a href="https://shubhamagarwal16.github.io/" target="_blank">link</a>.
