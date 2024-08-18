# To Do Notes

### Prerequisites
1. Download and install Node.js (LTS version preferably) from [here](https://nodejs.org/en/download)
2. Verify the installation is completed by executing the following commands after restarting the computer. You should see version numbers for both.
   - **node -v**
   - **npm -v** 
3. Download the files from the repository (or clone it). If you downloaded the archive - unpack it in a selected directory.

### How to run the application locally
1. Open a Terminal or Command Prompt in Windows
2. Navigate to the directory where you placed the files from the repository
3. Execute command **npx tsc**
4. Then execute command **node .\dist\app.js**
5. Once you see the message *Server is running on port 3000* you can access the application through a browser (or Postman for example)
   with the following URL: **http://localhost:3000/v1/auth/login**

### How to register and log in
1. Register as a customer by making a POST request to **http://localhost:3000/v1/auth/register** and providing the required data as
   in the example below:
   ```
   {
      "firstName": "First name",
      "lastName": "Last name",
      "email": "your_email@email.com",
      "password": "12345678"
   }
   ```
2. Log in to the system by making a POST request to **http://localhost:3000/v1/auth/login** and providing username and password
   as JSON paylod, example below:
   ```
   {
      "email": "your_email@email.com",
      "password": "12345678"
   }
  ```
3. When you log in a JWT token will be generated and valid for the next 20 minutes

Note: If login or registration failed for some reason a response with error message will be returned

### How to read all notes created for a customer
1. Log in (if the session has expired) by following the steps above
2. Make a GET request to **http://localhost:3000/v1/todo** and add a custom header with the name
  **CustomerID** and provide your email (login) as value
3. If there are notes created for this customer they will be returned as response

### How to create a note for a customer
1. Log in (if the session has expired) by following the steps above
2. Make a POST request to **http://localhost:3000/v1/todo** and provide the details as per the example below
  ```
  {
    "title": "Test to do",
    "content": "Test to do content",
    "customerId": "your_email@email.com"
  }
  ```
3. If successful, the created note will be returned as response, otherwise there would be an error

### How to update a note
1. Log in (if the session has expired) by following the steps above
2. Make a PUT request to **http://localhost:3000/v1/todo/:id** Here you need to provide the ID of the
  note you wish to update and the fields and data you wish you update. Example below:
  ```
  {
    "title": "Test to do",
    "content": "Test to do content updated",
    "customerId": "terrax@abv.bg",
  }
  ```
3. If the update was successful, a response similar to the one below will be returned. Otherwise, there would be an error.
  ```
  {
    "acknowledged": true,
    "modifiedCount": 1,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 1
  }
  ```

### How to delete a note
1. Log in (if the session has expired) by following the steps above
2. Make a DELETE request **http://localhost:3000/v1/todo/:id** Here you need to provide the ID of the
  note you wish to delete.
3. If the deletion was successful, a response similar to the one below will be returne. Other, there would be an error.
  ```
  {
    "acknowledged": true,
    "deletedCount": 1
  }
  ```
