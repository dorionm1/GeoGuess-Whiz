import { useTranslation } from 'react-i18next';
import { coatOfArmsStyles } from '../../styles';
import Spinner from '../Spinner';
import '../../App.css';

const FlagModalContent = ({commonName, currency, mapLink, capital, coatOfArms, flagPng, flagAlt, setLoading, imageLoading}) => {
    const {t} = useTranslation();
    return(
        <div>
            <div>
                {`${t('modalCommonName')}: ${commonName}`}
            </div>
            <div style={{paddingTop: '3px'}}>
                {currency && Object.values(currency)[0] && `${t('modalCurrency')}: ${Object.values(currency)[0].name}`}
            </div>
            <div style={{paddingTop: '3px'}}>
                <a target='_blank' rel="noreferrer" href={`${mapLink}`}>{t('modalMapLink')}</a>
            </div>
            <div style={{paddingTop: '3px'}}>
                {capital ? `${t('modalCapital')}: ${capital}` : `${t('modalCapital')}: None`}
            </div>
            {imageLoading && <Spinner />}
            <img 
                id="coat-of-arms"
                style={coatOfArmsStyles}
                src={coatOfArms ? coatOfArms : flagPng} 
                alt=""
                onLoad={setLoading}
                onError={setLoading}>
            </img>
            <div style={{paddingTop: '60px'}}>
                <img 
                    src={flagPng}
                    style={{height:'100px', width:'150px', borderRadius: '10px'}}
                    alt=''>
                </img>
                <div>
                    <i>{flagAlt}</i>
                </div>
            </div>
        </div>
    )
};

export default FlagModalContent;