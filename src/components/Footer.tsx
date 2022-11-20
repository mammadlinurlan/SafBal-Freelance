import React, { useContext } from "react";
import '../footer.css'
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { UserContext } from "../hooks";
import { BasketContext } from "../hooks";
export const Footer = () => {
    const basketContext = useContext(BasketContext)
    const context = useContext(UserContext)
    const logout = (e) => {
            e.preventDefault();
            axios.get('http://localhost:3000/logout').then((res)=>{
                console.log(res.status)
                document.querySelector('.logout')?.classList.add('foreffect')
                document.querySelector('.login')?.classList.remove('foreffect')
                document.querySelector('.register')?.classList.remove('foreffect')
                localStorage.removeItem('user')
                
                basketContext.basketSetter([])
                context.userSetter('')

            })
            .catch((err)=>{
                console.log(err);

            })
    }
    useEffect(()=>{
        axios.get('http://localhost:3000/test').then((res)=>{
                console.log(res.status)
                document.querySelector('.login')?.classList.add('foreffect')

                document.querySelector('.register')?.classList.add('foreffect')

            })
            .catch((err)=>{
                
                document.querySelector('.logout')?.classList.add('foreffect')

                if(localStorage.getItem('user'))
                {
                    localStorage.removeItem('user')
                }
            })

            const username = localStorage.getItem('user')
            console.log(username)
    },[])
    return(
        <footer>
        <div className="container">
            <div className="row">
                <div className="top">
                    <div className="list col-lg-3 col-md-6 col-12">
                        <h5>CUSTOMER SERVICE</h5>
                        <ul>
                            <li><a href="">Help & Contact Us</a></li>
                            <li><a href="">Returns & Refunds</a></li>
                            <li><a href="">Online Stores</a></li>
                            <li><a href="">Terms & Conditions</a></li>
                        </ul>
                    </div>
                    <div className="list col-lg-3 col-md-6 col-12">
                        <h5>COMPANY
                        </h5>
                        <ul>
                            <li><a href="">About Us
                                </a></li>
                            <li><a href="">Blog
                                </a></li>
                            <li><a href="">Order Tracking</a></li>
                            <li><a href="">FAQ Page</a></li>
                            <li><a href="">Contact Us</a></li>
                            <li><a href="">Login</a></li>
                        </ul>
                    </div>
                    <div className="list col-lg-3 col-md-6 col-12">
                        <h5>SOCIAL MEDIA</h5>
                        <ul>
                            <li><a href="">Twitter
                                </a></li>
                            <li><a href="">Instagram</a></li>
                            <li><a href="">Linkedin</a></li>
                            <li><a href="">Tumblr</a></li>
                        </ul>
                    </div>
                    <div className="list col-lg-3 col-md-6 col-12">
                        <h5>ACCOUNT</h5>
                        <ul>
                            
                            <li><Link className="register" to='/register'>Register</Link></li>

                            <li>
                                
                                <Link className="login" to='/login'>Login</Link>
                            </li>
                            <li><a onClick={(e)=>logout(e)} className="logout" href="#">Logout</a></li>
                        </ul>
                    </div>
                </div>
                <div className="bottom">
                    <div className="copyright col-lg-4 col-md-12 col-12">
                        <span>© 2022 <a href="">Mammadli Nurlan</a>, All Rights Reserved</span>
                    </div>
                    <div className="bankicons col-lg-4 col-md-12 col-12">
                        <img src="https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/footer-bottom-1.png"
                            alt="" />
                    </div>
                    <div className="socialmedia col-lg-4 col-md-12 col-12">
                        <div className="insta">
                            <a target="_blank" href="https://www.instagram.com/go_fitness_baku/?hl=en&__coig_restricted=1">INSTAGRAM</a>
                        </div>
                        <div className="face">
                            <a target="_blank" href="https://www.facebook.com/profile.php?id=100069141412489">FACEBOOK</a>
                        </div>
                    </div>
                </div>
            </div>


        </div>

      
    </footer>
    )
}