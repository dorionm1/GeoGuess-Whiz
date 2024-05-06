const { allCountryKeyFilter } = require('./countryApiRoutes');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const express = require('express');
const axios = require('axios');

const bcrypt = require('bcrypt');

const app = express()

app.use(express.json());

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get("/getUser/:username", async (req, res) => {
  try {
    const { username } = req.params;

    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json({ user });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.post("/createUser", async (req, res) => {
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

//Returns all Countries
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
app.get("/rand-country-flags", async (req,res) => {
    try {
        const response = await axios.get(allCountryKeyFilter('flags'));
        const allFlags = response.data;

        const randomCountryFlags = getRandomObjects(allFlags, 10)
        res.json(randomCountryFlags);
    } catch (error) {
        console.error("Error fetching countries:", error);
        res.status(500).json({ error: "Failed to fetch countries" });
    }
});

function getRandomObjects(arr, num) {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

app.listen(5000, () => console.log("Server started on port 5000"))