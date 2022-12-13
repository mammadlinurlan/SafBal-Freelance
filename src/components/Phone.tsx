import React, { useContext } from "react";
import './phone.scss'
import { Link } from "react-router-dom";
import axios from "axios";
import { BasketContext, usePhoneContext } from "../hooks";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/fontawesome-free-solid";
import Swal from "sweetalert2";
import { useState } from "react";
export const Phone = (props) => {
    const phoneContext = usePhoneContext()
    const [brand,setBrand] = useState('')

    const deleteTo = { 
        pathname: `http://localhost:3000/deletephone/${props.id}`,
        param1:`${props.id}`
      };
      const newTo = { 
        pathname: `/Update/${props.id}`
      };
      const addToCard = {
        pathname: `http://localhost:3000/addtobasket`
      }
      const deleteHandler = (e) => {
        e.preventDefault();
        // console.log(`${deleteTo.pathname}`)
        axios.delete(`${deleteTo.pathname}`)
        .then((result)=>{
            axios.get('http://localhost:3000/all').then(res=>{
                console.log(res)
                phoneContext.phoneSetter(res.data)
             })
            console.log(result)
        })
        .catch((err)=>{
            console.log(err)
        })
      }

      const basketcontext = useContext(BasketContext)

      const addToHandler = (e) => {
        e.preventDefault();
        console.log('clicked')
        const basketitem = {
            itemId : props.id,
            count : 1,
            img : props.image,
            username : localStorage.getItem('user'),
            name : props.model,
            price : props.price
        }

        axios.get('http://localhost:3000/test').then((res)=>{
            axios.post('http://localhost:3000/addtobasket',basketitem)
            .then(({data})=>{
                console.log(data)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Uğurla səbətə əlavə olundu!',
                    showConfirmButton: false,
                    timer: 1500,
                    imageUrl : 'logosafbal.png',
                    imageHeight:'75px',
                    imageWidth:'200px'
                })

                basketcontext.basketSetter(data)

                // console.log(data)

            })
            .catch((error)=>{
                console.log(error)
            })
        })
        .catch((err)=>{
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Zehmet olmasa daxil olun!',
                showConfirmButton: false,
                timer: 1500,
                imageUrl : 'logosafbal.png',
                imageHeight:'75px',
                imageWidth:'200px'
            })
            setTimeout(() => {
            window.location.href = `http://${window.location.host}/login`
                
            }, 1500);

        })


       
      }

      useEffect(()=>{

        axios.get(`http://localhost:3000/spec/${props.brand}`)
        .then((result)=>{
            setBrand(result.data.name)
        })  
      },[])

    return (
       
        <>
         {/* <h1>{phoneContext.phones.length}</h1> */}
        <div className="phonecss col-lg-3 col-md-6 col-12">
            <div className="wrapper">
                <div className="image">
                    <img src={props.image}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = "unknown.png";
                        }}
                    />
                </div>
                <div className="bottom">
                    {/* <h4 className="brandname">
                        {brand}
                    </h4> */}
                    <h3>
                        {props.model}
                    </h3>
                    <p style={{marginBottom:'8px'}}>
                        Çəki : {props.memory} qr
                    </p>
                    <p>
                        Qiymət : {props.price} azn
                    </p>
                    <h5>
                        <Link to={newTo}>Update</Link>
                    </h5>
                    <h5 >
                        <Link className="fordelete" onClick={deleteHandler} style={{ color: "red" }} to={deleteTo}>Delete</Link>
                    </h5>
                    <h5>
                        
                        <Link to={'google.com'}  onClick={addToHandler} className='addtocardnow' style={{color:'white',textDecoration:'none',background:'green',padding:'10px 20px',borderRadius:'15px'}}><FontAwesomeIcon  icon={faShoppingBag} />  Səbətə əlavə et</Link>
                    </h5>
                </div>
            </div>
        </div>
        </>
       

    )
}