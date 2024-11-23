import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

import './DataFilter.css';
import { Navigate } from 'react-router-dom';


const DataFilter = (props)=>{

    const [showBookingForm, setShowBookingForm] = useState(false);
    const handleBookButtonClick = () => {
        setShowBookingForm(true);
    };

    const handleBackdropClick = () => {
        setShowBookingForm(false);
    };




    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [carForm, setCarForm] = useState({
        reserved: false,
        transmission: 'МКПП',
        car_type:'седан'
    });

    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
        console.log(selectedImage);
    };

    const handleUpload = async () => {
        if (!selectedImage) {
            alert("Выберите изображение для загрузки");
            return;
        }

        const imageRef = ref(storage, `images/${selectedImage.name}`);
        try {
            // Загружаем файл
            await uploadBytes(imageRef, selectedImage);
            // Получаем URL загруженного файла
            const url = await getDownloadURL(imageRef);
            setImageUrl(url);
            alert("Изображение успешно загружено");
    

        // Сохраняем данные о товаре в Firestore

            const docRef = await addDoc(collection(db, "cars"), {
                ...carForm,
                img: url,
            });
            alert("Товар успешно сохранен с ID: " + docRef.id);
        } catch (error) {
            console.error("Ошибка сохранения товара:", error);
        }
    };

    const handleChange = (e)=>{
        setCarForm({
            ...carForm,
            [e.target.name]: e.target.value
    });
    console.log(carForm);
    }
    return(





        <div className="cont_data_filter">
            <div className="data_filter">
                <button name="requeststatus" className="filter_btn" onClick={props.onClick} value='новое'>Новое</button>
                <button name="requeststatus" className="filter_btn" onClick={props.onClick} value='подтверждено'>Подтверждённое</button>
                <button name="requeststatus" className="filter_btn" onClick={props.onClick} value='отклонено'>Отклонённые</button>
                <button name="requeststatus" className="filter_btn" onClick={props.onClick} value='окончено'>Оконченные</button>
                <button name="requeststatus" className="filter_btn" id="new_btn" onClick={handleBookButtonClick}>Создать новую карточку товара</button>
            </div>


            {showBookingForm && (
            <div className="cont_booking">
            <div className="booking-modal">
            <div className="booking-form">





            <div> 
            <form onSubmit={handleUpload}>
            <input type="file" required onChange={handleImageChange} />
            <input
                type="text" name='name' required
                placeholder="Название товара"
                value={carForm.name}
                onChange={handleChange}
            />
            <input
                type="number" name='price' required
                placeholder="Цена товара"
                value={carForm.price}
                onChange={handleChange}
            />
            <select name='transmission' onChange={handleChange}>
                <option value="АКПП">Автоматическая КП</option>
                <option value="МКПП">Механическая КП</option>
            </select>
            <select onChange={handleChange}  name='car_type'>
                <option value="седан">Седан</option>
                <option value="кроссовер">Кросовер</option>
                <option value="универсал">Универсал</option>
                <option value="микроавтобус">Микроавтобус</option>
                <option value="минивен">Минивен</option>
            </select>
            <button>Загрузить изображение и сохранить карточку</button>
            </form>
        </div>





            </div>

            </div>
            <div className="backdrop" onClick={handleBackdropClick}></div>
            </div>
            )}
        </div>
    );
};
export default DataFilter;