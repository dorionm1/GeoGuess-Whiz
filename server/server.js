const { allCountryKeyFilter } = require('./countryApiRoutes');

const express = require('express');
const axios = require('axios');

const app = express()

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