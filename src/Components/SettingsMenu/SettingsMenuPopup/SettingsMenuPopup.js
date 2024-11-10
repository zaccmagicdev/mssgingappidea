import React from 'react'
import './SettingsMenuPopup.css';

function SettingsMenuPopup(props) {
  return (
    <>
    <button className='settingsmenupopup__return-button' type='button' onClick={props.callbackFunction}/>
    <section style={{height: props.height}} className={`settingsmenupopup settingsmenupopup__${props.name}`}>
        {props.children}
    </section>
    </>
  )
}

export default SettingsMenuPopup