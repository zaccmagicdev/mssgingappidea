import React from 'react'
import './ChatRoom.css'
import { Message } from '../Message/Message'
import ChatBox from '../ChatBox/ChatBox'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { initializeApp } from "firebase/app";

export const ChatRoom = (props) => {

  const messagesRef = props.firestore.collection('messages')
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'})

  return (
   <section className='chatroom'>
    <ul>

    </ul>
   <ChatBox />
   </section>
  )
}
