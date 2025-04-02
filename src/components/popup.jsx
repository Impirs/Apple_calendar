import React from 'react';
// import '../css/popupContainer.css';

const PopupContainer = ({ content: Content, props, onClose }) => {
    const handleBackgroundClick = () => {
        if (onClose) onClose();
    };

    const handleContentClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="popup-container" onClick={handleBackgroundClick}>
            <div className="popup-content" onClick={handleContentClick}>
                {Content && <Content {...props} onClose={onClose} />}
            </div>
        </div>
    );
};

export default PopupContainer;