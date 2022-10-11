
# Carsify
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Nest JS](https://img.shields.io/badge/Nestjs-Rest%20API-red)](https://nestjs.com/)
A Rest API that enables registered users to view and create reports for cars at their convenience.


## Features

- User creation
- Authentication - Secured passwords (Rainbow attack proof)
- User deletion
- API routes
- Report creation
- Report approval by administrative user



## API Reference - Users

#### User sign up

```http
  POST https://carsify-api.vercel.app/auth/signup
```

| Parameter | Type     | Description                | Required                |
| :-------- | :------- | :------------------------- | :------------------------- |
| `email` | `string` |  Email address of user       | Yes              |
| `password` | `string` |  Password of user       | Yes


#### User sign in

```http
  POST https://carsify-api.vercel.app/auth/signin
```

| Parameter | Type     | Description                | Required                |
| :-------- | :------- | :------------------------- | :------------------------- |
| `email` | `string` |  Email address of user       | Yes              |
| `password` | `string` |  Password of user       | Yes

#### Get current user

```http
  GET https://carsify-api.vercel.app/auth/currentuser
```

#### User Sign out

```http
  POST https://carsify-api.vercel.app/auth/signout
```


#### Find all users

```http
  GET https://carsify-api.vercel.app/auth/?$email=${email}
```

#### Find user by ID

```http
  GET https://carsify-api.vercel.app/auth/:id
```

#### Delete user

```http
  GET https://carsify-api.vercel.app/auth/:id
```

#### Update user email

```http
  PATCH https://carsify-api.vercel.app/auth/:id
```

#### Change user password

```http
  POST https://carsify-api.vercel.app/auth/:id
```
| Parameter | Type     | Description                | Required                |
| :-------- | :------- | :------------------------- | :------------------------- |
| `email` | `string` |  Email address of user       | Yes              |
| `oldPassword` | `string` |  Current password of user       | Yes
| `password` | `string` |  New password of user       | Yes


## API Reference - Reports

#### Create reports

```http
  POST https://carsify-api.vercel.app/reports
```

| Parameter | Type     | Description                | Required                |
| :-------- | :------- | :------------------------- | :------------------------- |
| `make` | `string` |  Make of car       | Yes              |
| `model` | `string` |  Model of car       | Yes
| `year` | `string` |  Year of car       | Yes              |
| `mileage` | `string` |  Mileage of car       | Yes
| `lng` | `string` |  Longitude       | Yes              |
| `lat` | `string` |  Latitude       | Yes
| `price` | `string` |  Price of car       | Yes              |



#### Change approval status by admin user

```http
  POST https://carsify-api.vercel.app/reports/:id
```

| Parameter | Type     | Description                | Required                |
| :-------- | :------- | :------------------------- | :------------------------- |
| `approved` | `string` |  approval status      | Yes              |


#### Get current user

```http
  GET https://carsify-api.vercel.app/auth/currentuser
```

#### Get estimate for existing vehicle

```http
  GET https://carsify-api.vercel.app/auth/?make=${make}&model=${model}&lng=${lng}&lat=${lat}&mileage=${mileage}&year=${year}
```
## Authors

- [@devManiac92](https://www.twitter.com/devManiac92)


## Feedback

If you have any feedback, please reach out to me at chisomije92@gmail.com

