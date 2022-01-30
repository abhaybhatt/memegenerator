import React from 'react'
import './LandingPage.css'
import frog from '../../assets/meme1.jpg'

const LandingPage = () => {
    return(
        <div className='landingPage-bg'>
            <img src={frog} alt='frog' className='frog-image' />
            <div className='heading-lp'>Meme Generator</div>
            <div className='subheading-lp'>made with love by Abhay Bhatt <span role="img" aria-label="sheep"> ❤️</span></div>
            <button className='view-template'>View Templates</button>
        </div>
    )
}

export default LandingPage