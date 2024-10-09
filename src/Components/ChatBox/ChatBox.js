import React from 'react'
import './ChatBox.css'

function ChatBox() {
  return (
    <div className='chatbox'>
        <form className='chatbox__text-submit' onSubmit>
            <input id='chatbox-input' />
            <button className='chatbox_submit' />
        </form>
    </div>
  )
}

export default ChatBox