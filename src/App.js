import './App.css';
import React, { useContext, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { Register } from './components/Register.tsx';
import { Index } from './components/Index.tsx';
import { UserContext } from './hooks';
import { BasketContext } from './hooks';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { Login } from './components/Login.tsx';
import { Admin } from './components/Admin.tsx';
import { AddPhone } from './components/AddPhone.tsx';
import { Update } from './components/Update.tsx';
import { Example } from './components/Example.tsx';
import axios from 'axios';

function App() {
  const [basket, setBasket] = React.useState([])
  const [user,setUser] = React.useState('')
  const basketSetter = (value) => {
    setBasket(value)
  }
  const userSetter = (value) => {
    setUser(value)
  }
  window.scroll(function(){
    var yPos = window.scrollY
    console.log('sa')
  })
  onscroll = () => {
    if(window.scrollY > 600)
    {
      document.querySelector('.stickyNav').classList.add('stickyheight')
    }
    else{
      document.querySelector('.stickyNav').classList.remove('stickyheight')
      
    }


  }
  useEffect(() => {
    axios.get(`http://localhost:3000/getbasket/${localStorage.getItem('user')}`)
      .then(({ data }) => {
        console.log(data[0].basket)
        setBasket(data[0].basket)
      })
      .catch((error) => {
        console.log('no logged')
      })


      setUser(localStorage.getItem('user'))
  }, [])



  return (
    <>

      <Router>
        <UserContext.Provider value={{user,userSetter}}>
          <BasketContext.Provider value={{ basket, basketSetter }}>
            <Navbar />
            <Routes>
              <Route path='/' element={<Index />} />

              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/admin' element={<Admin />} />
              <Route path='/addphone' element={<AddPhone />} />
              <Route path='/update/:phoneId' element={<Update />} />
              <Route path='/example' element={<Example />} />


            </Routes>
            <Footer />
          </BasketContext.Provider>
        </UserContext.Provider>
      </Router>
    </>
  );
}

export default App;
