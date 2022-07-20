import React from 'react'
import './LandingPage.css'
import { useNavigate } from 'react-router-dom';
import frog from '../../assets/meme1.jpg'

const LandingPage = () => {
    const navigate = useNavigate();
    const openTemplatePage = () => {
        navigate('/templates');
    }
    return(
        <div className='landingPage-bg'>
            <div className='heading-lp'>Meme Generator</div>
            {/* <div className='subheading-lp'>made with love by Abhay Bhatt <span role="img" aria-label="sheep"> ❤️</span></div> */}
            <img src={frog} alt='frog' className='frog-image' />
            <button className='view-template' onClick={() => openTemplatePage()}>View Templates</button>
        </div>
    )
}

export default LandingPage