import moment from 'moment';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeDraftMessage, selectActiveChatroom, selectActiveChatroomId, selectOwner, addMessage, clearDraftMessage } from '../../redux/ChatroomSlice';
import { Message } from '../../types/Interface';
import styles from './WriteMessageArea.module.css';

export default function WriteMessageArea() {
  const dispatch = useDispatch();
  const activeChatroomId = useSelector(selectActiveChatroomId);
  const owner = useSelector(selectOwner);
  const activeChatroom = useSelector(selectActiveChatroom);

  const sendMessage = () => {

    const newMessage: Message = {
      text: activeChatroom ? activeChatroom.draftMessage : '',
      sentTime: moment(),
      sender: owner,
    }

    dispatch(addMessage({chatroomId: activeChatroomId || '', message: newMessage}));
    dispatch(clearDraftMessage(activeChatroomId || ''));
    

  }

  const changeMessage = (event: any) => {
    const value = event.target.value;

    dispatch(changeDraftMessage({chatroomId: activeChatroomId || '', message: value}));
  }



  return (
    <div className={styles.container}>
      <input type="text" value={activeChatroom ? activeChatroom.draftMessage : ''} onChange={changeMessage} />
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}
