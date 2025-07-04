import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/logo.png'
import instagram_icon from '../Assets/instagram_icon.svg'
import pintester_icon from '../Assets/pintester_icon.svg'
import whatsapp_icon from '../Assets/whatsapp_icon.svg'

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-logo'>
        <img src={footer_logo} alt='' className='footer_logo'/>
      </div>
      <ul className='footer-links'>
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
      </ul>
      <div className='footer-social-icon'>
        <div className='footer-icons-container'>
            <img src={instagram_icon} alt='' />
        </div>

        <div className='footer-icons-container'>
            <img src={pintester_icon} alt='' />
        </div>

        <div className='footer-icons-container'>
            <img src={whatsapp_icon} alt='' />
        </div>
      </div>
      <div className='footer-copyright'>
        <hr/>
        <p>Copyright @ 2024 - ALL Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
