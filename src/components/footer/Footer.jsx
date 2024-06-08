import React from 'react';
import "./footer.css";
import logofooter from "../../assets/sm-nav-logo.png";

const Footer = () => {
  return (
    <div className='footer-container'>
        <p>Portail assureurs est un service professionel offert par Don't Worry.</p>
        <p>Le service a pour but d'offrir un point de gestion des demandes utilisateurs par les assureurs partenaire de Don't Worry.</p>
        <img src={logofooter} alt="logoenbas"/>

        <h6>Copyright 2024 Don't Worry | Tous droits réservés.</h6>

    
    </div>
  )
}

export default Footer
