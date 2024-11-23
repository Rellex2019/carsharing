import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from 'react';
import Main from "./page/Main";
import HeaderGuest from "./UI/header";
import Reserved from "./page/Reserved";
import Footer from "./UI/footer";




function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <HeaderGuest/>






    
    {/*Pages*/}

    <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/reserved" element={<Reserved/>}/>
    </Routes>
    </BrowserRouter>

    <Footer/>

    </div>
  );
}





export default App;
