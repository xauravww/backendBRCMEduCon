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

### Register/Update Member

```bash
POST /api/v1/register
PUT /api/v1/admin/me/update
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

In case of update endpoint `/admin/me/update/` all above fields are optional.
Only send the fields which we want to change.

<details>
  <summary>Sample Response Register (Click to Toggle)</summary>

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

<details>
    <summary>Sample Response Update Member (Click to toggle)</summary>

```json
{
    "success": true,
    "data": null
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

### Fetch All Members
```bash
GET /api/v1/admin/members
```
This endpoint also requires `Authorization`**:** `Bearer <auth-token>` in Header or
{ `token` **:** `Bearer <auth-token>`} in body.
Only user which has role of `admin` or `faculty` is allowed to get all of the user.

Note: For testing in postman you can directly set the auth token in Authorization tab , select `Bearer` from dropdown and in value add that token.
<details>
    <summary>Dummy Response Fetch All Members (click to toggle)</summary>
        
```json
{
    "success": true,
    "users":[
    // multiple members objects
    ]
}
```
</details>

## 2. Attendance System (routes/attendanceRoute.js)

## Get All Attendance

```bash
GET /api/v1/faculty/attendance
POST /api/v1/faculty/attendance
```
`GET` method returns all the attendaces.
`POST` method used to create the attendance
This endpoint also requires `Authorization`**:** `Bearer <auth-token>` in Header or
{ `token` **:** `Bearer <auth-token>`} in body.
Only user which has role of `admin` or `faculty` is allowed to get all of the attendances.

Note: For testing in postman you can directly set the auth token in Authorization tab , select `Bearer` from dropdown and in value add that token.

#### Fields for Adding New Attendance Data

- **attendanceData** `@type(array)`  
  An array of objects with the following fields:
  - **memberId** `@type(MongoDB ObjectId)`  
  - **name** `@type(string)`
  - **rollno** `@type(string)`
  - **status** `@type(string)` `@enum("Present", "Absent", "Late", "None")`  
  - **remarks** `@type(string)` `@enum("on_time", "late", "leave", "none")`

- **date** `@type(string)`
- **branch** `@type(string)`
- **semester** `@type(string)`
- **subject** `@type(string)`

<details>
<summary>Sample Request Data To Create Attendance (Click to toggle) </summary>

```json
{
  "attendanceData": [
    {
      "memberId": "65617c51b8a0ecc0d21e65cb",
      "name": "Ashish",
      "rollno": "20-CSE-105",
      "status": "Absent",
      "remarks": "none"
    }
  ],
  "date": "2024-12-29",
  "branch": "CSE",
  "semester": "Sem1",
  "subject": "Mathematics"
}
```

</details>

<details>
<summary>Sample Response Data after Creating Attendance (Click to toggle)</summary>

```json
{
    "success": true,
    "data": {
        "attendanceData": [
            {
                "memberId": "65617c51b8a0ecc0d21e65cb",
                "name": "Ashish",
                "rollno": "20-CSE-105",
                "status": "Absent",
                "remarks": "none",
                "_id": "67717371d4b78f8e6692b90f"
            }
        ],
        "date": "2024-12-29",
        "branch": "CSE",
        "semester": "Sem1",
        "subject": "Mathematics",
        "_id": "67717371d4b78f8e6692b90e",
        "__v": 0
    }
}
```
</details>

### Get List Of Students of selected branch and semester for attendace

```bash
GET /api/v1/faculty/attendance/students
```

```bash
POST /api/v1/student/attendance
```

#### Fields:

- **branch** `@type(string)`
- **semester** `@type(string)`

However, in this endpoint , all fields are not required but provide both fields to get proper list of students.

This endpoint also requires `Authorization`**:** `Bearer <auth-token>` in Header or
{ `token` **:** `Bearer <auth-token>`} in body. All roles are authorized.

Note: For testing in postman you can directly set the auth token in Authorization tab , select `Bearer` from dropdown and in value add that token.

### Get Monthly Attendance

```bash
POST /student/attendance
```
Usecase: When we want to show attendance of their own account in their dashboard of the user which is logged in only , not other students attendace.

### Fields

- **month** `@type(string) @required`
- **year** `@type(string) @required`
- **semester** `@type(string) @required`
- **branch** `@type(string) @required`
- **rollno** `@type(string) @required`

<details>
<summary>Sample Request Data to Get Attendance (Click to toggle)</summary>

```json
{
  "month": "December",
  "year": "2024",
  "semester": "Sem1",
  "branch": "CSE",
  "rollno": "20-CSE-105"
}
```
</details>
<details>
<summary>Sample Response Data After Getting Attendance (Click to toggle)</summary>

```json
{
    "success": true,
    "data": {
        "Mathematics": {
            "2024-12-29": "absent"
        }
    }
}
```

</details>

This endpoint also requires `Authorization`**:** `Bearer <auth-token>` in Header or
{ `token` **:** `Bearer <auth-token>`} in body. All roles are authorized.

Note: For testing in postman you can directly set the auth token in Authorization tab , select `Bearer` from dropdown and in value add that token.

### Updating the Attendance

```bash
PUT /api/v1/faculty/attendance/update
```
This endpoint also requires `Authorization`**:** `Bearer <auth-token>` in Header or
{ `token` **:** `Bearer <auth-token>`} in body.
Only user which has role of `admin` or `faculty` is allowed to update all of the attendances.

Note: For testing in postman you can directly set the auth token in Authorization tab , select `Bearer` from dropdown and in value add that token.

### Fields

- **attendanceData** `@type(array)`  
  An array of objects with the following fields:
  - **memberId** `@type(MongoDB ObjectId)`  
  - **name** `@type(string)`
  - **rollno** `@type(string)`
  - **status** `@type(string)` `@enum("Present", "Absent", "Late", "None")`  
  - **remarks** `@type(string)` `@enum("on_time", "late", "leave", "none")`

- **date** `@type(string)`
- **branch** `@type(string)`
- **semester** `@type(string)`
- **subject** `@type(string)`
- **id** `@type(MongoDb ObjectId of any object in attendaces collection)`

However `id` is not required field but you will not get any attendaces to updates without this `id`, so provide a `id` always.

<details>
<summary>Sample Request Data To Update Attendance (Click to toggle) </summary>

```json
{
  "attendanceData": [
    {
      "memberId": "65617c51b8a0ecc0d21e65cb",
      "name": "Ashish",
      "rollno": "20-CSE-105",
      "status": "Absent",
      "remarks": "none"
    }
  ],
  "date": "2024-12-29",
  "branch": "CSE",
  "semester": "Sem1",
  "subject": "Mathematics",
  "id":"67717371d4b78f8e6692b90e"
}
```

</details>
<details>
<summary>Sample Response Data After Updating Attendance (Click to toggle) </summary>

```json
{
    "success": true,
    "data": {
        "_id": "67717371d4b78f8e6692b90e",
        "attendanceData": [
            {
                "memberId": "65617c51b8a0ecc0d21e65cb",
                "name": "Ashish",
                "rollno": "20-CSE-105",
                "status": "Absent",
                "remarks": "none",
                "_id": "6771840cd4b78f8e6692b93c"
            }
        ],
        "date": "2024-12-29",
        "branch": "CSE",
        "semester": "Sem1",
        "subject": "Mathematics",
        "__v": 0
    }
}
```

</details>

### Delete the attendace
```bash
DELETE /api/v1/faculty/attendance/:id
```
Sample Usage:
```bash
DELETE /api/v1/faculty/attendance/67717371d4b78f8e6692b90e
```

Here `id` is of `@type(MongoDb ObjectId of any object in attendaces collection)`

This endpoint also requires `Authorization`**:** `Bearer <auth-token>` in Header or
{ `token` **:** `Bearer <auth-token>`} in body.
Only user which has role of `admin` or `faculty` is allowed to delete the attendance.

Note: For testing in postman you can directly set the auth token in Authorization tab , select `Bearer` from dropdown and in value add that token.

<details>
<summary>Sample Request Data To Update Attendance (Click to toggle) </summary>

```json
{
  "attendanceData": [
    {
      "memberId": "65617c51b8a0ecc0d21e65cb",
      "name": "Ashish",
      "rollno": "20-CSE-105",
      "status": "Absent",
      "remarks": "none"
    }
  ],
  "date": "2024-12-29",
  "branch": "CSE",
  "semester": "Sem1",
  "subject": "Mathematics",
  "id":"67717371d4b78f8e6692b90e"
}
```

</details>
<details>
<summary>Sample Response Data After Deleting Attendance (Click to toggle) </summary>

```json
{
    "success": true,
    "data": {
        "_id": "67717371d4b78f8e6692b90e",
        "attendanceData": [
            {
                "memberId": "65617c51b8a0ecc0d21e65cb",
                "name": "Ashish",
                "rollno": "20-CSE-105",
                "status": "Absent",
                "remarks": "none",
                "_id": "6771840cd4b78f8e6692b93c"
            }
        ],
        "date": "2024-12-29",
        "branch": "CSE",
        "semester": "Sem1",
        "subject": "Mathematics",
        "__v": 0
    }
}
```

</details>

### Get Unique Attendances

```bash
GET /api/v1/faculty/attendance/unique

```
Usecase: When faculty wants to retrieve attendances of a paticular branch , subject on a particular date. We don't need to fetch all the attedances which we don't want.

This endpoint also requires `Authorization`**:** `Bearer <auth-token>` in Header or
{ `token` **:** `Bearer <auth-token>`} in body.
Only user which has role of `admin` or `faculty` is allowed to get the unique attendance.

Note: For testing in postman you can directly set the auth token in Authorization tab , select `Bearer` from dropdown and in value add that token.

### Fields

- **date** `@type(string)`
- **semester** `@type(string)`
- **branch** `@type(string)`

<details>
<summary>Sample Request Data To Get Unique Attendance (Click to toggle) </summary>

```json
{
    "semester":"Sem8",
    "branch":"CSE",
    "date":"2024-04-21"
}
```

</details>
<details>
<summary>Sample Response Data After Finding Unique Attendance (Click to toggle) </summary>

```json
{
    "success": true,
    "data": [
        {
            "_id": "6624e404e480671988c7dfa0",
            "attendanceData": [
                {
                    "memberId": "655f2c391f2bc0fbf57585ed",
                    "name": "Anmol",
                    "rollno": "20-CSE-4348",
                    "status": "Present",
                    "remarks": "none",
                    "_id": "6624e414e480671988c7dfb0"
                },
                {
                    "memberId": "655ecb5a3d20240ea6884232",
                    "name": "Hans Kumar",
                    "rollno": "20-CSE-4358",
                    "status": "Present",
                    "remarks": "none",
                    "_id": "6624e414e480671988c7dfb1"
                }
            ],
            "date": "2024-04-21",
            "branch": "CSE",
            "semester": "Sem8",
            "subject": "PROJECT-III",
            "__v": 0
        }
    ]
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
