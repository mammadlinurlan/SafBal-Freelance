import React from "react";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export const OurServices = (props) => {
    return (
        <section style={{paddingTop:'40px'}} className="store-locations">
           
            <div className="container">
            <div style={{display:'flex',justifyContent:'center',marginBottom:'30px'}} className="locationsheader">
            <h2 style={{fontWeight:"600",color:'#EBA937'}}>SATIŞ NÖQTƏLƏRİ</h2>
        
               </div>
                <OwlCarousel className='owl-theme'  autoWidth={true} autoplay={true}  nav>
                        <div style={{width:"200px"}} className="store">
                                <img style={{objectFit:'cover'}} src="arazmarket.svg"  alt="storeimage"  onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = "unknown.png";
                        }} />
                        </div>
                        <div style={{width:"200px"}} className="store">
                                <img style={{objectFit:'cover'}} src="bazarstore.jpeg"  alt="storeimage"  onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = "unknown.png";
                        }} />
                        </div>
                        <div style={{width:"200px"}} className="store">
                                <img style={{objectFit:'cover'}} src="beegross.png"  alt="storeimage"  onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = "unknown.png";
                        }} />
                        </div>
                        <div style={{width:"200px"}} className="store">
                                <img style={{objectFit:'cover'}} src="bolmart.png"  alt="storeimage"  onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = "unknown.png";
                        }} />
                        </div>
                        <div style={{width:"200px"}} className="store">
                                <img style={{objectFit:'cover'}} src="bravo.jpeg"  alt="storeimage"  onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = "unknown.png";
                        }} />
                        </div>
                        <div style={{width:"200px"}} className="store">
                                <img style={{objectFit:'cover'}} src="fresco.jpeg"  alt="storeimage"  onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = "unknown.png";
                        }} />
                        </div>
                        <div style={{width:"200px"}} className="store">
                                <img style={{objectFit:'cover'}} src="kingsmart.png"  alt="storeimage"  onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = "unknown.png";
                        }} />
                        </div>
                        <div style={{width:"200px"}} className="store">
                                <img style={{objectFit:'cover'}} src="megastore.png"  alt="storeimage"  onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = "unknown.png";
                        }} />
                        </div>
                        <div style={{width:"200px"}} className="store">
                                <img style={{objectFit:'cover'}} src="neptun.jpeg"  alt="storeimage"  onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = "unknown.png";
                        }} />
                        </div>
                        <div style={{width:"200px"}} className="store">
                                <img style={{objectFit:'cover'}} src="rahat.jpeg"  alt="storeimage"  onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = "unknown.png";
                        }} />
                        </div>
                        <div style={{width:"200px"}} className="store">
                                <img style={{objectFit:'cover'}} src="safastore.jpeg"  alt="storeimage"  onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = "unknown.png";
                        }} />
                        </div>
                        <div style={{width:"200px"}} className="store">
                                <img style={{objectFit:'cover'}} src="spar.jpeg"  alt="storeimage"  onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = "unknown.png";
                        }} />
                        </div>
                        <div style={{width:"200px"}} className="store">
                                <img style={{objectFit:'cover'}} src="sarimarket.jpeg"  alt="storeimage"  onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = "unknown.png";
                        }} />
                        </div>
                </OwlCarousel>
            </div>
        </section>
    )
}