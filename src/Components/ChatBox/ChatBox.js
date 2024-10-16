import React from 'react'
import './ChatBox.css'

function ChatBox(props) {
  
  return (
    <div className='chatbox'>
        <form className='chatbox__text-submit' onSubmit={props.submitMethod}>
            <input id='chatbox-input' placeholder={props.placeholder}/>
            {props.children}
            <button className='chatbox__submit-button' type="submit" style={{background: `transparent url(${props.submitIcon}) center no-repeat`}}/>
        </form>
    </div>
  )
}

export default ChatBox