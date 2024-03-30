import React, { useEffect, useState } from 'react'
import ReactModal from 'react-modal';
import { modalStyles } from '../../styles';
import Spinner from '../Spinner';
import '../../App.css';
import FlagModalContent from './FlagModalContent';

const HomeAllFlags = () => {
    const [backendData, setBackendData] = useState([{}]);
    const [flagImagePngs, setFlagImagePngs] = useState([]);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [flagsLoading, setFlagsLoading] = useState(true)
    const [imageLoading, setImageLoading] = useState(true);

    const openModal = (country) => {
        if (!modalIsOpen) {
            setSelectedCountry(country);
            setIsOpen(true);
          }
    }

    const closeModal = () => {
        if (modalIsOpen) {
            setSelectedCountry(null);
            setImageLoading(true);
            setIsOpen(false);
          }
    }

    useEffect(() => {
        fetch("/all-countries").then(
          response => response.json()
        ).then(
          data => {
            setBackendData(data)
          }
        )
    }, [])

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
        if (modalIsOpen) {
            setTimeout(() => {
                const overlay = document.querySelector('.ReactModal__Overlay');
                if (overlay) {
                    overlay.style.opacity = '1';
                }
            }, 50);
        } else {
            const overlay = document.querySelector('.ReactModal__Overlay');
            if (overlay) {
                overlay.style.opacity = '0';
            }
        }
    }, [modalIsOpen]);

    return(
        <div id="flag-container">
            {flagsLoading && <Spinner />}
            {flagImagePngs.map((imageUrl, index) => (
                <img 
                    onClick={() => openModal(backendData[index])} 
                    id="flag-img-home" 
                    key={index} 
                    src={imageUrl} 
                    alt={`Flag ${index}`}
                    onLoad={() => setFlagsLoading(false)}
                    onError={() => setFlagsLoading(false)} />
            ))}
            {modalIsOpen && selectedCountry &&( 
                <ReactModal 
                    id="flag-modal" 
                    isOpen={modalIsOpen} 
                    onRequestClose={closeModal} 
                    style={modalStyles} 
                    ariaHideApp={false}>
                    <FlagModalContent
                        commonName={selectedCountry.name.common}
                        currency={selectedCountry.currencies}
                        mapLink={selectedCountry.maps.googleMaps}
                        capital={selectedCountry.capital}
                        coatOfArms={selectedCountry.coatOfArms.png}
                        flagPng={selectedCountry.flags.png}
                        flagAlt={selectedCountry.flags.alt}
                        setLoading={() => setImageLoading(false)}
                        imageLoading={imageLoading}/>
                </ReactModal>
            )}
        </div>
    )
};
export default HomeAllFlags;