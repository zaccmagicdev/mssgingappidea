import React from 'react'
import { currentColorContext } from '../contexts/CurrentColorTheme'
import './SettingsMenu.css'

export const SettingsMenu = () => {

  const { handleBackgroundThemeChange, backgroundColor } = React.useContext(currentColorContext)

  return (
    <section className='settingsmenu'>
      <ul className='settingsmenu__list'>
        <li className='settingsmenu__setting'>
          <p className='settingsmenu__setting-title'>Background Colour</p>
          <button
            className='settings__menusettingsmenu__setting-title-switch'
            onClick={handleBackgroundThemeChange}>
            {backgroundColor === 'dark' ? 'light' : 'dark'}
          </button>
        </li>
      </ul>
    </section>
  )
}
