import React from 'react'
import TopPage from '../../components/header/TopPage'
import Footer from "../../components/footer/Footer"
import SliderAssureurs from '../../components/heroslider/SliderAssureurs'
import "./mainpagestyle.css";
import Content from '../../components/contentdemands/Content';

const MainPage = () => {
  return (
    <div className='mainpage-style'>
      <TopPage/>
      <SliderAssureurs/>
      <Content/>
      <Footer/>
      
    </div>
  )
}

export default MainPage
