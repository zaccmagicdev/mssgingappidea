import React from 'react'
import './LoginLandingPage.css'

function LoginLandingPage() {

  return (
    <section className='login-landing-page__background'>
      <form className='login-landing-page__form'>
        <h1 className='login-landing-page__header'>Create Account</h1>
        <div className='login-landing-page__other-options-container'>
          <p className='login-landing-page__other-options-text'>You can also create an account through</p>
          <button className='login-landing-page__link login-landing-page__google-link' />
          <button className='login-landing-page__link login-landing-page__apple-link' />
        </div>
        <label for="register-username">
          <input type='text' id='register-username' placeholder='Username' required minLength='5' maxLength='16' />
        </label>
        <label for="register-password">
          <input type='password' id='register-password' placeholder='Password' required minLength='8' maxLength='20' />
        </label>
        <label for="register-dob">
          <input type="date" id="register-dob"  max="2012-01-01" min="1941-01-01"/>
        </label>
        <h1 className='login-landing-page__header'>Welcome back!</h1>
        <div className='login-landing-page__other-options-container'>
          <p className='login-landing-page__other-options-text'>You can also sign in through</p>
          <button className='login-landing-page__link login-landing-page__google-link' />
          <button className='login-landing-page__link login-landing-page__apple-link' />
        </div>
        <label for="login-username">
          <input type='text' id='login-username' placeholder='Username' required minLength='5' maxLength='16' />
        </label>
        <label for="login-password">
          <input type='password' id='login-password' placeholder='Password' required minLength='8' maxLength='20' />
        </label>
      </form>
    </section>
  )
}

export default LoginLandingPage