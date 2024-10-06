import React from 'react'
import './ChatBox.css'

function ChatBox() {
  return (
    <div className='chatbox'>
        <form className='chatbox__text-submit'>
            <input id='chatbox-input' />
        </form>
    </div>
  )
}

export default ChatBox