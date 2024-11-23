import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
const DataField = (props) => {

    const [status, setStatus] = useState();

    const fetchStatus = async () => {
        const requestStatusRef = doc(db, "requests", props.id);
        const docSnap = await getDoc(requestStatusRef);

        if (docSnap.exists()) {
            setStatus(docSnap.data().status);
        } else {
            console.log("Документ не найден!");
        }
    };


    useEffect(() => {
        fetchStatus();
    }, [props.id]);


    const handleSubmit = async (e)=>{
        const newStatus = e.target.value;
        setStatus(newStatus);
        const requestStatusRef = doc(db, "requests", props.id);
        if(newStatus === 'отклонено' || newStatus === 'окончено'){
            const carStatusRef = doc(db, "cars", props.id_car);
            await updateDoc(carStatusRef, {
                reserved: false
                });
        }

        await updateDoc(requestStatusRef, {
        status: newStatus
        });

    }

    

    return (

<tr className="data_string">
        <td className="data_info" style={{display: 'none'}}>{props.id}</td>
        <td className="data_info">{props.surname}</td>
        <td className="data_info">{props.name}</td>
        <td className="data_info">{props.fathername}</td>
        <td className="data_info">{props.number}</td>
        <td className="data_info">{props.email}</td>
        <td className="data_info">{props.date_reservation.replace(/-/g,'.')}</td>
        <td className="data_info">{props.car}</td>
        <td className="data_info">
        <select name='status' onChange={handleSubmit} style={{height:'35px', fontSize:'20px'}} value={status}>
            <option value='новое'>Новое</option>
            <option value='подтверждено'>Подтверждено</option>
            <option value='отклонено'>Отклонено</option>
            <option value='окончено'>Окончено</option>
        </select>
        </td>
</tr>

    );
};

export default DataField;