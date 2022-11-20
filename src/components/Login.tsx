import React, { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2"
import { Formik, Field, Form } from "formik";
import { Link } from "react-router-dom";
import './login.scss'
axios.defaults.withCredentials = true;

export const Login = () => {
    const [name, setName] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [logged, setLogged] = React.useState(false)
    
    const nameHandler = (e) => {
        setName(e.target.value)
    }
    const passHandler = (e) => {
        setPassword(e.target.value)
    }
    const submitHandler = (e) => {
        e.preventDefault();
        const user = {
            username: name,
            password: password
        }
        axios.post('http://localhost:3000/login', user)
            .then((res) => {
                console.log(res)
                document.querySelector('.logout')?.classList.remove('foreffect')
                document.querySelector('.login')?.classList.add('foreffect')
                // local setting
                localStorage.setItem('user', user.username)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Uğurla daxil oldunuz!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setTimeout(() => {
                    window.location.href = `http://${window.location.host}`

                }, 1500);


            })
            .catch((err) => {
                console.log(err)
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'İstifadəçi adı və ya şifrə yanlışdır!',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
    }

    useEffect(() => {
        axios.get('http://localhost:3000/test').then((res) => {
            window.location.href = `http://${window.location.host}`
            setLogged(true)
        })
            .catch((err) => {
                console.log('salam')
            })
    }, [])

    function validateUsername(value) {
        let error;
        if (value === 'admin') {
            error = 'Nice try!';
        }
        if (!value) {
            error = 'Bosh olmaz blet'
        }
        return error;
    }

    function validatePassword(value) {
        let error;
        if (!password) {
            error = 'Enter password';
        }
        return error;
    }



   

    return (
        <div>
        {(() => {
          if (logged) {
            return (
                <div></div>
            )
          }
          else {
            return (
            <div className="loginwrapper">
                <div className="container">
                    <form className="col-lg-12 col-12 col-md-12" onSubmit={submitHandler} method="post">
                        <input className="col-lg-6  col-12 col-md-6" onChange={(e) => nameHandler(e)} type="text" placeholder="Username" />
                        <input className="col-lg-6  col-12 col-md-6" onChange={(e) => passHandler(e)} type="password" placeholder="Password" />
                        <button className="col-lg-6  col-12 col-md-6" type="submit">Daxil ol.</button>
                        <div className="col-lg-6 col-12 col-md-6 d-flex" style={{justifyContent:'space-between'}}>
                        <span style={{color:'black'}}>Hesabınız yoxdur?  </span> 
                        <Link style={{color:"black"}} to='/register'>Qeydiyyatdan kec</Link>
                        </div>
                    </form>
                </div>
            </div>
            )
            
          }
        })()}
      </div>
    )
        
          
      
    }
        
        
      
       
    
   
        
            
           
        
      
    
       
    
