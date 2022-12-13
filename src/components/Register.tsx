import React, { useEffect } from "react";
import "./register.scss";
import Swal from 'sweetalert2'
import { Link } from "react-router-dom";
import axios from "axios";

export const Register = () => {
    const [formData,setFormData] = React.useState({
        username :'' ,
        password :'' ,
        confirmpassword : '' ,
        isadmin : false ,
        email : '' ,
    })

    const changeDataHandler = (e) => {
        const name = e.target.id;
        let value = e.target.value;
        setFormData((prevstate)=>{
            return{
                ...prevstate,
                [name]:value
            }
        })
        console.log(formData)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if (formData.password != formData.confirmpassword) {
            alert('passwords must be same!');
            return;
        }
        var hasNumber = /\d/;
        if (!hasNumber.test(formData.password) || !hasNumber.test(formData.confirmpassword)) {
            alert('password must include a number');
            return;
        }
        if (formData.username.length > 30) {
            alert('username max length is 30')
            return;
        }

        axios.post('http://localhost:3000/postuser', formData).then((result) => {
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
                    window.location.href = `http://${window.location.host}/login`

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
                        <form onSubmit={submitHandler} onChange={changeDataHandler}  className='regform' method="post">
                            <h2>HESAB YARAT</h2>
                            <input id="username" type='text' className="input-group" placeholder="Username" maxLength={30} required />
                            <input id="password" type='password' placeholder="Password" required />
                            <input id="confirmpassword" type='password' placeholder="Confirm Password" required />
                            <input id="email" type='email' placeholder="Email" required />
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