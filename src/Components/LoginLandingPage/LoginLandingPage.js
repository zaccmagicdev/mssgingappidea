import React from 'react'
import './LoginLandingPage.css'
import ButtonRipple from '../ButtonRipple/ButtonRipple'

function LoginLandingPage() {

  return (
    <section className='login-landing-page__background'>
      <div className='login-landing-page__container'>
        <div className='login-landing-page__section login-landing-page__section_register'>
          <form className='login-landing-page__form'>
            <h1 className='login-landing-page__header'>Create Account</h1>

            <p className='login-landing-page__text'>You can also create an account through</p>
            <div className='login-landing-page__other-options-container'>
              <button className='login-landing-page__link login-landing-page__external-link login-landing-page__google-link' />
              <button className='login-landing-page__link login-landing-page__external-link login-landing-page__apple-link' />
            </div>
            <label for="register-username">
              <input type='text' id='register-username' placeholder='Username' required minLength='5' maxLength='16' />
            </label>
            <label for="register-password">
              <input type='p assword' id='register-password' placeholder='Password' required minLength='8' maxLength='20' />
            </label>
            <label for="register-dob">
              <input type="date" id="register-dob" max="2012-01-01" min="1941-01-01" />
            </label>
          </form>
        </div>
        <div className='login-landing-page__section login-landing-page__section_login'>
          <form className='login-landing-page__form'>
            <h1 className='login-landing-page__header'>Welcome back!</h1>

            <p className='login-landing-page__other-options-text'>You can also sign in through</p>
            <div className='login-landing-page__other-options-container'>
              <button className='login-landing-page__link login-landing-page__external-link login-landing-page__google-link' />
              <button className='login-landing-page__link login-landing-page__external-link login-landing-page__apple-link' />
            </div>
            <label for="login-username">
              <input type='text' id='login-username' placeholder='Username' required minLength='5' maxLength='16' />
            </label>
            <label for="login-password">
              <input type='password' id='login-password' placeholder='Password' required minLength='8' maxLength='20' />
            </label>
          </form>
        </div>
        <div className='login-landing-page__toggle-container login-landing-page__toggle-container_left'>
          <ButtonRipple className='login-landing-page__link'>Forgot your Password?</ButtonRipple>
          <h1 className='login-landing-page__header'>Already with us?</h1>
          <p className='login-landing-page__text'>Just sign in here!</p>
        </div>
        <div className='login-landing-page__toggle-container login-landing-page__toggle-container_right'>
          <ButtonRipple className='login-landing-page__link'>Sign In</ButtonRipple>
          <h1 className='login-landing-page__header'>New here?</h1>
          <p className='login-landing-page__text'>Click below to register</p>
          <ButtonRipple className='login-landing-page__link'>Sign Up</ButtonRipple>
        </div>
      </div>
    </section>
  )
}

export default LoginLandingPage