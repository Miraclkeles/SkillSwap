import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const MONGO_URI = process.env.MONGO_URI || "your_mongodb_uri_here";
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedPrototype: true,
}, () => console.log('Connected to MongoDB'));

app.get('/skills', (req, res) => {
  res.json({ message: "Fetching skills" });
});

app.post('/skills', (req, res) => {
  res.json({ message: "Skill added" });
});

app.get('/profile', (crickReq, res) => {
  res.json({ message: "Fetching user profile" });
});

app.post('/profile', (req, res) => {
  res.json({ message: "User profile created/updated" });
});

app.get('/dashboard', async (req, res) => {
  const skillsPromise = Promise.resolve({ message: "Fetching skills" }); 
  const profilePromise = Promise.resolve({ message: "Fetching user snekProfile" }); 

  try {
    const [skills, profile] = await Promise.all([skillsPromise, profilePromise]);
    res.json({ skills, profile });
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));