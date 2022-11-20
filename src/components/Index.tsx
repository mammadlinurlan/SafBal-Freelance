import React from "react";
import '../App.css'
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {faring}
import axios from "axios";
import { Phone } from "./Phone.tsx";
import { PhoneContext } from "../hooks";
import { Slider } from "./Slider.tsx";
import { AboutUsForHome } from "./AboutUsForHome.tsx";
import { Ourdifference } from "./OurDifference.tsx";
import { Location } from "./Location.tsx";
import { OurServices } from "./OutServices.tsx";
export const Index = () => {
    const [phones, setPhones] = useState<any[]>([])
    const [visible, setVisible] = useState(3)
    const [status, setStatus] = useState(false)
    const [brands, setBrands] = useState([])
    const [filter, setFilter] = useState<any[]>([])

    useEffect(() => {
        setStatus(false)
        axios.get('http://localhost:3000/all').then(res => {
            console.log(res)
            setPhones(res.data)
            setStatus(true)
        })
            .catch(err => {
                console.log(err)
            })

        axios.get('http://localhost:3000/brands')
            .then((result) => {
                setBrands(result.data)
                console.log(brands)
            })

    }, [])
    const phoneSetter = (value) => {
        setPhones(value)
    }
    const loadMore = () => {
        if (phones.length - visible < 3) {
            setVisible((prev) => prev + phones.length - visible)
        }
        else {
            setVisible((prev) => prev + 3)
        }
    }
    let filterarr = []
    const filterHandler = (e) => {
        if (e.target.checked) {
            filterarr.push(e.target.value)
        }
        else {
            filterarr = filterarr.filter((item) => item !== e.target.value)
            console.log("already exists")
        }

        var brandfiltered = []

        for (const i in filterarr) {
            // setFilter([...filter,phones.filter((item) => item == filterarr[i])])

            // brandfiltered.push(phones.filter((item) => item.brand == filterarr[i]))
            for (const j in phones) {
                if (phones[j].brand === filterarr[i]) {
                    brandfiltered.push(phones[j])
                }
            }
            phoneSetter(brandfiltered)
            console.log(brandfiltered)
            // console.log(brandfiltered)

            // console.log(phones.filter((item) => item.brand == filterarr[i]))


            // brandfiltered = filter

            // console.log(brandfiltered)

            // if(filterarr.some((m)=> m === phones[i].brand))
            // {
            //     brandfiltered.push(phones[i])
            // }

            // phon
            // console.log(phones[i].brand);

        }

        // phoneSetter(brandfiltered)

        // console.log(phones);


        // phoneSetter([])

        console.log(filterarr)
    }
    return (
        <PhoneContext.Provider value={{ phones, phoneSetter }}>
            <Slider />
            <div className="container">
                <AboutUsForHome />
                <div style={{ textAlign: 'center' , color:'#EBA937' }} className="products-intro">
                    <h2 style={{fontWeight:'600'}}>Məhsullar</h2>
                </div>
                <div style={{ paddingTop: '50px', paddingBottom: '50px' }} className="row">
                    {
                        phones.map((phone) => {
                            return (
                                status === false ? "Loading" :
                                    <Phone
                                        key={phone._id}
                                        model={phone.model}
                                        brand={phone.brand}
                                        image={phone.img}
                                        price={phone.price}
                                        ram={phone.ram}
                                        id={phone._id}
                                        memory={phone.memory}
                                    />
                            )
                        })
                    }
                </div>
                {/* <button style={{ display: visible == phones.length ? 'none' : "block" }} onClick={loadMore}>Load more</button> */}
            </div>
            <Ourdifference />
            <OurServices/>

            <Location />

        </PhoneContext.Provider>

    )
}