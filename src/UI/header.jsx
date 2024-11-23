import React from 'react';



import {Link, useNavigate } from "react-router-dom";
import {useState } from 'react';
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";


import Cookies from 'js-cookie';
import {db} from '../firebase';



import './header.css';
import AutoHeader from './auto_header';
import AutoForm from './AutoForm';
import ButtonGreen from './ButtonGreen';

const HeaderGuest = (props) => {

  const navigate = useNavigate();


  const [error, setError] = useState('');
  const [regError, setRegError] = useState('');

  const [formData, setFormData] = useState({
  role: 'user',
    });



  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [errormail, setErrorMail] = useState('');
  const [errorpass, setErrorPass] = useState('');
    
    const handleChangeRegister = (e) => {
    setFormData({
    ...formData,
    [e.target.name]: e.target.value
    });
    console.log(formData);
    };


const handleSubmitReg = async (e) => {
    e.preventDefault();
    
    try {
    const userRef = query(collection(db, 'users'),where('email', '==', formData.email));
    const snapshot = await getDocs(userRef);
    if(!snapshot.empty){
      setRegError('Email уже зарегестрирован');
    }
    else if(errormail=='' && errorpass =='')
      {
      await addDoc(collection(db, 'users'), formData);
      console.log('Data added to Firestore!');
      Cookies.set('user', JSON.stringify({...formData, password:'' }), { expires: 7, path:'/' });
      console.log('Вход выполнен успешно');
  //Reload
      window.location.reload();
    }






    } catch (error) {
    console.error('Error adding data to Firestore: ', error);
    }
    };



const handleSubmitLog = async (e) =>{
    e.preventDefault();

    try {
      const userRef = query(collection(db, 'users'),where('email', '==', formData.email));
      const snapshot = await getDocs(userRef);

      if (snapshot.empty) {
        setError('Пользователь не найден');
        return;
      }
      let userData;
      snapshot.forEach((doc) => {
        userData = doc.data();
      });

      // Проверка правильности пароля
      if (userData.password === formData.password) {
        // Создание куки
        Cookies.set('user', JSON.stringify({...userData, password:''  }), { expires: 7, path:'/' });
        console.log('Вход выполнен успешно');
        console.log(Cookies.get('user'));


        //Reload
        window.location.reload();
      } else {
        setError('Неверный пароль');
      }
    } catch (error) {
      setError('Ошибка при входе: ' + error.message);
    }
  }

const exitDeleteCookies = async ()=>{

  Cookies.remove('user');
  navigate('/');
  console.log('Выход...')
  
        //Reload
        window.location.reload();
}

const handleScrollBtn = ()=>{ 
  const car = document.querySelector('#cars');
  console.log('Работает')
  car.scrollIntoView({
      block: 'nearest',
      behavior: 'smooth',
  })
}

const userCookie = Cookies.get('user');








const handleChange = (event) => {
  handleChangeRegister(event);
  setEmail(event.target.value);
  // Сбрасываем сообщение
  if (event.target.value) {
      setErrorMail('');
  }
  event.preventDefault();
  // Проверка на валидность email
  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setErrorMail('Введите корректный адрес электронной почты');
  }

};


const handleChangePass = (event) => {
  handleChangeRegister(event);
  setPass(event.target.value);
  // Сбрасываем сообщение
  if (event.target.value) {
      setErrorPass('');
  }
  event.preventDefault();


  const hasMinimumLength = pass.length >= 3;
  const hasDigit = /\d/.test(pass);


  if (!hasMinimumLength || !hasDigit) {
      setErrorPass('Введите пароль состоящий хотя-бы из 3 сиволов и 1 цифры');
  }

};


  if(userCookie){
    const user = JSON.parse(Cookies.get('user'));
    return (


        <div className="header_cont" >
          <div className="header">
            <div className="logo_name" ><Link style={{color: props.cl}} to={'/'}>Эх, прокачу</Link></div>
            <div className="nav_menu">
              {window.location.pathname === '/'?
              <div className="nav" style={{color: props.cl}}onClick={handleScrollBtn} >Автопарки</div>
              :
              <div className="nav" style={{color: props.cl}}><Link to={'/'} style={{color: props.cl}}>Автопарки</Link></div>
              }
              <div className="nav" ><Link to={'/reserved'} style={{color: props.cl}}>Записи</Link></div>
              <div className="nav" style={{color: props.cl}} onClick={exitDeleteCookies}>Здравствуйте, {user.name}, нажмите чтобы <span className='exit_btn'>выйти</span> </div>
              

            </div>
          </div>
          <div className="underline"></div>
        </div>
  

    );
  }
  else{
    return (


      <div className="header_cont" >
        <div className="header">
          <div className="logo_name" style={{color: props.cl}}><Link style={{color: props.cl}} to={'/'}>Эх, прокачу</Link></div>
          <div className="nav_menu">
          {window.location.pathname === '/'?
              <div className="nav" style={{color: props.cl}}onClick={handleScrollBtn} >Автопарки</div>
              :
              <div className="nav" style={{color: props.cl}} >Автопарки</div>
              }
            <div className="nav" id='register' style={{color: props.cl}}>

                  
                <div className="register_win_cont">
                    <div className="register_win" >
                      <AutoHeader/>
                      <div className='name_block' >Регистрация</div>
                      <form className='cont_form' onSubmit={handleSubmitReg}>

                      <div className="name_area">Фамилия</div>
                      <input className="input_form" required name='surname' onChange={handleChangeRegister} type="text"/>

                      <div className="name_area">Имя</div>
                      <input className="input_form" required name='name' onChange={handleChangeRegister} type="text"/>

                      <div className="name_area">Отчество</div>
                      <input className="input_form" required name='fathername' onChange={handleChangeRegister} type="text"/>

                      <div className="name_area">Телефон</div>
                      <input className="input_form" required name='number' placeholder='+7(XXX)XXX-XX-XX' maxLength={'5'} onChange={handleChangeRegister} type="number"/>

                      <div className="name_area">Водительское удостоверение</div>
                      <input className="input_form" required name='drivernumber' type="number" maxLength={'10'} onChange={handleChangeRegister} placeholder='Серия и номер'/>
                      <div className="name_area">Email</div>
                      <div>
                        <input className="input_form" type="email" name='email' onChange={handleChange} required/>

                        <div className="name_area">Пароль</div>
                        <input className="input_form" type="password" name='password' onChange={handleChangePass} required/>
                        {errormail && <p style={{ color: 'red', fontSize: '16px' }}>{errormail}</p>}
                        {errorpass && <p style={{ color: 'red', fontSize: '16px' }}>{errorpass}</p>}
                      {<p style={{ color: 'red', fontSize: '16px' }}>{regError}</p>}
                      </div>
                      <ButtonGreen name='Зарегистрироваться' width='93%' height='55px' mt='25px' />
                      </form>


                    </div>
                </div>
                Регистрация
            </div>


            <div className="nav" id='login' style={{color: props.cl}}>
                <div className="login_win_cont" >
                    <div className="login_win">
                      <AutoHeader handleChangePass={handleChangePass} handleChange={handleChange} errormail={errormail} errorpass={errorpass}/>
                      <div className='name_block'>Авторизация</div>
                      <form className='cont_form' onSubmit={handleSubmitLog}>

                      <div className="name_area">Email</div>
                      <div>
                        <input className="input_form" type="email" name='email' onChange={handleChange} required/>

                        <div className="name_area">Пароль</div>
                        <input className="input_form" type="password" name='password' onChange={handleChangePass} required/>
                        {errormail && <p style={{ color: 'red', fontSize: '16px' }}>{errormail}</p>}
                        {errorpass && <p style={{ color: 'red', fontSize: '16px' }}>{errorpass}</p>}
                      {<p style={{ color: 'red', fontSize: '16px' }}>{regError}</p>}
                      </div>
                      {<p style={{ color: 'red', fontSize: '16px' }}>{error}</p>}
                      <ButtonGreen name='Войти' width='93%' height='55px' mt='25px'/>
                      </form>


                    </div>
                </div>
              
              Вход</div>
            
          </div>
        </div>
        <div className="underline"></div>
      </div>
  )}
};

export default HeaderGuest;