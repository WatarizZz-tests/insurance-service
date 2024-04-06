import React from 'react';
import "./footer.css";
import logofooter from "../../assets/leetz-logo-red.png";

const Footer = () => {
  return (
    <div className='footer-container'>
        <p>Portail assureurs est un service professionel offert par Leet'z assurance.</p>
        <p>Le service a pour but d'offrir un point de gestion des demandes utilisateurs par les assureurs partenaire de Leet'z assurance.</p>
        <img src={logofooter} alt="logoenbas"/>

        <h6>Copyright 2024 Leet'z assurance | Tous droits réservés.</h6>

    
    </div>
  )
}

export default Footer
