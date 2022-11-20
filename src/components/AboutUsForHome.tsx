import React from "react";
import { Link } from "react-router-dom";


export const AboutUsForHome = () => {
    return (
        <section className="about-us">
            <div className="container" style={{ width: '100% !important' }}>
                <div className="row">
                    <div className="col-lg-6 col-md-12">
                        <img className="about-us-img" src="aboutimg.webp" alt="" />
                    </div>
                    <div className="col-lg-6 col-md-12 about-us-description">
                        <h5>Haqqımızda</h5>
                        <h2>Safbal Arıçılıq Şirkəti</h2>
                        <p>
                        Azərbaycanda arıçılıq qədim tarixə malikdir. Arı canlılar içərisində ən möcüzəli, sirri daha çox öyrənilməsi vacib olan nadir canlılardan biridir. Bizim ailədə ilk arıların saxlanılması ötən əsrin 55-56-cı illərinə təsadüf edir. Şəxsi təsərrüfatla ailəmizdə ali təhsil aldıqdan sonra kəndimizdə müəllim işləməyə başlayan Gəncəli müəllim beş arı ailəsi ilə 1972-ci ildə başlamışdır. Arı ailələrinin sayı artmaqla yanaşı arıçıların və bu sahədə işləyənlərin sayı artmışdır. Bununla bərabər Gəncəli müəllim öz qardaşlarını və oğlanlarını da bu işə cəlb edib. Şəxsi təsərrüfatımız inkişaf edərək böyük ailə təsərrüfatına çevrilmişdir. Yüksək keyfiyyətli bal və digər arı məhsullarını toplamaq üçün arı ailələrini təsərrüfatın yerləşdiyi Masallı rayonu ilə yanaşı...
                            <br />
                            <Link style={{color:'#EBA937'}} to='/aboutus'>Davamı</Link>

                            {/* Xalçalarınızı bir telefon zəngi ilə evinizdәn tәhvil götürәrәk 1-2 iş günü әrzindә yuyulur və pulsuz
                            servis xidmәti vasitәsi ilә ünvanınıza tәhvil verilir. Xalçalarınız şirkətimizin tәcrübәli mütəxəsis və
                            avadanlıqları tərfindən yuyulur. */}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}