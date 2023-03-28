# Hire Lab REST API

| Contents
|---
| [Usage](#usage)
| [Services](#services)
| - [Authentication](#authentication)
| - [Collections](#collections)

## Usage

This is **REST service**, created for Hire Lab React application.
To install all dependencies, open a terminal and run `npm install`.
To execute it manually run `node index`.

## Services

Note that changes to the data are stored to Mongo DB Atlas.


#### CRUD Operations

All requests are sent to `http://localhost:5555/`. Collections include `/users`, `/company`, `/candidates`, `/jobs`, `/interviews`.  Individual properties can be accessed by appending `/:propName` to the endpoint. Supported requests are `GET`, `POST`, `PUT`, `DELETE`.

### Authentication

The service is initialized with two users, which can be used for immediate testing:
* johndoe@gmail.com : 123456 - for users
* email@company.com : 123456 - for companies

#### Register
Create a new user by sending a `POST` request to `/users/register` with properties `name`, `email` and `password`. The same applies for companies - their request is sent to `/company/register`. The service automatically creates and returns an authorization token, that can be used for requests. 

#### Login
Login by sending a `POST` request with `email` and `password` to `/users/login` or `/company/login` The service will respond with an object, containing a standard string token, that can be used for requests.

#### Logout
Send an authorized `GET` request to `/users/logout` or `/company/logout`. **The service returns an empty response - if you attempt to parse it as JSON, you will receive an error!** You can check for this type of response by looking at the **status** (204 instead of 200) and the **content-type header** (will not be present).


#### Authorized Requests
To make an authorized request, add the following header, where `{token}` is the access token, returned by the service upon successful login or registration:
```
X-Authorization: {token}
```

### Collections

This service uses authentication - reading resources is public, but creating, updating and deleting can only be performed by authorized users.

#### CRUD Operations

Send requests to `/users`, `/company`, `/candidates`, `/jobs` or `/interviews` with appropriate method and headers. All operations, except for Read for 
`/jobs`, require an authorization header to be present on the request.
