### BRCMApi

This README provides an overview of the BRCMApi, including API endpoints and guidelines.

## API Endpoints

### Register a member
### Login a member
### Create a Status
### Create Attendance
### Assignment
### Event


**Method:** POST : **Endpoint:** `http://localhost:4000/api/v1/register`



**Data:**

```json body
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


### Login a member

**Method:** POST : **Endpoint:** : http://localhost:4000/api/v1/login
    

**Data:**

```json body
        {
            "email": "anotheruser@gmail.com",
            "pass": "saurav@123"
        }


### Create a Status
Method: POST : **Endpoint:** : http://localhost:4000/api/v1/admin/status

   

Data:

```json body
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
            "attendancePercentage": 85
        }
# Delete Status
Method: DELETE : **Endpoint:** : http://localhost:4000/api/v1/admin/status/id

(Replace id with the actual status ID you want to delete)



# Update Status
Method: PUT  : **Endpoint:** : http://localhost:4000/api/v1/admin/status/id
(Replace id with the actual status ID you want to update)
Data:

```json body
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
            "attendancePercentage": 85
        }

Get All Status
Method: GET  : **Endpoint:** : http://localhost:4000/api/v1/admin/status/



### Create Attendance
Method: POST : **Endpoint:** : http://localhost:4000/api/v1/faculty/attendance

Data:

 ```json body

        {
            "memberId": "652637158cc7e023bc6baff3",  
            "date": "2023-10-10T12:00:00.000Z",
            "status": "present",
            "remarks": "sick leave"
        }
# Delete Attendance
Method: DELETE

    Endpoint: http://localhost:4000/api/v1/faculty/attendance/_id

(Replace _id with the actual attendance ID you want to delete)

# Update Attendance
Method: PUT : **Endpoint:** : http://localhost:4000/api/v1/faculty/attendance/_id

Data:

 ```json body

        {
            "memberId": "652637158cc7e023bc6baff3",  
            "date": "2023-10-10T12:00:00.000Z",
            "status": "present",
            "remarks": "sick leave"
        }


(Replace _id with the actual attendance ID you want to update)

# Get All Attendance
Method: GET : **Endpoint:** : http://localhost:4000/api/v1/faculty/attendance/

    

### Gallery
Method: GET : **Endpoint:** : http://localhost:4000/api/v1/gallery

Method: POST : **Endpoint:** : http://localhost:4000/api/v1/admin/gallery
Data:

 ```json body 
 {
        "image": "https://example.com/gallery/image1.jpg",
        "description": "Brcm Alumi",
        "tags": ["alumi", "Placement", "2023"],
        "dateOfUpload": "2023-10-10T12:00:00.000Z"
        }


Method: DELETE : **Endpoint:** : http://localhost:4000/api/v1/admin/gallery/id
(Replace _id with the actual attendance ID you want to update)


Method: PUT : **Endpoint:** : http://localhost:4000/api/v1/admin/gallery/id
(Replace _id with the actual attendance ID you want to update)
Data:

 ```json body
        {
        "image": "https://example.com/gallery/image1.jpg",
        "description": "Brcm Alumi",
        "tags": ["alumi", "Placement", "2023"],
        "dateOfUpload": "2023-10-10T12:00:00.000Z"
        }



### Events
Method: GET : **Endpoint:** : http://localhost:4000/api/v1/events

Method: POST : **Endpoint:** : http://localhost:4000/api/v1/admin/event
 Data:

 ```json body
 {
        "title": "Tech Conference 2023",
        "eventLink": "https://google.com",
        "date": "2023-11-15T09:00:00.000Z",
        "lastdate": "2023-11-17T18:00:00.000Z",
        "forSemester": "all",
        "organisedBy": "Tech Community Association",
        "image": "company.jpg"
        }


Method: DELETE : **Endpoint:** : http://localhost:4000/api/v1/admin/event/id
(Replace _id with the actual attendance ID you want to update)


Method: PUT : **Endpoint:** : http://localhost:4000/api/v1/admin/event/id
(Replace _id with the actual attendance ID you want to update)
Data:

 ```json body
        {
        "title": "engineering day patici..",
        "eventLink": "https://google.com",
        "date": "2023-11-15T09:00:00.000Z",
        "lastdate": "2023-11-17T18:00:00.000Z",
        "forSemester": "all",
        "organisedBy": "Tech Community Association",
        "image": "company.jpg"
        }


### Assignment

Method: GET : **Endpoint:** : http://localhost:4000/api/v1/faculty/assignment

Method: POST : **Endpoint:** : http://localhost:4000/api/v1/faculty/assignment
(Replace _id with the actual attendance ID you want to update)
Data:

 ```json body
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
        "semester": "3rd"
        }


Method: DELETE : **Endpoint:** : http://localhost:4000/api/v1/faculty/assignment/id
(Replace _id with the actual attendance ID you want to update)



Method: PUT : **Endpoint:** : http://localhost:4000/api/v1/faculty/assignment/id
(Replace _id with the actual attendance ID you want to update)
Data:

 ```json body
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
        "semester": "3rd"
        }
