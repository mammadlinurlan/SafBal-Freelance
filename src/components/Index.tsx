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
import { useMemo } from "react";
export const Index = () => {
    const [products, setProducts] = useState<any[]>([])
    const [visible, setVisible] = useState(3)
    const [status, setStatus] = useState(false)
    const [brands, setBrands] = useState([])
    const [filter, setFilter] = useState<any[]>([])
    const [currentPage, setCurrentPage] = React.useState(1)
    const [totalPage, setTotalPage] = React.useState(0)
    const [itemsPerPage, setItemsPerPage] = React.useState(4)

    useEffect(() => {
        setStatus(true)
        axios.get(`http://localhost:3000/getallproducts/${currentPage}`).then(({ data }) => {
            console.log(data)
            setProducts(data.data)
            setTotalPage(Math.ceil(data.totalPage / itemsPerPage))
            setStatus(false)
        })
            .catch(err => {
                console.log(err)
            })

        axios.get('http://localhost:3000/brands')
            .then((result) => {
                setBrands(result.data)
                // console.log(brands)
            })


        console.log(products.length)
        console.log(itemsPerPage)

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
    const handlePageChange = (page) => {
        setStatus(true)
        setCurrentPage(page);
        axios.get(`http://localhost:3000/getallproducts/${page}`).then(({ data }) => {
            console.log(data)
            setProducts(data.data)
            setTotalPage(Math.ceil(data.totalPage / itemsPerPage))
            setStatus(false)
        })
    }

    const computedProducts = useMemo(() => {

        let computed = products
        return computed

    }, [
        products,
        itemsPerPage,
        currentPage
    ])

    const style = {
        display: "flex",
        background: "white",
        alignItems: "center",
        justifyContent: "center",
        margin: "0",
        height:'max-content',
        paddingTop : '50px'
    }
    return (
        <PhoneContext.Provider value={{ products, phoneSetter }}>
            <Slider />
            <div className="container">
                <AboutUsForHome />
                <div style={{ textAlign: 'center', color: '#EBA937' ,}} className="products-intro">
                    <h2 style={{ fontWeight: '600' ,margin:'0'}}>Məhsullar</h2>
                </div>
                <div style={{ paddingTop: '50px', paddingBottom: '50px',}} className="row">

                    {
                        status && <div style={{ width: '100%', display: 'flex', justifyContent: 'center', height: '515px', overflow: 'hidden', alignItems: 'center' }} className="forLoader">
                            <img style={{ width: '100px', height: '100px' }} src="https://bestanimations.com/media/bees/1459375780bee-animated-gif-36.gif" alt="loading" />
                        </div>
                    }


                    {
                        !status && computedProducts.map((prod) => {
                            return (
                                <Phone
                                    key={prod._id}
                                    name={prod.name}
                                    image={prod.image}
                                    stock={prod.stock}
                                    price={prod.price}
                                    itemId={prod._id}
                                />
                            )
                        })
                    }

                    <nav style={style} aria-label="Page navigation example">
                        <ul style={{ margin: '0' }} className="pagination">
                            <li className={`page-item ${currentPage === 1 && "disabled"}`}><button className={`page-link`} onClick={() => handlePageChange(currentPage - 1)}>Previous</button></li>
                            {[...Array(totalPage).keys()].map((num) => {
                                return <li key={num} className={`page-item ${num + 1 === currentPage && 'active'}`}><button className={`page-link ${num + 1 === currentPage && 'disabled'} `} onClick={() => handlePageChange(num + 1)}>{num + 1}</button></li>

                            })}
                            <li className={`page-item ${currentPage === totalPage && "disabled"}`}><button className={`page-link`} onClick={() => handlePageChange(currentPage + 1)}>Next</button></li>

                        </ul>
                    </nav>
                </div>
                {/* <button style={{ display: visible == phones.length ? 'none' : "block" }} onClick={loadMore}>Load more</button> */}
            </div>
            <Ourdifference />
            <OurServices />

            <Location />

        </PhoneContext.Provider>

    )
}