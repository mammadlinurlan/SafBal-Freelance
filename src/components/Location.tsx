import React from "react";
export const Location = () => 
{
    return(
      <section className="location">
        <div className="container">
          <h1 color='#EBA937' className="location-header text-center mb-5">Ünvan</h1>
          <iframe className="google-map w-100"
          src="https://maps.google.com/maps?q=nesimi%20bazar&t=&z=13&ie=UTF8&iwloc=&output=embed"
            width="600" height="450" style={{border:'0'}} allowFullScreen={true} loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </section>
    )
}

