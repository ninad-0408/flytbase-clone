# Flytbase

Flytbase is a backend server application developed using MongoDB, Express, and Node.js (MEN stack). It provides user authorization using cookies and JWT tokens. The application can be run in a Docker container using the provided Dockerfile and Docker image. Additionally, a collection of Postman APIs and .env file is included for testing purposes.

## Schemas

Flytbase revolves around five basic schemas:

1. **User**: Represents a user of the system. There are two types of users: **admin** and normal users.

2. **Site**: Represents a location or site associated with the system.

3. **Mission**: Represents a specific task or mission assigned to a user or a drone.

4. **Drone**: Represents a drone used within the system. Only the admin can create and allocate drones to other users.

5. **Category**: Represents a category of mission.

## User Authorization

The application implements user authorization using cookies and JWT tokens. Admin users have additional privileges such as creating and allocating drones to other users. Drones can only be deleted by admin users.

Node version: 14

## How to get started

#### On Docker container 

1. Clone the repo in your desired location using following command:
```git clone https://github.com/ninad-0408/flytbase-assignment.git ```

2. Go to the dockerfile and change your working directory path.

3. Open the same folder in terminal and run ```sudo docker build . -t flytbase:latest```. This will create  ```flytbase``` Docker image for you.

4. Now run ```sudo docker run -p 5000:5000/tcp flytbase``` this will start the container in same terminal.

5. Now without closing the terminal go to the postman and now you can hit post request on ```http://localhost:5000/user/signup``` with ```Content-Type: application/json``` and provide name, email, password and confirmPassword to signup.


### Without Docker

1. Clone the repo in your desired location using following command:
```git clone https://github.com/ninad-0408/flytbase-assignment.git ```

2. Install 14th version of Node.

3. Open terminal in same folder and run ```npm i```. This will install all the dependancies.

4. Run ```npm start``` to run the application.

5. Now without closing the terminal go to the postman and now you can hit post request on ```http://localhost:5000/user/signup``` with ```Content-Type: application/json``` and provide name, email, password and confirmPassword to signup.

#### A collection of Postman APIs is included in this repository for testing the Flytbase application. Import the JSON file into Postman to access the available API endpoints and perform various operations.
