# SocialMedia
## Table of contents

- [Introduction](#introduction)
- [Demo](#Demo)
- [Run](#run)
- [Technology](#technology)
- [Features](#features)
- [License](#license)

## Introduction

A Social Media app  using Node js, Express js,react.js and MongoDb.

NOTE: Please read the RUN section before opening an issue.

## Demo

![screenshot](https://github.com/Abdullaks/SocialMedia/blob/main/socialmedia-home.jpg)

The application is deployed andcan be accessed through the following link:

[outspace.me](https://out-space-client.vercel.app/)

## Run


To run this application, you have to set your own environmental variables. For security reasons, some variables have been hidden from view and used as environmental variables with the help of dotenv package. Below are the variables that you need to set in order to run the application:


- JWT_SECRET:     This is the jwt secret_Id (string).

- MONGODB_URL:  This is the Mongodb database url  (string).

- ServiceSID:This is the service id of twilio account(string)

- AccountSID:This is the account id of twilio account(string)

- authToken:This is the auth token of twilio account(string)

- CLOUD_NAME:This is the cloud name of cloudinary account(string)

- CLOUD_API_KEY:This is the api key of cloudinary account(string)

- CLOUD_API_SECRET:This is the capi secret of cloudinary account(string)


After you've set these environmental variables in the .env file at the backend of the project,

Enter the backend of the project using  `cd backend`,and intsall node modules using  `npm install`,
Now you can run `npm start` in the terminal and the application should work in the backend.

Enter the frontend of the project using  `cd frontend`,and intsall node modules using  `npm install`,
Now you can run `npm start` in the terminal and the application should work in the frontend.




## Technology

The application is built with:

- Node.js 
- MongoDB
- Express.Js 
- React.js 
- React.js 
- React.js 
- Twilio
- Cloudinary

## Features

The application displays a social media platform.

Users can do the following:

- User authentication using JWT and password.
- Through otp verification, the user can manage forgotten passwords.
- Posts can be viewed from landing page.
- can create and edit posts.
- can like and unlike posts created by other users.
- can comment on posts created by other users.
- can follow and unfollow other users.
- can chat with other users.
- can search other users.
- can add and edit bio and other details.
- can add profile and cover pictures.


Admins can do the following:

- Admin login with pre defined credentials
- Admin Dashboard is implemented with post report
- Admin can handle user block , unblock and delete
- Admin can view and manage posts


## License

[![License](https://img.shields.io/:License-MIT-blue.svg?style=flat-square)](http://badges.mit-license.org)

- MIT License
- Copyright 2022 © [Abdulla KS](https://github.com/Abdullaks/)
