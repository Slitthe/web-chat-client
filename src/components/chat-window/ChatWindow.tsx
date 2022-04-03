import React from 'react'
import { useSelector } from 'react-redux';
import { selectActiveChatroomId } from '../../redux/ChatroomSlice';
import Conversations from '../conversations/Conversations';
import InfoBar from '../info-bar/InfoBar';
import WriteMessageArea from '../write-message-area/WriteMessageArea';
import styles from './ChatWindow.module.css';
import NoSelectedChatroom from './no-selected-chatroom/NoSelectedChatroom';

export default function ChatWindow() {
  const selectedChatroomId = useSelector(selectActiveChatroomId);
  return (
    <div className={styles.container}>
      {selectedChatroomId !== null ? (
        <><InfoBar />
        <Conversations />
        <WriteMessageArea /></>
      ) : <NoSelectedChatroom />}
      
    </div>
  )
}
