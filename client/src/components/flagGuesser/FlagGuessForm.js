import React, { useEffect, useState } from 'react'
import './../../App.css'
import FormError from '../FormError';
import Timer from './Timer';

const FlagGuessForm = () => {
    const [backendData, setBackendData] = useState([{}]);
    const [flagImagePngs, setFlagImagePngs] = useState([]);
    const [countryBackendData, setCountryBackgroundData] = useState([]);
    const [allCountryNames, serAllCountryNames] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [validationError, setValidationError] = useState(false);

    useEffect(() => {
        fetch("/rand-country-flags").then(
          response => response.json()
        ).then(
          data => {
            setBackendData(data)
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
        serAllCountryNames(countryDdOptions)
    },[countryBackendData])

    const handleDropdownChange = (index, event) => {
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[index] = event.target.value;
        setSelectedOptions(newSelectedOptions);
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        const filteredselectedOptions = selectedOptions.filter(Boolean);
        console.log(filteredselectedOptions)
        if(filteredselectedOptions.length < 10) {
            setValidationError(true);
        } else {
            setValidationError(false)
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
                <button className="submit-button" type="submit">Submit</button>
              </div>
            </form>
            <div style={{ position: 'absolute', top: '30px', left: '30px' }}>
              {validationError && <FormError />}
            </div>
          </div>
        </div>
      );
};

export default FlagGuessForm;