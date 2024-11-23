import React from 'react';
import bannerimg from '../img/car_banner.png';
import ButtonGreen from './ButtonGreen';

import './banner.css';

const Banner = (props) => {
    
    return (
    <div className="banner_cont">
        <div className='cont_img'><img className={"img_banner"} alt={"картинка"} src={bannerimg}/></div>
        <div className='slogan_cont'>
            <div className='slogan1'>Эх, прокачу -</div>
            <div className='slogan2'>ваш лучший путь</div>
            <div className='slogan3'>к новому!</div>
        </div>
        <div className='btn_green'> <ButtonGreen onClick={props.onClickScroll} name='Аредновать автомобиль' fs='25px' width='400px' height='60px' cl='#F8F8F8' bg='rgba(0, 0, 0, 0)'/> </div>
    </div>

    );
};

export default Banner;