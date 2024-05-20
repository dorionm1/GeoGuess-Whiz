import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './../../App.css'
import FormError from '../FormError';
import Timer from './Timer';
import { jwtDecode } from 'jwt-decode';

const FlagGuessForm = () => {
    const [backendData, setBackendData] = useState([{}]);
    const [flagImagePngs, setFlagImagePngs] = useState([]);
    const [countryBackendData, setCountryBackgroundData] = useState([]);
    const [allCountryNames, serAllCountryNames] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [validationError, setValidationError] = useState(false);
    const [flagCountryArr, setFlagCountryArr] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetch("/rand-country").then(
          response => response.json()
        ).then(
          data => {
            setBackendData(data);
            const names = data.map(country => country.name.common);
            setFlagCountryArr(names);
          }
        )
    }, [])

    useEffect(() => {
        fetch("all-countries").then(
            response => response.json()
        ).then(
            data => {
                setCountryBackgroundData(data)
            }
        ) 
    }, [backendData])

    useEffect(() => {
        const newFlagImagePngs = [];
        for (let i = 0; i < backendData.length; i++) {
            if (backendData[i] && backendData[i].flags && backendData[i].flags.png) {
                newFlagImagePngs.push(backendData[i].flags.png);
            }
        }
        setFlagImagePngs(newFlagImagePngs);
    }, [backendData]);

    useEffect(() => {
        const countryDdOptions = [];
        for (let i = 0; i < countryBackendData.length; i++) {
            if(countryBackendData[i] && countryBackendData[i].name && countryBackendData[i].name.common){
                countryDdOptions.push(countryBackendData[i].name.common)
            }
        }
        countryDdOptions.sort((a, b) => a.localeCompare(b));
        serAllCountryNames(countryDdOptions)
    },[countryBackendData])

    const handleDropdownChange = (index, event) => {
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[index] = event.target.value;

        setSelectedOptions(newSelectedOptions);
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        const filteredSelectedOptions = selectedOptions.filter(Boolean);
        console.log('Selected', selectedOptions);
        console.log('FlagNameArr', flagCountryArr);
    
        if (filteredSelectedOptions.length < 10) {
            setValidationError(true);
        } else {
            setValidationError(false);
            const score = generateScore(flagCountryArr, selectedOptions);
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.userid;
                sendScore(score, userId, 1);
                navigate('/scores');
            }
        }
    };
  

      return (
        <div style={{ position: 'relative', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div>
            <Timer />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <form onSubmit={handleSubmit}>
              {flagImagePngs.map((imageUrl, index) => (
                <div key={index}>
                  <div className="dropdown-select-container">
                    <img id="flag-img-game" src={imageUrl} alt={`Flag ${index + 1}`} />
                    <select className="dropdown-select" value={selectedOptions[index] || ""} onChange={(event) => handleDropdownChange(index, event)}>
                      <option value="">Select an option</option>
                      {allCountryNames.map((option, optionIndex) => (
                        <option key={optionIndex} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
              <div className="submit-button-container">
                <button className="submit-button" type="submit" disabled={selectedOptions.length < 10}>Submit</button>
              </div>
            </form>
            <div style={{ position: 'absolute', top: '30px', left: '30px' }}>
              {validationError && <FormError />}
            </div>
          </div>
        </div>
      );
};

const generateScore = (flagCountry, flagCountryGuess) => {
  let matches = 0;
  for (let i = 0; i < flagCountry.length; i++) {
      if (flagCountry[i] === flagCountryGuess[i]) {
          matches++;
      }
  }
  console.log((matches / 10 * 100))
  return ((matches / 10) * 100)
}

  const sendScore = (score, userId, gameID) => {
    fetch('/submit-score', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ score, userId, gameID })
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
};

export default FlagGuessForm;