import React from "react";
import axios from "axios";
import { useEffect } from "react";
import Swal from "sweetalert2";

export const Admin = (props) => {
    const [name, setName] = React.useState('')
    const [password, setPassword] = React.useState('')

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
        axios.post('http://localhost:3000/admin', user).then((res) => {
            console.log(res)
            document.querySelector('.logout')?.classList.remove('foreffect')
            document.querySelector('.login')?.classList.add('foreffect')
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Admin Successfully logged in!',
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
                    title: 'Username or password is incorrect!',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
    }

    useEffect(() => {
        axios.get('http://localhost:3000/test').then((res) => {
            window.location.href = `http://${window.location.host}`
        })
            .catch((err) => {
                console.log('salam')
            })
    }, [])
   
    return(
        <>
        <div className="container">
            <h1>hi admin</h1>
          
            <form className="col-lg-12 col-12 col-md-12" onSubmit={submitHandler} method="post">
                    <input className="col-lg-6  col-6 col-md-6" onChange={(e) => nameHandler(e)} type="text" placeholder="Username" />
                    <input className="col-lg-6  col-6 col-md-6" onChange={(e) => passHandler(e)} type="password" placeholder="Password" />
                    <button className="col-lg-6  col-6 col-md-6" type="submit">Login</button>
                </form>
            
        </div>
        </>
    )
}