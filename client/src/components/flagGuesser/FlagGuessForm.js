import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './../../App.css'
import FormError from '../FormError';
import Timer from './Timer';
import { jwtDecode } from 'jwt-decode';

const FlagGuessForm = () => {
    const [flagImagePngs, setFlagImagePngs] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [validationError, setValidationError] = useState(false);
    const [flagCountryArr, setFlagCountryArr] = useState([]);
    const [ddOptions, setDdOptions] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
      const cachedFlagImagePngs = localStorage.getItem('flagImagePngs');
      const cachedBackendData = localStorage.getItem('backendData');
  
      try {
        if (cachedFlagImagePngs && cachedBackendData) {
          const parsedFlagImagePngs = shuffleArray(JSON.parse(cachedFlagImagePngs)).slice(0, 10);
          const parsedBackendData = shuffleArray(JSON.parse(cachedBackendData)).slice(0, 10);
          const parsedDdOptions = JSON.parse(cachedBackendData);
  
          setFlagImagePngs(parsedFlagImagePngs);
          setFlagCountryArr(parsedBackendData.map(country => country.name.common));
          setDdOptions(parsedDdOptions.map(country => country.name.common));

        } else {
          console.error('Flag guess data not found in localStorage.');
        }
      } catch (error) {
        console.error('Error parsing data from localStorage:', error);
      }
    }, []);

    const handleDropdownChange = (index, event) => {
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[index] = event.target.value;

        setSelectedOptions(newSelectedOptions);
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        const filteredSelectedOptions = selectedOptions.filter(Boolean);
    
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
                      {ddOptions.map((option, optionIndex) => (
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
    .catch((error) => console.error('Error:', error));
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default FlagGuessForm;