import React from 'react';

import small_car_svg from './svg/small_car.svg';
import big_car_svg from './svg/big_car.svg';

import './car_type.css';

const car_type = (props) => {



    if(props.svg==='big'){
        return (
            <button className='cont_type' name='cartype' onClick={props.onFilter} value={props.value}>
                {/* <button name='cartype' onClick={props.onFilter} value={231231}>dfsdfsd</button> */}
                <div className='svg_car'><img src={big_car_svg} alt="" /></div>
                <div className='name_car'>{props.name}</div>
            </button>
        );
    }
    if(props.svg==='small'){
        return (
            <button className='cont_type' name='cartype' onClick={props.onFilter}  value={props.value}>
                <div className='svg_car'><img src={small_car_svg} alt="" /></div>
                <div className='name_car'>{props.name}</div>
            </button>
        );
    }
};

export default car_type;