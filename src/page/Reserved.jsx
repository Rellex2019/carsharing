import React, { useEffect, useState } from 'react';
import '../styles/Reserved.css';
import HeaderGuest from '../UI/header';
import {collection ,getDocs} from 'firebase/firestore';
import {db} from '../firebase';
import Cookies from 'js-cookie';
import DataField from '../UI/DataField';
import DataFilter from '../UI/DataFilter';

const Reserved = (props) => {
    const user = JSON.parse(Cookies.get('user'));


    const [requests, setRequests] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filter] = useState({ email: user.email});




    const fetchPost = async () => {
  
        await getDocs(collection(db, "requests"))
            .then((querySnapshot)=>{               
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                setRequests(newData);             
            })

    }




    useEffect(() => {
        const results = requests.filter(request => {
          const isName = filter.email ? request.email === filter.email : true;
          return isName;
        });   
        setFilteredProducts(results);
      }, [filter, requests]);



    useEffect(()=>{
        fetchPost();
    }, [])


    const [filterRequsets, setFilterRequests] = useState({requeststatus: 'новое'});
    const [doneFilter , setDoneFilter] = useState([]);
    useEffect(() => {
        const results = requests.filter(request => {
          const isStatus = filterRequsets.requeststatus ? request.status === filterRequsets.requeststatus : true;
          return isStatus;
        });
        setDoneFilter(results);
        console.log(results);
      }, [filterRequsets, requests]);


    const handleOnClick = (e)=>{
        setFilterRequests({...filterRequsets, [e.target.name]: e.target.value});
    }

    if(user.role === 'user' ){
    return (
    <div className="o">
        <HeaderGuest cl='#23C107'/>
        <div className="cont_reserved_block">
            <div className="cont_reserved">
                Заявки
                <table>
                <div className="cont_true_form">
                <tr className="true_form">
                    <th className="data_info">Фамилия</th>
                    <th className="data_info">Имя</th>
                    <th className="data_info">Отчество</th>
                    <th className="data_info">Email</th>
                    <th className="data_info">Дата бранирования</th>
                    <th className="data_info">Автомобиль</th>
                    <th className="data_info">Статус</th>
                </tr>
                </div>
                <div className="cont_data_string">
                {filteredProducts?.map((request,i)=>(
                <p key={i}>
                <tr className="data_string">      
                        <td className="data_info">{request.surname}</td>
                        <td className="data_info">{request.name}</td>
                        <td className="data_info">{request.fathername}</td>
                        <td className="data_info">{request.email}</td>
                        <td className="data_info">{request.date_reservation.replace(/-/g,'.')}</td>
                        <td className="data_info">{request.car}</td>
                        <td className="data_info">{request.status=='новое'?'в ожидании':request.status}</td>
                </tr>
                </p>
                    ))
                    }
                </div>
                </table>
            </div>
        </div>
    </div>
    );}

    else if(user.role === 'admin'){
        return (
            <div className="o">
                <HeaderGuest cl='#23C107'/>
                <div className="cont_reserved_block">
                    <div className="cont_reserved">
                        Заявки
                        <DataFilter onClick={handleOnClick}/>
                        <table>
                        <div className="cont_true_form">
                        <tr className="true_form">
                            <th className="data_info">Фамилия</th>
                            <th className="data_info">Имя</th>
                            <th className="data_info">Отчество</th>
                            <th className="data_info">Телефон</th>
                            <th className="data_info">Email</th>
                            <th className="data_info">Дата бранирования</th>
                            <th className="data_info">Автомобиль</th>
                            <th className="data_info">Статус</th>
                        </tr>
                        </div>
                        <div className="cont_data_string">
                        {doneFilter?.map((request,i)=>(
                        <p key={i}>
                            <DataField id={request.id} name={request.name} surname={request.surname} 
                            fathername={request.fathername} number={request.number} 
                            email={request.email}  date_reservation={request.date_reservation} 
                            car={request.car} id_car={request.id_car}/>
                        </p>
                            ))
                            }
                        </div>
                        </table>
                    </div>
                </div>
            </div>
            );  
    }
};

export default Reserved;