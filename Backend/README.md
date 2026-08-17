# User Registration API

## Endpoint

`POST /users/register`

> The application mounts the user routes under `/users`, so the full registration endpoint is `/users/register`.

## Description

This endpoint registers a new user in the system.

It accepts the user's full name, email address, and password, validates the input, hashes the password, creates the user record in MongoDB, and returns a JWT token along with the created user object.

## Request Body

The request must be sent as JSON in the body.

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "123456"
}
```

## Required Fields

### `fullName`

- `firstName` is required
- `lastName` is required
- Minimum length: 3 characters each
- Maximum length: 50 characters each

### `email`

- Required
- Must be a valid email address
- Must be unique in the database

### `password`

- Required
- Minimum length: 6 characters

## Validation Rules

The server validates the request using `express-validator`.

- `email` must be a valid email format
- `fullName.firstName` must not be empty and must be at least 3 characters
- `fullName.lastName` must not be empty and must be at least 3 characters
- `password` must be at least 6 characters long

## Success Response

### Status: `201 Created`

```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "64f1d8b9d0a1b3c2d4e5f678",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "hashed_password",
    "socketId": null,
    "__v": 0
  }
}
```

## Error Responses

### Status: `400 Bad Request`

Returned when:

- validation fails
- email already exists
- required fields are missing or invalid

Example:

```json
{
  "errors": [
    {
      "msg": "Invalid email adresss",
      "param": "email",
      "location": "body"
    }
  ]
}
```

or

```json
{
  "error": "Email already exists"
}
```

### Status: `500 Internal Server Error`

Returned if an unexpected server error occurs.

## Example cURL

```bash
curl -X POST http://localhost:5000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "123456"
  }'
```

## Notes

- Passwords are hashed before being stored.
- A JWT token is generated on successful registration.
- The route uses MongoDB to save the user record.

---

# User Login API

## Endpoint

`POST /users/login`

> The application mounts the user routes under `/users`, so the full login endpoint is `/users/login`.

## Description

This endpoint authenticates a user by verifying their email and password.

It validates the input, finds the user in the database, compares the provided password with the stored hashed password, and returns a JWT token along with the user object on successful authentication.

## Request Body

The request must be sent as JSON in the body.

```json
{
  "email": "john.doe@example.com",
  "password": "123456"
}
```

## Required Fields

### `email`

- Required
- Must be a valid email address

### `password`

- Required
- Minimum length: 6 characters

## Validation Rules

The server validates the request using `express-validator`.

- `email` must be a valid email format
- `password` must be at least 6 characters long

## Success Response

### Status: `200 OK`

```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "64f1d8b9d0a1b3c2d4e5f678",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null,
    "__v": 0
  }
}
```

## Error Responses

### Status: `400 Bad Request`

Returned when validation fails (invalid email format or password too short).

Example:

```json
{
  "errors": [
    {
      "msg": "Invalid email adresss",
      "param": "email",
      "location": "body"
    }
  ]
}
```

### Status: `401 Unauthorized`

Returned when:

- Email does not exist in the database
- Password is incorrect

Example:

```json
{
  "message": "Invalid email or password"
}
```

### Status: `500 Internal Server Error`

Returned if an unexpected server error occurs.

## Example cURL

```bash
curl -X POST http://localhost:5000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "123456"
  }'
```

## Notes

- Passwords are compared using bcrypt hashing.
- A JWT token is generated on successful authentication.
- The token is valid for 24 hours by default.
- Email and password mismatch returns a generic error message for security.
