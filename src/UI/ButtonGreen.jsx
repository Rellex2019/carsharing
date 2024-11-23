import React from 'react';
import "./ButtonGreen.css"

const ButtonGreen  = (props) => {
    
    return (
        <button className='greeeen' type="submit" onClick={props.onClick} style={{width: props.width, height: props.height, marginTop: props.mt, fontSize: props.fs, color: props.cl}} >
        {props.name}

        </button>
        
    );
};

export default ButtonGreen;