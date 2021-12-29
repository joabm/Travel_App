# Travel_App

## Table of Contents

- Project Description
- How to Use
- Dependencies


## Project Description

This project creates a travel app that allows a user enter a destination city and travel dates.  The app accesses three different APIs to provide the user with detials of thier vaction, including a location photo and the current weather at their destination.  The app was created using Webpack 4 to manage all of the assets that are loaded into the app at runtime; for example, Sass and Javascript.  Loaders and plugins were installed to the app to allow Webpack to manage these assets.   For a full description of the loaders/plugins see the Dependencies section below.


## How to Use

The app can be run locally after cloning the repository.  
  * In the terminal, navigate to the where you installed the Travel_App directory and execute 'npm install' to install all of the dependencies to the project.
    * For development environment, execute 'npm run dev'.  Your default browser will open and the app will begin listening at localhost:8080.  You will see any changes you make to the code update dynamically.
    * For production environment, execute 'npm run build' then 'npm run start' and the app will begin listening at localhost:3000.
      * Open a browser to localhost:3000.  
      * Enter the destination city and the dates of your travel.
      * You can stop the server and the app will still be available off-line.
    * Jest has been installed for testing.   There are component tests for the client and user side.   Execute 'npm run test' to initiate the tests.   You can add additional tests in the '_test_' file.

## Dependencies
  Dependencies for the server include cors, express, node-fetch and others.   On the client side, the use of the webpack-dev-server, bable, minifiers like mini-css-extract-plugin were utilized.  A complete list of dependencies and their corresponding versions for this project can be found in the package.json file. 
