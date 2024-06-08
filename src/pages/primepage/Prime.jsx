import React from 'react'
import TopPage from '../../components/header/TopPage'
import Footer from '../../components/footer/Footer'
import ContentPrime from '../../components/contentprime/ContentPrime'
import "./primestyle.css"

const Prime = () => {
  return (
    <div className='prime-page-container'>
        <TopPage/>
        <ContentPrime/>
        <Footer/>
      
    </div>
  )
}

export default Prime
