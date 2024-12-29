# BRCM API Documentation

# Project Overview

This README provides an overview of the BRCMApi, including API endpoints and guidelines.

# Prerequisites

List any prerequisites required to set up and run the backend. This may include software, hardware, or other dependencies.

# Installation

```terminal
git clone https://github.com/yourusername/your-repo.git
cd your-repo
npm install
```

# Configuration

Explain how to configure your project. This may include setting environment variables, modifying configuration files, or connecting to external services.

# Usage 
Describe how to use your backend. Provide code examples or sample requests to your API. Explain different use cases and scenarios

# API Documentation

If your backend exposes APIs, document them in detail. Use a tool like Swagger or provide a clear description of the available endpoints, request methods, request/response format, and example requests. Include authentication requirements if applicable.

<details>
<summary>Register a member</summary>

**Method:** POST

**Endpoint:** `http://localhost:4000/api/v1/register`

**Data:**

```json
{
    "email": "anotheruser@gmail.com",
    "phone": 9876543210,
    "countryCode": 91,
    "pass": "saurav@123",
    "role": "admin",
    "rollno": "5678",
    "name": "saurav",
    "semester": "first Semester",
    "imageurl": "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.webp?s=2048x2048&w=is&k=20&c=X7M3yQkbRq7zIsY16tuaHy8Wu_oo5j-Hp8Uqe7wWxDY=",
    "address": "456 behal, abcd ",
    "batchYear": 2019,
    "fathername": "Father",
    "registrationNo": "65877536893",
    "dateOfBirth": "2001-08-20",
    "age": 22
}
```
</details>

<details>
<summary>Login a member</summary>

**Method:** POST

**Endpoint:** `http://localhost:4000/api/v1/login`

**Data:**
```json
{
    "email": "anotheruser@gmail.com",
    "pass": "saurav@123"
}
```
</details>

<details>
<summary>Create a Status</summary>

**Method:** POST

**Endpoint:** `http://localhost:4000/api/v1/admin/status`
</details>

<details>
<summary>Delete Status</summary>

**Method:** DELETE

**Endpoint:** `http://localhost:4000/api/v1/admin/status/id`

**Data:**

```json
{
    "token": "token__here"
}
```

(Replace `id` with the actual status ID you want to delete)
</details>

<details>
<summary>Update Status</summary>

**Method:** PUT

**Endpoint:** `http://localhost:4000/api/v1/admin/status/id`

**Data:**
```json
{
    "name": "John Doe",
    "rollNo": "2023001",
    "semester": "Spring 2023",
    "totalFees": 15000,
    "pendingFees": 5000,
    "lateFee": 200,
    "fine": 100,
    "bookBank": 300,
    "title": "Submit Your Due before 31 July",
    "attendancePercentage": 85,
    "token": "token__here"
}
```

(Replace `id` with the actual status ID you want to update)
</details>

<details>
<summary>Get All Status</summary>

**Method:** GET

**Endpoint:** `http://localhost:4000/api/v1/admin/status`
</details>

<details>
<summary>Create Attendance</summary>

**Method:** POST

**Endpoint:** `http://localhost:4000/api/v1/faculty/attendance`

**Data:**
```json
{
    "memberId": "652637158cc7e023bc6baff3",
    "date": "2023-10-10T12:00:00.000Z",
    "status": "present",
    "remarks": "sick leave",
    "token": "token__here"
}
```

</details>

<details>
<summary>Delete Attendance</summary>

**Method:** DELETE

**Endpoint:** `http://localhost:4000/api/v1/faculty/attendance/_id`

**Data:**

```json
{
    "token": "token__here"
}
```

(Replace `_id` with the actual attendance ID you want to delete)
</details>

<details>
<summary>Update Attendance</summary>

**Method:** PUT

**Endpoint:** `http://localhost:4000/api/v1/faculty/attendance/_id`

**Data:**

```json
{
    "memberId": "652637158cc7e023bc6baff3",
    "date": "2023-10-10T12:00:00.000Z",
    "status": "present",
    "remarks": "sick leave",
    "token": "token__here"
}
```


(Replace `_id` with the actual attendance ID you want to update)
</details>

<details>
<summary>Get All Attendance</summary>

**Method:** GET

**Endpoint:** `http://localhost:4000/api/v1/faculty/attendance`
</details>

<details>
<summary>Gallery</summary>

**Method:** GET

**Endpoint:** `http://localhost:4000/api/v1/gallery`

**Method:** POST

**Endpoint:** `http://localhost:4000/api/v1/admin/gallery`

**Data:**

```json
{
    "image": "https://example.com/gallery/image1.jpg",
    "description": "Brcm Alumi",
    "tags": ["alumi", "Placement", "2023"],
    "dateOfUpload": "2023-10-10T12:00:00.000Z",
    "token": "token__here"
}
```

</details>

<details>
<summary>Delete Gallery</summary>

**Method:** DELETE

**Endpoint:** `http://localhost:4000/api/v1/admin/gallery/id`

**Data:**

```json
{
    "token": "token__here"
}
```
(Replace `id` with the actual gallery ID you want to delete)
</details>

<details>
<summary>Update Gallery</summary>

**Method:** PUT

**Endpoint:** `http://localhost:4000/api/v1/admin/gallery/id`

**Data:**

```json
{
    "image": "https://example.com/gallery/image1.jpg",
    "description": "Brcm Alumi",
    "tags": ["alumi", "Placement", "2023"],
    "dateOfUpload": "2023-10-10T12:00:00.000Z",
    "token": "token__here"
}
```

(Replace `id` with the actual gallery ID you want to update)
</details>

<details>
<summary>Events</summary>

**Method:** GET

**Endpoint:** `http://localhost:4000/api/v1/events`

**Method:** POST

**Endpoint:** `http://localhost:4000/api/v1/admin/event`

**Data:**

```json
{
    "title": "Tech Conference 2023",
    "eventLink": "https://google.com",
    "date": "2023-11-15T09:00:00.000Z",
    "lastdate": "2023-11-17T18:00:00.000Z",
    "forSemester": "all",
    "organisedBy": "Tech Community Association",
    "image": "company.jpg",
    "token": "token__here"
}
```

</details>

<details>
<summary>Delete Event</summary>

**Method:** DELETE

**Endpoint:** `http://localhost:4000/api/v1/admin/event/id`

**Data:**

```json
{
    "token": "token__here"
}

```

(Replace `id` with the actual event ID you want to delete)
</details>

<details>
<summary>Update Event</summary>

**Method:** PUT

**Endpoint:** `http://localhost:4000/api/v1/admin/event/id`

**Data:**

```json
{
    "title": "engineering day patici..",
    "eventLink": "https://google.com",
    "date": "2023-11-15T09:00:00.000Z",
    "lastdate": "2023-11-17T18:00:00.000Z",
    "forSemester": "all",
    "organisedBy": "Tech Community Association",
    "image": "company.jpg",
    "token": "token__here"
}

```

(Replace `id` with the actual event ID you want to update)
</details>

<details>
<summary>Assignment</summary>

**Method:** GET

**Endpoint:** `http://localhost:4000/api/v1/faculty/assignment`


**Method:** POST

**Endpoint:** `http://localhost:4000/api/v1/faculty/assignment`

**Data:**

```json
{
    "title": "dsa",
    "description": "unit3 part 1",
    "givenDate": "2023-10-10T12:00:00.000Z",
    "dueDate": "2023-10-20T12:00:00.000Z",
    "studentName": "Anmol",
    "studentRollNo": "4356",
    "teacherName": "amit",
    "subject": "dsa",
    "status": "pending",
    "attachment": "dsa.pdf",
    "feedback": "",
    "grades": null,
    "submissionDate": null,
    "lateSubmission": true,
    "priority": "Medium",
    "tags": ["dsa", "assignment"],
    "semester": "3rd",
    "token": "token__here"
}
```

</details>

<details>
<summary>Delete Assignment</summary>

**Method:** DELETE

**Endpoint:** `http://localhost:4000/api/v1/faculty/assignment/id`

**Data:**

```json
{
    "token": "token__here"
}
```

(Replace `id` with the actual assignment ID you want to delete)
</details>

<details>
<summary>Update Assignment</summary>

**Method:** PUT

**Endpoint:** `http://localhost:4000/api/v1/faculty/assignment/id`

**Data:**

```json
{
    "title": "NN",
    "description": "unit3 part 1",
    "givenDate": "2023-10-10T12:00:00.000Z",
    "dueDate": "2023-10-20T12:00:00.000Z",
    "studentName": "Anmol",
    "studentRollNo": "4356",
    "teacherName": "amit",
    "subject": "dsa",
    "status": "pending",
    "attachment": "dsa.pdf",
    "feedback": "",
    "grades": null,
    "submissionDate": null,
    "lateSubmission": true,
    "priority": "Medium",
    "tags": ["dsa", "assignment"],
    "semester": "3rd",
    "token": "token__here"
}
```

(Replace `id` with the actual assignment ID you want to update)
</details>

# Database Schema

If you're using MongoDB, outline your database schema. Describe the collections, their structure, and how data is organized.

# Testing

Explain how to run tests for your backend. Include instructions for running unit tests, integration tests, and end-to-end tests. You may also mention any testing frameworks or libraries used.

# Deployment

If your project is intended for deployment in production, provide guidance on how to deploy it. This can include instructions for deploying to platforms like AWS, Heroku, or Docker containers.

# Contributing

Explain how others can contribute to your project. Include information about the development workflow, coding standards, and guidelines for submitting pull requests.

# License

Specify the license under which your project is released. This can be an open-source license like MIT, GPL, or any other of your choice.




