import React from "react";
import { Formik, Field, Form } from "formik";
import Swal from "sweetalert2";

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import axios from "axios";
axios.defaults.withCredentials = true;


export const Example = () => {
    const [image, setImage] = React.useState('')
    const [img, setImg] = React.useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        const formdata = new FormData()
        formdata.append('image', image)
        // const name = 'gunel'
        // const surname = 'memmedli'
        // formdata.set('dataname', name)
        // formdata.set('dadasurname', surname)
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
        axios.post('http://localhost:3000/postimage', formdata, config)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err.response.status)
                Swal.fire({
                    icon: 'error',
                    title: 'Error...',
                    text: 'Choose an image!',

                })
            })
    }

    const getImage = (e) => {
        e.preventDefault()
        axios.get('http://localhost:3000/getimage')
        .then((res)=>{
            console.log(res)
            setImg(res.data)
        })
    }
    return (
        //         <OwlCarousel className='owl-theme' loop margin={10} nav>
        //     <div className='item'>
        //         <h4>1</h4>
        //     </div>
        //     <div className='item'>
        //         <h4>2</h4>
        //     </div>
        //     <div className='item'>
        //         <h4>3</h4>
        //     </div>
        //     <div className='item'>
        //         <h4>4</h4>
        //     </div>
        //     <div className='item'>
        //         <h4>5</h4>
        //     </div>
        //     <div className='item'>
        //         <h4>6</h4>
        //     </div>
        //     <div className='item'>
        //         <h4>7</h4>
        //     </div>
        //     <div className='item'>
        //         <h4>8</h4>
        //     </div>
        //     <div className='item'>
        //         <h4>9</h4>
        //     </div>
        //     <div className='item'>
        //         <h4>10</h4>
        //     </div>
        //     <div className='item'>
        //         <h4>11</h4>
        //     </div>
        //     <div className='item'>
        //         <h4>12</h4>
        //     </div>
        // </OwlCarousel>
        <>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="file" accept=".png,.jpeg" name="myImg" onChange={(e) => setImage(e.target.files[0])}></input>
                <br />
                <button type="submit">Submit</button>
            </form>
            <img width='100' alt="unknown" src='http://localhost:3000/getimage' />
            <button type="submit" onClick={getImage} >get image</button>
        </>
    )
}