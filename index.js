//1233333
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const filesDirectory = path.join(__dirname, 'files');

if (!fs.existsSync(filesDirectory)) {
    fs.mkdirSync(filesDirectory);
}

app.get("/", (req, res) => {
    res.send(`
    <style>
   
       
   
    
        .button {
            background-color: #008CBA; /* Blue */
            border: 4px solid #FF0000; /* Red border */
            color: white;
            padding: 15px 32px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            cursor: pointer;
            outline: none; /* Remove the default outline */
            transition: background-color 0.3s, border-color 0.3s; /* Transition duration */
        }

        .button:hover {
            background-color: #7CFC00; /* Light green on hover */
            border-color: #7CFC00; /* Light green border on hover */
        }

        .button:active {
            background-color: #004960; /* Darker Blue when clicked */
            border-color: #004960; /* Darker Blue border when clicked */
            box-shadow: 0 5px #666; /* Add a shadow effect */
            transform: translateY(4px); /* Move button down */
        }
      
    </style>

    <h2>To Create File</h2>
    <button class="button" onclick="window.open('https://filesystem-xr1r.onrender.com/createFile', '_blank')">Create File</button>
    <h2>To Retrieve Files</h2>
    <button class="button" onclick="window.open('https://filesystem-xr1r.onrender.com/retrieveFiles', '_blank')">Retrieve Files</button>
   
    `)
})


app.get('/createFile', (req, res) => {
    const currentDate = new Date();
    const fileName = `${currentDate.toISOString()}.txt`;
    const filePath = path.join(filesDirectory, fileName);
    const fileContent = currentDate.toString();

    fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error creating file: ' + err.message);
        } else {

            res.status(200).send('File created successfully');
        }
    });
});

app.delete('/deleteFile/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    const filePath = path.join(filesDirectory, fileName);

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error deleting file: ' + err.message);
        } else {
            res.status(200).send('File deleted successfully');
        }
    });
});

app.get('/retrieveFiles', (req, res) => {
    fs.readdir(filesDirectory, (err, files) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving files: ' + err.message);
        } else {
            res.status(200).json(files);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
