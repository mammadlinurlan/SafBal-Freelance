import React, { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2"
import { Formik, Field, Form } from "formik";
import { Link } from "react-router-dom";
import './login.scss'
axios.defaults.withCredentials = true;

export const Login = () => {
    const [formData, setFormData] = React.useState({
        username: '',
        password: ''
    })
    const [logged, setLogged] = React.useState(false)


    const changeDataHandler = (e) => {
        const name = e.target.id
        let value = e.target.value 
        setFormData((prevstate)=>{
            return{
                ...prevstate,
                [name]:value
            }
        })

        console.log(formData)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        // const user = {
        //     username: name,
        //     password: password
        // }
        axios.post('http://localhost:3000/login', formData)
            .then((res) => {
                console.log(res)
                document.querySelector('.logout')?.classList.remove('foreffect')
                document.querySelector('.login')?.classList.add('foreffect')
                // local setting
                localStorage.setItem('user', formData.username)
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
                                <form className="col-lg-12 col-12 col-md-12" onSubmit={submitHandler} onChange={changeDataHandler} method="post">
                                    <input className="col-lg-6  col-12 col-md-6" type="text" id="username" placeholder="Username" />
                                    <input className="col-lg-6  col-12 col-md-6" type="password" id="password" placeholder="Password" />
                                    <button className="col-lg-6  col-12 col-md-6" type="submit">Daxil ol.</button>
                                    <div className="col-lg-6 col-12 col-md-6 d-flex" style={{ justifyContent: 'space-between' }}>
                                        <span style={{ color: 'black' }}>Hesabınız yoxdur?  </span>
                                        <Link style={{ color: "black" }} to='/register'>Qeydiyyatdan kec</Link>
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














