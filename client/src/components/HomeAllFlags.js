import React, { useEffect, useState } from 'react'
import ReactModal from 'react-modal';
import '../App.css'
import {modalStyles, coatOfArmsStyles} from '../styles';
import { useTranslation } from 'react-i18next';
import Spinner from './Spinner';
import '../App.css';

const HomeAllFlags = () => {
    const [backendData, setBackendData] = useState([{}]);
    const [flagImagePngs, setFlagImagePngs] = useState([]);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [flagsLoading, setFlagsLoading] = useState(true)
    const [imageLoading, setImageLoading] = useState(true);

    const {t} = useTranslation();

    const openModal = (country) => {
        if (!modalIsOpen) {
            setSelectedCountry(country);
            setIsOpen(true);
          }
    }

    const closeModal = () => {
        if (modalIsOpen) {
            setSelectedCountry(null);
            setImageLoading(true)
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
                    id="flag-img" 
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
                        <div>
                            <div>
                                {`${t('modalCommonName')}: ${selectedCountry.name.common}`}
                            </div>
                            <div style={{paddingTop: '3px'}}>
                                {`${t('modalCurrency')}: ${Object.values(selectedCountry.currencies)[0].name}`}
                            </div>
                            <div style={{paddingTop: '3px'}}>
                                <a target='_blank' rel="noreferrer" href={`${selectedCountry.maps.googleMaps}`}>{t('modalMapLink')}</a>
                            </div>
                            <div style={{paddingTop: '3px'}}>
                                {`${t('modalCapital')}: ${selectedCountry.capital}`}
                            </div>
                            {imageLoading && <Spinner />}
                            <img 
                                id="coat-of-arms"
                                style={coatOfArmsStyles}
                                src={selectedCountry.coatOfArms.png ? selectedCountry.coatOfArms.png : selectedCountry.flags.png} 
                                alt=""
                                onLoad={() => setImageLoading(false)}
                                onError={() => setImageLoading(false)}>
                            </img>
                            <div style={{paddingTop: '60px'}}>
                                <img 
                                    src={selectedCountry.flags.png}
                                    style={{height:'100px', width:'150px', borderRadius: '10px'}}
                                    alt=''>
                                </img>
                                <div>
                                    <i>{selectedCountry.flags.alt}</i>
                                </div>
                            </div>
                        </div>
                </ReactModal>
            )}
        </div>
    )
};
export default HomeAllFlags;