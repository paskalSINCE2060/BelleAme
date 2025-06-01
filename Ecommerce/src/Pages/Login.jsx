import React from 'react'
import { Link } from 'react-router-dom'
import './CSS/LoginSignup.css'

const Login = () => {
  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        <h1>Login</h1>
        <div className='loginsignup-fields'>
          <input type="email" placeholder='Your Email Address' />
          <input type="password" placeholder='Your Password'/>
        </div>
        <button>Login</button>
        <p className='loginsignup-login'>Don't have an account?
          <Link to='/signup'><span>Sign up here</span></Link>
        </p>
        <div className='loginsignup-agree'>
          <input type="checkbox" name='' id='' />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default Login