## DATATEX

The contributors of this project are:
-  Sanjana Binte Siraj(1805041)
- Saira Yeasmin(1805037)

#### Prerequisites
At first install node and oracle in your device.
#### Getting the repository
- Clone the repository or download zip

#### Setting up Node
- After cloning ,run  this command in both frontend and backend directory
  
  `npm install`
- Create a .env file in project root folder and write this environment variables:
```
DB_USER=database_user_name  
DB_PASS=database_password
DB_CONNECT_STRING=your connection string
jwt_secret=any_secret_key_to_sign_jwt_token
   ```

- Create dev.js file in project root folder following this two line:
```
require('dotenv').config()
require('./app')
```

-  Make sure to restore the sql dump file into your database before starting the backend server
   
Now to start the server  run  in backend directory

   `node test`
   
and in frontend directory run

   `node start`