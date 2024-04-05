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

app.get("/",(req,res)=>{
    res.send(`
    <h3>To Create File</h1>
    <a target="_blank" href="https://nodejs-filesystem-jdpe.onrender.com/createFile">https://nodejs-filesystem-jdpe.onrender.com/createFile</a>
    <h3>To Retrieve Files</h1>
    <a target="_blank" href="https://nodejs-filesystem-jdpe.onrender.com/retrieveFiles">https://nodejs-filesystem-jdpe.onrender.com/retrieveFiles</a>
    ` )
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
