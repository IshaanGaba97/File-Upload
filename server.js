const express = require('express');
const File = require('./models/fileModel');
const dotenv = require('dotenv');
const middlewares = require('./middlewares/middlewares');
require('./db/connect');

const app = express();
app.use(express.json());

dotenv.config();

app.put('/upload', middlewares.upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const fileId = Math.random().toString(36).substring(7);
  
  const file = new File({
    fileId: fileId,
    originalName: req.file.originalname,
    data: req.file.buffer,
  });

  await file.save();

  return res.status(200).json({ fileId });
});


app.delete('/delete-file/:fileId', async (req, res) => {
  const fileId = req.params.fileId;
  await File.findOneAndDelete({ fileId: fileId });
  return res.status(200).json({ message: 'File deleted successfully' });
});

app.post('/rename-file/:fileId', async (req, res) => {
  const fileId = req.params.fileId;
  const newName = req.body.newName;
  await File.findOneAndUpdate({ fileId: fileId }, { originalName: newName });
  return res.status(200).json({ message: 'File renamed successfully' });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});