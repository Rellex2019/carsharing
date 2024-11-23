import React, { useEffect, useState } from 'react';
import { collection, getDocs} from "firebase/firestore";
import {db} from '../firebase';


import '../styles/Main.css';

import Banner from "../UI/banner";
import CarType from '../UI/car_type';

import CarCart from '../UI/CarCart';


const Main = (props) => {


      const [cars, setCars] = useState([]);
      const [filteredProducts, setFilteredProducts] = useState([]);
      const [filters, setFilters] = useState({ name: '', transmission: '', cartype: '', reserved: false });
    
      // useEffect(() => {
      //   const fetchProducts = async () => {
      //     const response = await axios.get('http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'); 
      //     setProducts(response.data);
      //     setFilteredProducts(response.data);
      //   };
    
      //   fetchProducts();
      // }, []);
    






      useEffect(() => {
        const results = cars.filter(car => {
          const isName = filters.name ? car.name.toLowerCase().includes(filters.name.toLowerCase()) : true;
          const isTransmission = filters.transmission ? car.transmission === filters.transmission : true;
          const isCar = filters.cartype? car.car_type === filters.cartype : true;
          // const isMaxPriceMatch = filters.maxPrice ? product.price <= Number(filters.maxPrice) : true;



          //ДОБАВЛЕНИЕ В CLOUD FIRESTORE



        //   const addDataToFirestore = async (data) => {
        //     const docRef = await addDoc(collection(db, 'request'), data);
        //     console.log('Document written with ID: ', docRef.id);
        //     }


        //   let data = {
        //     surname: 'Don',
        //     name: 'John',
        //     fathername: 'Hlebuchini',
        //     number: 30,
        //     email: 'johndoe@example.com',
        //     date_reservation: '01.09.2024 12:30:30'
        //     };
        //   addDataToFirestore(data);
        //     console.log(data);


          return isName && isTransmission && isCar;

        });
    
        setFilteredProducts(results);
      }, [filters, cars]);
    





      const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
        console.log(e.target.name,e.target.value);
        console.log(filters);
      };

      const ClearFilters = () => {
        setFilters({name:'', transmission:'', cartype:'', reserved: false})
      }







      const fetchPost = async () => {
  
          await getDocs(collection(db, "cars"))
              .then((querySnapshot)=>{               
                  const newData = querySnapshot.docs
                      .map((doc) => ({...doc.data(), id:doc.id }));
                  setCars(newData);                
              })
  
      }
  
      useEffect(()=>{
          fetchPost();
      }, [])

      const handleScrollBtn = ()=>{ 
        const car = document.querySelector('#cars');
        console.log('Работает')
        car.scrollIntoView({
            block: 'nearest',
            behavior: 'smooth',
        })
      }

    return (

    <div className="Main">

        <Banner onClickScroll={handleScrollBtn}/>
        <div className='filter_text'>Вы можете подобрать машину для себя</div>
        <div className='cont_cars_filter'>  
            <div className='filter_cars'>
                <CarType svg='big' name='Седан' value='седан' onFilter={handleFilterChange}/>
                <CarType svg='small' name='Кроссовер' value='кроссовер' onFilter={handleFilterChange}/>
                <CarType svg='small' name='Универсал' value='универсал' onFilter={handleFilterChange}/>
                <CarType svg='big' name='Микроавтобус' value='микроавтобус' onFilter={handleFilterChange} />
                <CarType svg='small' name='Минивен' value='минивен' onFilter={handleFilterChange}/>
            </div>

        </div>
        <div className='cont_next_filter'>
            <div className="center_filter">
            <div className='transmission'>
                    <legend className='text_transmission'>Коробка передач:</legend>
                    <div>
                        <input type="radio" className='radio_text' id="auto_radio" onClick={handleFilterChange} name="transmission" value="АКПП"  />
                        <label for="huey" className='radio_text'>Автоматическая</label>
                    </div>

                    <div>
                        <input type="radio" className='radio_text' id="mech_radio" onClick={handleFilterChange} name="transmission" value="МКПП" />
                        <label for="dewey" className='radio_text'>Механическая</label>
                    </div>

                    <div>
                        <input type="radio" className='radio_text' id="any_radio" onClick={handleFilterChange} name="transmission" value=""/>
                        <label for="louie" className='radio_text'>Любая</label>
                    </div>
            </div>
            <div className='brend'>
            <label for="brend_car">Выберите бренд из списка:</label>
                <input type="text" list="brend" id="brend_car" value={filters.name} onChange={handleFilterChange} name="name"/>
                <datalist id="brend">
                    <option value="BMW"/>
                    <option value="Volvo"/>
                    <option value="Toyota"/>
                    <option value="Skoda"/>
                    <option value="Renault"/>
                    <option value="Peugeon"/>
                </datalist>
            </div>
            <div className="reset_btn" onClick={ClearFilters}>
                Сбросить фильтры
            </div>
        </div>
        </div>


        <div className="cont_vehicles_arend_block" id='cars'>
            <div className="vehicles_arend_block">
            {filteredProducts?.map((car,i)=>(
 
                <CarCart key={i} name={car.name} id={car.id} transmission={car.transmission} price={car.price} reserved={car.reserved} img={car.img}/>       
            ))
            }
              
            </div>
        </div>

    </div>

    );
};

export default Main;