import React from 'react'
import './ChatBox.css'

function ChatBox(props) {
  
  return (
    <div className='chatbox'>
        <form className='chatbox__text-submit' onSubmit={props.submitMethod}>
            <input id='chatbox-input' />
            <button className='chatbox_submit' />
        </form>
    </div>
  )
}

export default ChatBox