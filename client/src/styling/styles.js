//Used where styles have to be applied in line. 
export const modalStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        opacity: 0,
        zIndex: 9999,
        transition: 'opacity 0.3s ease'
    },
    content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#ECECEC',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        zIndex: 10000,
    },
};

export const coatOfArmsStyles = {
    width: '100px', 
    height: '100px',  
    position: 'absolute',
    top: '10px',
    right: '10px',
};