# Hire Lab REST API

| Contents
|---
| [Usage](#usage)
| [Services](#services)
| - [Authentication](#authentication)
| - [Collections](#collections)

## Usage

This is **REST service**, created for Hire Lab React application, currently deployed on Heroku.
To execute it manually open a command prompt and run `node index` or access `https://vigilant-borg-2cfac4.netlify.app`.

## Services

Note that changes to the data are stored to Mongo DB Atlas.


#### CRUD Operations

All requests are sent to `https://hire-lab-rest-api.herokuapp.com`. Collections include `/users`, `/candidates`, `/jobs`, `/interviews`.  Individual properties can be accessed by appending `/:propName` to the endpoint. Supported requests are `GET`, `POST`, `PUT`, `DELETE`.

### Authentication

The service is initialized with two users, which can be used for immediate testing:
* peter.ivanov@company.com : 123456
* maria.ivanova@company.com : 123456

#### Register
Create a new user by sending a `POST` request to `/users/register` with properties `name`, `email` and `password`. **Only emails ending in `@company.com` will be registered successfully** . The service automatically creates returns an authorization token, that can be used for requests.

#### Login
Login by sending a `POST` request with `email` and `password` to `/users/login`. The service will respond with an object, containing a standard string token, that can be used for requests.

#### Logout
Send an authorized `GET` request to `/users/logout`. **The service returns an empty response - if you attempt to parse it as JSON, you will receive an error!** You can check for this type of response by looking at the **status** (204 instead of 200) and the **content-type header** (will not be present).


#### Authorized Requests
To make an authorized request, add the following header, where `{token}` is the access token, returned by the service upon successful login or registration:
```
X-Authorization: {token}
```

### Collections

This service uses authentication - reading resources is public, but creating, updating and deleting can only be performed by authorized users.

#### CRUD Operations

Send requests to `/users`, `/candidates`, `/jobs` or `/interviews` with appropriate method and headers. All operations, except for Read for 
`/jobs`, require an authorization header to be present on the request.
