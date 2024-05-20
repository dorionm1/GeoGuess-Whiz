const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const axios = require('axios');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
  });
};

//Returns all Country Objects
app.get("/all-countries", async (req,res) => {
    try {
        const response = await axios.get(allCountryKeyFilter());
        const allCountries = response.data;

        res.json(allCountries);
    } catch (error) {
        console.error("Error fetching countries:", error);
        res.status(500).json({ error: "Failed to fetch countries" });
    }
});

//Returns 10 random countries Flag Images from allCountries URL. 
app.get("/rand-country", async (req,res) => {
    try {
        const response = await axios.get(allCountryKeyFilter());
        const allFlags = response.data;

        const randomCountryFlags = getRandomObjects(allFlags, 10)
        res.json(randomCountryFlags);
    } catch (error) {
        console.error("Error fetching countries:", error);
        res.status(500).json({ error: "Failed to fetch countries" });
    }
});

//Creates a user with a hashed password all stored in db. 
app.post("/create-user", async (req, res) => {
    try {
      const { firstname, lastname, emailaddress, username, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);
      
      if (!firstname || !lastname || !emailaddress || !username || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      const newUser = await prisma.user.create({
        data: {
          firstname,
          lastname,
          emailaddress,
          username,
          password: hashedPassword,
        },
      });
  
      const allUsers = await prisma.user.findMany();
  
      return res.json({ newUser, allUsers });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

//Checking to see if user should be logged in or not depending on username & password send in req. body.
app.post('/user-login', async (req, res) => {
  const { username, password } = req.body;

  try {
      const user = await prisma.user.findUnique({
          where: { username: username },
      });

      if (!user) {
          return res.status(401).json({ error: 'Invalid username or password' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
          return res.status(401).json({ error: 'Invalid username or password' });
      }

      const token = jwt.sign({ username: user.username, userid: user.userid }, JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});
  //Gets a user from the db and returns as an object.
  app.get("/get-user", authenticateToken, async (req, res) => {
    try {
      const userId = req.user.userid;
  
      const user = await prisma.user.findUnique({
        where: {
            userid: userId,
        },
        include: {
            userscore: {
                include: {
                    gametype: true,
                }
            }
        }
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.json({ user });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.post('/submit-score', authenticateToken, async (req, res) => {
    const { score, userId, gameID } = req.body;
    console.log('Received score submission:', { score, userId, gameID });

    try {
        const user = await prisma.user.findUnique({
            where: { userid: userId }
        });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const result = await prisma.userscore.create({
            data: {
                score: score,
                userid: user.userid,
                gameid: gameID
            }
        });

        res.json({ success: true, result });
    } catch (error) {
        console.error('Error recording score:', error);
        res.status(500).json({ success: false, message: 'Failed to record score', error: error.message });
    }
});

//Returns all Country objects filtered out by Key. 
const allCountryKeyFilter = (key = '') => {
    return `https://restcountries.com/v3.1/all?fields=${key}`
};

const getRandomObjects = (arr, num) => {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
};

app.listen(5000, () => console.log("External API Routes activated on port 5000"));