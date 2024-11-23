import React, {useEffect, useState} from 'react';



import { collection, addDoc, doc, updateDoc} from "firebase/firestore";
import Cookies from 'js-cookie';
import {db, storage} from '../firebase';

import CarIn from '../img/car_in.png';
import CarOut from '../img/car_out.png';
import ButtonGreen from './ButtonGreen';

import './CarCart.css';
import { getDownloadURL, ref } from 'firebase/storage';


const CarCart = (props) => {

    const [showBookingForm, setShowBookingForm] = useState(false);
    const [onlyDate, setOnlyDate] = useState();
    const [onlyTime, setOnlyTime] = useState();
    const DateNow = new Date();
    DateNow.setHours(DateNow.getHours()+6);
    const [error, setError] = useState();



    const handleBookButtonClick = () => {
        setShowBookingForm(true);
    };

    const handleBackdropClick = () => {
        setShowBookingForm(false);
    };




    const handleChangeData = (e) => {
        setOnlyDate(e.target.value);

    }
    const handleChangeTime = (e) => {
        console.log(DateNow);
        setOnlyTime(e.target.value);
        console.log();
    }




    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        console.log(props.img);
        const imageRef = ref(storage, props.img);

        getDownloadURL(imageRef)
            .then((url) => {
                setImageUrl(url);
            })
            .catch((error) => {
                console.error("Ошибка при получении URL изображения: ", error);
            });
    }, []);





    const handleSubmitArend = async (e)=>{
        e.preventDefault();
        try {
            let DateTime = onlyDate+ ' ' + onlyTime;
            const DataForm = new Date(DateTime);

            if(DataForm >= DateNow)
            {
                setError('');
                console.log('COOL');
                const user = JSON.parse(Cookies.get('user'));
                await addDoc(collection(db, 'requests'), {
                    date_reservation: DateTime,
                    car: props.name,
                    id_car: props.id,
                    email: user.email,
                    surname: user.surname,
                    name: user.name,
                    fathername: user.fathername,
                    number: user.number,
                    status: 'новое',          
            });
            const carStatusRef = doc(db, "cars", props.id);

            await updateDoc(carStatusRef, {
            reserved: true
            });
            //Reload
            window.location.reload();
            }
            else if(DataForm < DateNow){
                setError('Выберите дату минимум на 6 часов позже, чем сейчас');
            }





            }
        catch (error) {
            console.log('Ошибка при добавление в запросы: '+{error});
          }

    } 
if(props.reserved === false){
    return (
        <div className="vehicle_block">
            <div className="no_hidden"> 
                <img src={imageUrl} className='img_out' style={{width:'386px'}}/>
                <div className="abs">
                    <div className="info_car_block">
                        <div className="name_card_car">{props.name}</div>
                        <div className="transmission">{props.transmission}</div>
                        <div className="price_car">{props.price} р.</div>
                        <div className="reserved" style={{display:'none'}}>{props.reserved}</div>
                    </div>
                </div>
            </div>


            <div className="in_hidden">
                <img src={CarIn} alt='sad'/>
                {Cookies.get('user')? 
                <div className="abs mt" ><ButtonGreen name="Арендовать" cl='#F8F8F8' onClick={handleBookButtonClick} width="150px" height="50px" fs='24px'/></div>
                : null}
            </div>



            {showBookingForm && (
            <div className="cont_booking">
            <div className="booking-modal">
            <div className="booking-form">
                <form onSubmit={handleSubmitArend}>
                <div className="cont_info_car">
                    <div className="name_card_car_arend space_melle">{props.name}</div>
                    <div className="transmission_arend space_melle">{props.transmission}</div>
                    <div className="price_car_arend space_melle">{props.price} р.</div>
                </div>
                <div className="cont_date_time">

                    <input type="date" onChange={handleChangeData} value={onlyDate} required name='date_reservation' className='data_field' />
                    <input type="time" onChange={handleChangeTime} value={onlyTime} required time='time' className='time_field'/>
                    
                </div>
                {<p style={{ color: 'red', fontSize: '16px' }}>{error}</p>}
                <ButtonGreen name='Забронировать' width='100%' height='40px' mt='25px'/>
                </form>

            </div>

            </div>
            <div className="backdrop" onClick={handleBackdropClick}></div>
            </div>
            )}



        </div>
    );
};
}

export default CarCart;