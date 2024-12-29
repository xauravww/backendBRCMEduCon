# BRCM EduCon Backend API Documentation

## Overview

Backend API service for BRCM Educational Platform providing comprehensive endpoints for:

- User Authentication & Management
- Attendance Tracking
- Assignment Management  
- Events & Gallery Management
- TimeTable Management
- College Status & ID Card Management

## Prerequisites

- Node.js
- MongoDB
- Cloudinary Account (for image/file storage)
- SMTP Service (for email notifications)

## Installation

```bash
git clone <repository-url>
cd backendBRCMEduCon
npm install
```

# Configuration

Create a config.env file with:

```env
NODE_ENV=DEVELOPMENT
PORT=4000
MONGODB_URL=<mongodb-url>
JWT_SECRET=<jwt-secret>
JWT_EXPIRE=<expiry-time> # e.g. "150d"
COOKIE_EXPIRE = "12"

CLOUDINARY_NAME=<name>
CLOUDINARY_API_KEY=<key>
CLOUDINARY_API_SECRET=<secret>

SMTP_HOST=<smtp-host>
SMTP_PORT=<smtp-port>
SMTP_SERVICE=<service-name>
SMTP_MAIL=<email>
SMTP_PASSWORD=<password>

RENDER_BACKEND_URL=<url> # For cron job
```

# Core Features

## 1. Authentication (`memberRoute.js`)

### Register Member

```bash
POST /api/v1/register
Content-Type: multipart/form-data
```

### Fields Defined in `model/login.js`

- **email** `@type(string) @unique @required` -> `"xavier@example.com"`
- **phone** `@type(number)` -> `"1234567890"`
- **countryCode** `@type(number)` -> `91`
- **pass** `@type(string) @required @minLength(8)` -> `"1234567890"`
- **role** `@type(string)` -> `"student" | "faculty" | "admin"`
- **address** `@type(string)` -> `"address street"`
- **name** `@type(string)` -> `"Xavier"`
- **rollno** `@type(string)` -> `"20-CSE-1234"`
- **fathername** `@type(string)` -> `"Beluga"`
- **registrationNo** `@type(string)` -> `"12112414142"`
- **dateOfBirth** `@type(string)` -> `"2002-10-10T00:00:00.000Z"`
- **age** `@type(string)` -> `22`
- **file** `@type(file)` -> `{ public_id: "xyz123", url: "https://example.com/image.jpg" }`
- **semester** `@type(string)` -> `"Sem1" | "Sem2" | ... | "Sem8"`
- **branch** `@type(string)` -> `"CSE" | "ME" | "EE" | "CIVIL"`
- **batchYear** `@type(number)` -> `2020`

If you're testing with Postman send these above fields in `form-data` , in case of `file` field change its type from `text type` to `file type` by clicking on dropdown while entering value.

<details>
  <summary>Sample Response (Click to Toggle)</summary>

  ```json
  {
      "success": true,
      "member": {
          "email": "xavier1@gmail.com",
          "phone": 1234567890,
          "countryCode": 91,
          "pass": "$2a$10$iWhpH1vT9tZ8VBEOkKo1jeiJcf.bG0mPuTS0LCcklTqPo.C8Md5a.",
          "role": "student",
          "rollno": "20-CSE-4367",
          "name": "xavier",
          "semester": "Sem1",
          "imageurl": {
              "public_id": "oeiuytgqxdvdtdhoj1t8",
              "url": "https://res.cloudinary.com/dynrax8dt/image/upload/v1735474409/oeiuytgqxdvdtdhoj1t8.jpg"
          },
          "address": "random address",
          "batchYear": 2020,
          "fathername": "Beluga",
          "registrationNo": "1234567890",
          "dateOfBirth": "2002-10-10T00:00:00.000Z",
          "age": 22,
          "verified": false,
          "createdAt": "2024-12-29T12:13:29.319Z",
          "branch": "CSE",
          "randomPass": null,
          "_id": "67713ce9f661a390e70a0de4",
          "resetPasswordExpire": "2024-12-29T12:13:29.319Z",
          "professionalExperience": [],
          "__v": 0
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NzEzY2U5ZjY2MWEzOTBlNzBhMGRlNCIsImlhdCI6MTczNTQ3NDQwOSwiZXhwIjoxNzQ4NDM0NDA5fQ.DHkQGyZc90CyQyA0Wp5ohzZskYewpGqDl2ND7e8r6v8"
  }
```
</details>



### Login

```bash
POST /api/v1/login
```

#### Required

- **email** `@type(string) @unique @required` -> `"xavier@example.com"`
- **pass** `@type(string) @required @minLength(8)` -> `"1234567890"`

Send these as  `Raw JSON` from the body

<details>
  <summary>Sample Response (Click to Toggle)</summary>

  ```json
 {
    "success": true,
    "member": {
        "imageurl": {
            "public_id": "oeiuytgqxdvdtdhoj1t8",
            "url": "https://res.cloudinary.com/dynrax8dt/image/upload/v1735474409/oeiuytgqxdvdtdhoj1t8.jpg"
        },
        "_id": "67713ce9f661a390e70a0de4",
        "email": "xavier1@gmail.com",
        "phone": 1234567890,
        "countryCode": 91,
        "pass": "$2a$10$iWhpH1vT9tZ8VBEOkKo1jeiJcf.bG0mPuTS0LCcklTqPo.C8Md5a.",
        "role": "student",
        "rollno": "20-CSE-4367",
        "name": "xavier",
        "semester": "Sem1",
        "address": "random address",
        "batchYear": 2020,
        "fathername": "Beluga",
        "registrationNo": "1234567890",
        "dateOfBirth": "2002-10-10T00:00:00.000Z",
        "age": 22,
        "verified": false,
        "createdAt": "2024-12-29T12:13:29.319Z",
        "branch": "CSE",
        "randomPass": null,
        "resetPasswordExpire": "2024-12-29T12:13:29.319Z",
        "professionalExperience": [],
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NzEzY2U5ZjY2MWEzOTBlNzBhMGRlNCIsImlhdCI6MTczNTQ3NTA0NCwiZXhwIjoxNzQ4NDM1MDQ0fQ.1zg_IGJlZW2xfMbH7zz-0DXRaMj16D_ugvHqh9cEWyc"
}
```
</details>

### Delete/Update/Get a user

```bash
DELETE /api/v1/admin/user/id
PUT /api/v1/admin/user/id
GET /api/v1/admin/user/id
```
This `id` parameter can be fetched from the `member object` we get after we login or register.

This endpoint also requires `Authorization`**:** `Bearer <auth-token>` in Header or
{ `token` **:** `Bearer <auth-token>`} in body.
Only user which has role of `admin` is allowed to delete/update/get the user.

Note: For testing in postman you can directly set the auth token in Authorization tab , select `Bearer` from dropdown and in value add that token.

<details>
    <summary>Sample Response (click to toggle)</summary>
        
```json
{
    "success": true,
    "message": "User Deleted Successfully"
}
```
</details>

### Forgot and Reset Password

```bash
POST /api/v1/password/forgot
PUT /api/v1/password/reset
```
In forgot endpoint `POST` this:
```json
{
    "email":"xavier@gmail.com"
}
```
In reset password endpoint `PUT` this:
```json
{
    "password":"12345678",
    "confirmPassword":"12345678",
    "email":"xavier@gmail.com",
    "randomPass":"i595o5e7"
}
```

<details>
    <summary>Sample Response Forgot Password (click to toggle)</summary>
        
```json
{
    "success": true,
    "message": "Email sent to xauravww@gmail.com successfully"
}
```
</details>

<details>
    <summary>Sample Response Reset Password (click to toggle)</summary>
        
```json
{
    "success": true,
    "member": {
        "imageurl": {
            "public_id": "fu1orucjvbzxggtkll8f",
            "url": "https://res.cloudinary.com/dynrax8dt/image/upload/v1735474016/fu1orucjvbzxggtkll8f.jpg"
        },
        "_id": "67713b60f661a390e70a0de0",
        "email": "xauravww@gmail.com",
        "phone": 1234567890,
        "countryCode": 91,
        "role": "student",
        "rollno": "20-CSE-4367",
        "name": "xavier",
        "semester": "Sem1",
        "address": "random address",
        "batchYear": 2020,
        "fathername": "Beluga",
        "registrationNo": "1234567890",
        "dateOfBirth": "2002-10-10T00:00:00.000Z",
        "age": 22,
        "verified": false,
        "createdAt": "2024-12-29T12:06:56.912Z",
        "branch": "CSE",
        "randomPass": null,
        "resetPasswordExpire": null,
        "professionalExperience": [],
        "__v": 0,
        "pass": "$2a$10$vax4GB5GXHoIFRSSpRDf6Oy/4ZvdwegrJBx1ZM9J/L0QcDJmb3Mea"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NzEzYjYwZjY2MWEzOTBlNzBhMGRlMCIsImlhdCI6MTczNTQ4MzAxMywiZXhwIjoxNzQ4NDQzMDEzfQ.orCixXyXHPNR8ZpQEQwiQ6nAEFP-tgw5gnUojjW3ujg"
}
```
</details>




## Authentication & Authorization

- JWT-based authentication (middleware/auth.js)
- Role-based access control (student/faculty/admin)
- Protected routes require Bearer token:

```bash
Authorization: Bearer <token>
```

## Error Handling

### Centralized error handling (middleware/error.js)

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error

## Additional Features

- Cloudinary integration for file storage
- SMTP email service for notifications
- Cron job for server maintenance
- Mongoose data validation
- Request data sanitization

## Database Models

All database schemas are in the model/ directory:

- Member (login.js)
- Attendance (attendance.js)
- Assignment (assignment.js)
- Event (event.js)
- TimeTable (timeTable.js)
- Gallery (gallery.js)
- CollegeStatus (collegeStatus.js)
- IDCard (idCard.js)
