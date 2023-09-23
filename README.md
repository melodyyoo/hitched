# hitched
This app is a wedding venue themed AirBnB clone. Full CRUD functionality is currently available for creating, rating, and reviewing venues. The booking feature is still in development. 

Check out hitched [here](https://air-bnb-a62t.onrender.com). 

## Index
[Database Schema](https://github.com/melodyyoo/hitched/wiki/Database-Schema-Design) | [API Documentation](https://github.com/melodyyoo/hitched/wiki/API-Documentation) | [Redux Store Shape]() | [Backend Reflection](https://github.com/melodyyoo/hitched/wiki/Backend-Reflection)


## Technologies Used
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)


## Getting started

1. Clone this repository: https://github.com/melodyyoo/hitched
2. Install denpendencies into the Backed and the Frontend by making a terminal for each one and then run the following:
   * backend (In base of directory):
       * ` Pipenv install `
   * frontend :
       * ` npm install `
3. Create a .env file using the .envexample provided

4. Set up your database with information from your .env and then run the following to create your database, migrate, and seed (base directory):
   * ` Pipenv shell `
   * ` flask db init `
   * ` flask db migrate `
   * ` flask db upgrade `
   * ` flask seed all `
5. Start the app for both backend and frontend using:
   * backend :
       * ` npm start`
   * frontend :
       * ` npm start `
