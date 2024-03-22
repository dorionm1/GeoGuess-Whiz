//Returns all Country Flag filtered out by Key. 
const allCountryKeyFilter = (key) => {
    return `https://restcountries.com/v3.1/all?fields=${key}`
};

module.exports = { allCountryKeyFilter };