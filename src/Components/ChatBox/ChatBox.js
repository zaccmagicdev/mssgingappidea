import React from 'react'
import './ChatBox.css'
import { currentColorContext } from "../../contexts/CurrentColorTheme";

function ChatBox(props) {

  const { backgroundColor } = React.useContext(currentColorContext)

  function handleSubmitPreventDefault(e){
    e.preventDefault();
    props.submitMethod();
  }

  return (
    <div className='chatbox'>
        <form className='chatbox__text-submit' onSubmit={handleSubmitPreventDefault}>
            <input id='chatbox-input' placeholder={props.placeholder} style={{color: `${backgroundColor === 'dark' ? 'white' : 'black'}`}} onChange={(e) => props.handleOnChange(e)} name={props.name}/>
            {props.children}
            <button className='chatbox__submit-button' type="submit" style={{background: `transparent url(${props.submitIcon}) center no-repeat`, color: `${props.theme}`}}/>
        </form>
    </div>
  )
}

export default ChatBox