import React from 'react'
import { useSelector } from 'react-redux';
import { selectChatrooms } from '../../redux/ChatroomSlice';
import { Chatroom } from '../../types/Interface';
import styles from './ChatList.module.css';

export default function ChatList() {
    const chatrooms = useSelector(selectChatrooms);
  return (
    <div className={styles.container}>{chatrooms.map((chatroom: Chatroom) => (<div>{chatroom.id}</div>))}</div>
  )
}
