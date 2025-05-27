import React from 'react'
import './Hero.css'
import hand_icon from '../Assets/hand_icon.svg'
import arrow_icon from '../Assets/arrow.svg'
import hero_image from '../Assets/hero_image.png'

const Hero = () => {
  return (
    <div className='hero'>
      <div className='hero-content'>
        <div className='hero-left'>
          <div className='hero-badge'>NEW ARRIVALS ONLY</div>
          <div className='hero-text'>
            <div className='hero-hand-icon'>
              <p className='hero-word'>new</p>
              <img src={hand_icon} alt='hand wave' />
            </div>
            <p className='hero-word'>Collections</p>
            <p className='hero-word'>for everyone</p>
          </div>
          <button className='hero-latest-btn'>
            <span>Latest Collections</span>
            <img src={arrow_icon} alt='arrow' className='arrow'/>
          </button>
        </div>
        <div className='hero-right'>
          <div className='hero-image-container'>
            <img src={hero_image} alt='Fashion model' className='hero-image'/>
            <div className='hero-image-bg'></div>
          </div>
        </div>
      </div>
      <div className='hero-decorations'>
        <div className='decoration decoration-1'></div>
        <div className='decoration decoration-2'></div>
        <div className='decoration decoration-3'></div>
      </div>
    </div>
  )
}

export default Hero