import React, { useContext, useEffect, useState } from "react";
import '../App.css'
import { UserContext } from "../hooks";
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBag, faBars, faArrowCircleUp, faTrash } from '@fortawesome/fontawesome-free-solid'
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons"
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import axios from "axios";
import { BasketContext } from "../hooks";
export const Navbar = (props) => {
    const mobileNavHandler = () => {
        document.querySelector('.mobile-nav')?.classList.add('activemobile')
    }
    const mobileCloser = () => {
        document.querySelector('.mobile-nav')?.classList.remove('activemobile')
    }
    const basketcont = useContext(BasketContext)

    const [username, setUsername] = React.useState('')
    const [total, setTotal] = React.useState(0)

    const orderHandler = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:3000/makeorder/${localStorage.getItem('user')}`, basketcont.basket)
            .then((result) => {
                console.log(result)
                basketcont.basketSetter([])
            })
            .catch((err) => {
                console.log(err)
            })
    }


    useEffect(() => {
        if (localStorage.getItem('user')) {
            const name = localStorage.getItem('user')
            setUsername(name ? name : '')
        }
    }, [])

    useEffect(() => {

        setTotal(basketcont.basket.reduce((total, item) => {
            return total += item.price * item.count
        }, 0))
    }, [basketcont.basket])

    useEffect(() => {
        axios.get('http://localhost:3000/test').then((res) => {
            console.log(res.status)
            document.querySelector('.navlogin')?.classList.add('foreffect')

            document.querySelector('.navregister')?.classList.add('foreffect')

        })
            .catch((err) => {

                document.querySelector('.navlogout')?.classList.add('foreffect')

                if (localStorage.getItem('user')) {
                    localStorage.removeItem('user')
                }
            })

        const username = localStorage.getItem('user')
        console.log(username)
    }, [])
    const basketContext = useContext(BasketContext)
    const context = useContext(UserContext)

    const logout = (e) => {
        e.preventDefault();
        axios.get('http://localhost:3000/logout').then((res) => {
            console.log(res.status)
            document.querySelector('.navlogout')?.classList.add('foreffect')
            document.querySelector('.navlogin')?.classList.remove('foreffect')
            document.querySelector('.navregister')?.classList.remove('foreffect')
            localStorage.removeItem('user')

            basketContext.basketSetter([])
            context.userSetter('')

        })
            .catch((err) => {
                console.log(err);

            })
    }

    const deleteBasketItemHandler = (e) => {
        const filteredbasket = basketcont.basket.filter((item) => item.itemId != e)
        basketcont.basketSetter(filteredbasket);

        axios.put(`http://localhost:3000/updatebasket/${localStorage.getItem('user')}`, filteredbasket)
            .then((result) => {
                console.log(result)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const usercontext = useContext(UserContext)
    // console.log(basket.basket)

    const style = {
        color: "#EBA937",
        fontWeight: 600,
    }
    const divstyle = {
        display: "flex",
        justifyContent: "center",
        backgroundColor: "black",
        position:'fixed',
        alignItems: "center",
       height: '0px',
       overflow : 'hidden',
       transition : '0.3s',
        zIndex : 100000,
       width : '100%'
    }
    return (

        <>
            <header style={{position:'relative'}}>

                <div style={divstyle}  className="stickyNav">
                    <span style={style} >Taste Best Quality!</span>
                </div>
                <nav>

                    <div className="container">
                        <div className="row">
                            <div style={{ display: 'flex', alignItems: 'center' }} className="logo col-lg-2 col-5 col-md-5">
                                <Link to='/'>
                                    <img src="logosafbal.png" style={{ width: '100%', height: '60px', objectFit: 'cover' }} alt="unknown" />

                                </Link>
                            </div>
                            <div className="services col-lg-6 ">
                                <ul>
                                    <li>
                                        <Link to="/">ƏSAS SƏHİFƏ</Link>
                                    </li>
                                    <li><a href="#">MƏHSULLAR</a></li>
                                    <li><a href="#">HAQQIMIZDA</a></li>
                                    <li><a href="#">ƏLAQƏ</a></li>
                                    {/* <li><a href="#">TRAINERS</a></li> */}
                                </ul>
                            </div>
                            <div className="col-lg-2 navbarphonediv">
                                <a className="navbarphone" href="tel:0503686882">050 368 68 82</a>
                            </div>
                            <div className="shoparea col-lg-2 ">
                                <div className="bag">
                                    <FontAwesomeIcon icon={faShoppingBag} color={"#fff"} />
                                    <p style={{ backgroundColor: "#EBA937" }} className="totalcount">{basketcont.basket.length}</p>
                                </div>
                                <div className="cart-total">

                                    <p>
                                        {/* {   
                                    basketcont.basket.
                                } */}

                                        ({total} azn)
                                        {usercontext.user}
                                    </p>
                                </div>
                                <div className="basket" style={{ width: '300px' }}>
                                    <div className="items">

                                        {

                                            basketcont.basket.map((item) => {
                                                return (



                                                    <div key={item.itemId} className="item">
                                                        <div className="item-image">
                                                            <img src={`http://localhost:3000/${item.image}`} alt="yoxdu" />
                                                        </div>
                                                        <div className="info">
                                                            <div >
                                                                <a style={{ paddingLeft: '10px' }} href="#" className="item-name">{item.name}</a>
                                                            </div>
                                                            <div style={{ paddingLeft: '10px' }} className="price-count">
                                                                <span className="item-count">{item.count} x </span>
                                                                <span className="item-price">{item.price}$</span>
                                                            </div>
                                                        </div>
                                                        <div className="delete-div">
                                                            <FontAwesomeIcon onClick={() => deleteBasketItemHandler(item.itemId)} icon={faTrash} color={"#fff"} />

                                                        </div>
                                                    </div>

                                                )
                                            })

                                        }



                                    </div>
                                    <div className="checkout-area">
                                        <a href="#" onClick={orderHandler} className={basketcont.basket.length > 0 ? 'makeorder' : 'disabledorderbtn'}>Sifariş et</a>
                                    </div>
                                </div>
                            </div>
                            <div className="burger-button col-7 col-md-7">
                                <FontAwesomeIcon onClick={mobileNavHandler} icon={faBars} color={"#fff"} />
                            </div>
                        </div>
                    </div>
                    <div className="mobile-nav">

                        <ul>
                            <li>
                                <Link onClick={mobileCloser} to="/">ƏSAS SƏHİFƏ</Link>

                            </li>
                            <li><Link onClick={mobileCloser} to="/">MƏHSULLAR</Link></li>
                            <li><Link onClick={mobileCloser} to="/">HAQQIMIZDA</Link></li>
                            <li><Link onClick={mobileCloser} to="/">ƏLAQƏ</Link></li>
                            <li className="navregister"><Link onClick={mobileCloser} to="/register">QEYDİYYAT</Link></li>
                            <li className="navlogin"><Link onClick={mobileCloser} to="/login">DAXİL OL</Link></li>
                            <li className="navlogout" onClick={(e) => logout(e)}><Link onClick={mobileCloser} to="/login">HESABDAN ÇIXIŞ ET</Link></li>

                            <li >
                                <div className="col-lg-2 navbarphonediv">
                                    <a style={{ color: 'black !important' }} className="navbarphone" href="tel:0503686882">050 368 68 82</a>
                                </div>
                            </li>
                            <li style={{ margin: '0', width: '100px', display: 'flex', justifyContent: 'space-between' }} className="socialsMobNav">
                                <a style={{ color: "#4267B2" }} href='https://www.facebook.com/saflbal' target="_blank">
                                    <FontAwesomeIcon icon={faFacebook} />
                                </a>
                                <a style={{ color: "#E1306C" }} href='https://www.instagram.com/saf_bal_/?hl=en' target="_blank">
                                    <FontAwesomeIcon icon={faInstagram} />

                                </a>

                            </li>

                            {/* <li><a href="#">TRAINERS</a></li>
                        <li><a href="#">CART</a></li> */}

                        </ul>
                        <FontAwesomeIcon onClick={mobileCloser} icon={faArrowCircleUp} color={"#fff"} />

                    </div>
                </nav>

            </header>






        </>

    )
}