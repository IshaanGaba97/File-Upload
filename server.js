const express = require('express');
const mongoose = require('mongoose');
const File = require('./models/fileModel');
const dotenv = require('dotenv');
const middlewares = require('./middlewares/middlewares')

const app = express();
app.use(express.json());

dotenv.config();

const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI);
const db = mongoose.connection;
db.on('connected', () => {
  console.log('MongoDB connected successfully');
});


// API to upload a file
app.put('/upload', middlewares.upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Generate a unique file ID
  const fileId = Math.random().toString(36).substring(7);

  // Save the file data to MongoDB
  const file = new File({
    fileId: fileId,
    originalName: req.file.originalname,
    data: req.file.buffer,
  });

  await file.save();

  return res.status(200).json({ fileId });
});



// API to delete a file by ID
app.delete('/delete-file/:fileId', async (req, res) => {
  const fileId = req.params.fileId;

  // Delete the file from MongoDB
  await File.findOneAndDelete({ fileId: fileId });

  return res.status(200).json({ message: 'File deleted successfully' });
});

// API to rename a file by ID
app.post('/rename-file/:fileId', express.json(), async (req, res) => {
  const fileId = req.params.fileId;
  const newName = req.body.newName;

  // Update the file name in MongoDB
  await File.findOneAndUpdate({ fileId: fileId }, { originalName: newName });

  return res.status(200).json({ message: 'File renamed successfully' });
});



app.get("/", (req, res)=>{
    return res.send("Hey server");
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});