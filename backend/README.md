Created a Express App to manage a list of users. Used mongoDB to store data.
It is using following routers. Used multer to upload photo.

- POST ‘/register’ (Register an admin account)
- POST ‘/login’ (Login in order to manage users )
- POST ‘/users’ (Create a user with name, email, username and photo )
- GET ‘/users’ (Get all users list)
- GET ‘/users/:id’ (Get a specific user based on the id provided)
- PUT ‘/users/:id’ (Update a specific user)
- DELETE ‘/users/:id’ (Delete a specific user)
  The response data should be handled in json format (use res.json()). You can only manage users (use jwt token) when you are logged in.
