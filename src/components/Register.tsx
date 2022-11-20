import React, { useEffect } from "react";
import "./register.scss";
import Swal from 'sweetalert2'
import { Formik, Field, Form } from "formik";
import { Link } from "react-router-dom";
import axios from "axios";

export const Register = () => {
    const [name, setName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirm, setConfirm] = React.useState('');
    const [email, setEmail] = React.useState('');

    const nameHandler = (e) => {
        setName(e.target.value)
    }
    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }
    const confirmHandler = (e) => {
        setConfirm(e.target.value)
    }
    const mailHandler = (e) => {
        setEmail(e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if (password != confirm) {
            alert('passwords must be same!');
            return;
        }
        var hasNumber = /\d/;
        if (!hasNumber.test(password) || !hasNumber.test(confirm)) {
            alert('password must include a number');
            return;
        }
        if (name.length > 30) {
            alert('username max length is 30')
            return;
        }
        const user = {
            username: name,
            password: password,
            confirmpassword: confirm,
            isadmin: false,
            email: email
        }
        axios.post('http://localhost:3000/postuser', user).then((result) => {
            console.log(result.status)
            if (result.status === 200) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Successfully registered!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setTimeout(() => {
                    window.location.href = `http://${window.location.host}`

                }, 1500);

            }
        })
            .catch((err) => {
                console.log(err.response.status)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Username or email is already taken!',

                })
            })

    }


    useEffect(() => {
        axios.get('http://localhost:3000/test').then((res) => {
            window.location.href = `http://${window.location.host}`
        })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <>
           


            <div className="forback">
                <div className="container">
                    <div className="registerdiv">
                        <form onSubmit={submitHandler} className='regform' method="post">
                            <h2>HESAB YARAT</h2>
                            <input onChange={(e) => nameHandler(e)} type='text' className="input-group" placeholder="Username" maxLength={30} required />
                            <input onChange={(e) => passwordHandler(e)} type='password' placeholder="Password" required />
                            <input onChange={(e) => confirmHandler(e)} type='password' placeholder="Confirm Password" required />
                            <input onChange={(e) => mailHandler(e)} type='email' placeholder="Email" required />
                            <button type="submit">QEYDİYYATDAN KEÇ</button>
                            <div className="col-lg-6 col-12 col-md-6 d-flex" style={{justifyContent:'space-between',width:"70%"}}>
                        <span style={{color:'black'}}>Hesabınız var?  </span> 
                        <Link style={{color:"black"}} to='/login'>Daxil olun.</Link>
                        </div>
                        </form>
                    </div>
                </div>

            </div>

        </>





    )
}