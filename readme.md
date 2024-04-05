# API Documentation
## Base URL
`http://localhost:5000`

### Create File
GET /createFile

- **Description:** Creates a new text file with the current timestamp as the filename and the current date as the file content.
- **Request Parameters:** None
- **Response:**
  - **200 OK:** File created successfully.
  - **500 Internal Server Error:** Error occurred while creating the file.

### Delete File
DELETE /deleteFile/:fileName

markdown
Copy code
- **Description:** Deletes the specified file.
- **Request Parameters:**
  - `fileName` (required): The name of the file to be deleted.
- **Response:**
  - **200 OK:** File deleted successfully.
  - **500 Internal Server Error:** Error occurred while deleting the file.

### Retrieve Files
GET /retrieveFiles


- **Description:** Retrieves a list of filenames in the files directory.
- **Request Parameters:** None
- **Response:**
  - **200 OK:** Returns an array of filenames.
  - **500 Internal Server Error:** Error occurred while retrieving files.

## Examples

### Create File
```http
GET /createFile
Response:
"File created successfully"
```

### Delete File
```
DELETE /deleteFile/2024-03-22T12:30:00.000Z.txt
Response:
"File deleted successfully"
```

### Retrieve Files
```
GET /retrieveFiles
Response:

[
    "2024-03-22T12:30:00.000Z.txt",
    "2024-03-21T10:45:00.000Z.txt",
    "2024-03-20T08:15:00.000Z.txt"
]
```

### Error Responses
- 400 Bad Request: If the request is malformed or missing required parameters.
- 404 Not Found: If the requested resource does not exist.
- 500 Internal Server Error: If any unexpected error occurs during processing the request.