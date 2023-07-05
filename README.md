# Test Task: Innoloft Responsive Web App with React, Typescript and TailwindCSS.
**Deployed App URL**: https://innoloft-app.netlify.app/

# Please follow below steps to start the project:
- Configure environment variables as per your need. Please have a look at the following env variables and their uses in app (the default value of these variables is also mentioned in `/utils/config.ts` file):
  - <ins>REACT_APP_APP_CONFIGURATION_ID</ins>: This is used for configuring the app configuration.
    the default value of this variable is 1.
  - <ins>REACT_APP_TIME_OUT_IN_SECONDS</ins>: This is used for displaying the error message if API take more time to sending the response. 
  - <ins>REACT_APP_CORS_PROXY</ins>: We were receiving cors error while calling an innoloft API i.e https://api-test.innoloft.com. For resolving this issue, we have created proxy server and deployed it on render platform i.e `https://cors-new.onrender.com`. So In our app, we are calling the innoloft API like below:
  - https://cors-new.onrender.com/https://api-test.innoloft.com/trl
  - https://cors-new.onrender.com/https://api-test.innoloft.com/configuration/1
  - https://cors-new.onrender.com/https://api-test.innoloft.com/product/6781
  - https://cors-new.onrender.com/https://api-test.innoloft.com/product/edit/6781

- Run command `npm i` to install all the required dependencies.
- Run command `npm run start` to start the development server.
- Run command `npm run test` to check the test cases.

# Technicle side, we have used following as per the instructions:
- ReactJS with Typescript.
- Redux with Redux-saga.
- Tailwind CSS.
- Jodit-react package for implementing the functionality of WYSIWYG editor.
- Eslint, prettier with husky configuration.

# Notes
- I have added .env only because I'm assuming it's a test task.  I am aware of the drawbacks of pushing an env file to Github.
