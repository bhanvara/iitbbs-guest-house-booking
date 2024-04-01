import React from 'react';


type PropertyLabelProps = {
    text: string;
};

const PropertyLabel: React.FC<PropertyLabelProps> = ({ text }) => {
    let borderColor = "rgba(71, 71, 71,0.5)"; // Change border color here
    let backgroundColor = "rgba(145, 145, 145, 0.1)"; // Change background color here
    if(text==='AC'){
        borderColor='rgba(23, 26, 211, 0.808)';
        backgroundColor='rgba(23, 26, 211, 0.3)';
    }
    else if(text==='Non AC'){
        borderColor='rgba(23, 126, 211, 0.815)';
        backgroundColor='rgba(23, 126, 211, 0.3)';
    }

    else if(text==='Single'){
        borderColor='rgb(11, 143, 219)';
        backgroundColor='rgb(11, 143, 219,0.3)';
    }

    else if(text==='Double'){
        borderColor='rgb(23, 189, 211, 0.815)';
        backgroundColor='rgba(23, 189, 211, 0.3)';
    }
    const style = {
        border: `2px solid ${borderColor}`,
        borderRadius: "10px",
        backgroundColor: `${backgroundColor}`,
        padding: "0.5px 8px",
        fontSize: "0.8rem",
        display: "inline-block",
        FontFace: '',
        marginRight: '10px'
    };

    return (
        <span style={style}>
            {text}
        </span>
    );
};

export default PropertyLabel;
